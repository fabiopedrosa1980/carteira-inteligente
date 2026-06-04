import { Component, EventEmitter, Output, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, switchMap, distinctUntilChanged, takeUntil } from 'rxjs';
import { StockDataService } from '../../services/stock-data.service';
import { StockApiService } from '../../services/stock-api.service';
import { Stock, DividendRecord } from '../../models/stock.model';

const SECTORS = ['Bancário','Seguros','Petróleo & Gás','Mineração','Energia Elétrica','Saneamento','Telecomunicações','Varejo','Agronegócio','Imobiliário','Saúde','Outro'];
const MONTHS = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

interface DividendEntry { month: number; value: string; enabled: boolean; }

@Component({
  selector: 'app-add-stock-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="overlay" (click)="onOverlayClick($event)">
      <div class="modal" role="dialog" aria-modal="true">
        <div class="modal-header">
          <h2>Adicionar Ação</h2>
          <button class="close-btn" (click)="close.emit()">✕</button>
        </div>

        <div class="modal-body">
          <div class="form-section">
            <h3>Dados da Ação</h3>
            <div class="form-row">

              <!-- Ticker com lookup -->
              <div class="form-group ticker-group">
                <label>Ticker *</label>
                <div class="ticker-input-wrap" [class.loading]="fetching()">
                  <input
                    [(ngModel)]="form.ticker"
                    placeholder="ex: VALE3"
                    maxlength="7"
                    (ngModelChange)="onTickerChange($event)"
                    [class.error]="errors.ticker"
                    autocomplete="off" />
                  <span class="ticker-spinner" *ngIf="fetching()">⟳</span>
                  <span class="ticker-ok" *ngIf="fetchOk() && !fetching()">✓</span>
                </div>
                <span class="field-error" *ngIf="errors.ticker">{{ errors.ticker }}</span>
                <span class="fetch-hint" *ngIf="fetchError() && !fetching()">Ticker não encontrado na B3</span>
              </div>

              <!-- Nome -->
              <div class="form-group">
                <label>Nome da empresa *
                  <span class="auto-badge" *ngIf="autoFilled.name">auto</span>
                </label>
                <input [(ngModel)]="form.name" placeholder="ex: Vale S.A." [class.error]="errors.name" />
                <span class="field-error" *ngIf="errors.name">{{ errors.name }}</span>
              </div>
            </div>

            <div class="form-row">
              <!-- Setor -->
              <div class="form-group">
                <label>Setor *
                  <span class="auto-badge" *ngIf="autoFilled.sector">auto</span>
                </label>
                <select [(ngModel)]="form.sector">
                  <option value="">Selecione...</option>
                  <option *ngFor="let s of sectors" [value]="s">{{ s }}</option>
                </select>
              </div>

              <!-- Preço -->
              <div class="form-group">
                <label>Preço atual (R$) *
                  <span class="auto-badge" *ngIf="autoFilled.price">auto</span>
                </label>
                <div class="price-wrap">
                  <input [(ngModel)]="form.price" type="number" min="0.01" step="0.01"
                         placeholder="0,00" [class.error]="errors.price" />
                  <span class="change-badge" *ngIf="changePercent !== null"
                        [class.pos]="changePercent >= 0" [class.neg]="changePercent < 0">
                    {{ changePercent >= 0 ? '+' : '' }}{{ changePercent | number:'1.2-2' }}%
                  </span>
                </div>
                <span class="field-error" *ngIf="errors.price">{{ errors.price }}</span>
              </div>

              <!-- DY -->
              <div class="form-group">
                <label>Dividend Yield %</label>
                <input [(ngModel)]="form.dividendYield" type="number" min="0" max="100"
                       step="0.1" placeholder="0,0" [class.error]="errors.dy" />
                <span class="field-error" *ngIf="errors.dy">{{ errors.dy }}</span>
              </div>
            </div>
          </div>

          <!-- Dividendos mensais -->
          <div class="form-section">
            <h3>Padrão Mensal de Dividendos</h3>
            <p class="hint">Selecione os meses em que a ação costuma pagar e informe o valor médio por cota.</p>
            <div class="dividend-grid">
              <div *ngFor="let entry of dividendEntries" class="div-entry" [class.active]="entry.enabled">
                <label class="div-checkbox">
                  <input type="checkbox" [(ngModel)]="entry.enabled" />
                  <span class="month-label">{{ MONTHS[entry.month - 1] }}</span>
                </label>
                <input *ngIf="entry.enabled" [(ngModel)]="entry.value"
                       type="number" min="0" step="0.0001"
                       placeholder="R$" class="div-input" />
              </div>
            </div>
          </div>

          <div class="form-error" *ngIf="globalError">{{ globalError }}</div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" (click)="close.emit()">Cancelar</button>
          <button class="btn-save" (click)="save()" [disabled]="saving() || fetching()">
            {{ saving() ? 'Salvando...' : '+ Adicionar Ação' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.7);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000; padding: 16px;
    }
    .modal {
      background: var(--card-bg); border: 1px solid var(--border);
      border-radius: 16px; width: 100%; max-width: 640px;
      max-height: 90vh; display: flex; flex-direction: column;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }
    .modal-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 20px 24px; border-bottom: 1px solid var(--border);
      h2 { font-size: 17px; font-weight: 700; color: var(--text-primary); }
    }
    .close-btn {
      background: none; border: none; color: var(--text-secondary);
      font-size: 16px; cursor: pointer; padding: 4px 8px; border-radius: 6px;
      &:hover { background: var(--border); color: var(--text-primary); }
    }
    .modal-body { padding: 20px 24px; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 24px; }
    .form-section {
      h3 { font-size: 13px; font-weight: 600; color: var(--accent); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
    }
    .form-row { display: flex; gap: 12px; flex-wrap: wrap; }
    .form-group {
      display: flex; flex-direction: column; gap: 5px; flex: 1; min-width: 140px;
      label { font-size: 12px; color: var(--text-secondary); font-weight: 500; display: flex; align-items: center; gap: 6px; }
    }
    .ticker-group { max-width: 140px; }
    .auto-badge {
      font-size: 10px; background: rgba(104,211,145,0.2); color: #68d391;
      padding: 1px 5px; border-radius: 4px; font-weight: 600; letter-spacing: 0.3px;
    }
    .ticker-input-wrap {
      position: relative;
      &.loading input { border-color: rgba(246,173,85,0.5); }
      input { width: 100%; }
    }
    .ticker-spinner {
      position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
      color: #f6ad55; font-size: 16px; animation: spin 0.8s linear infinite;
    }
    .ticker-ok {
      position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
      color: #68d391; font-size: 14px; font-weight: 700;
    }
    @keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }
    .fetch-hint { font-size: 11px; color: #fc8181; }

    .price-wrap { position: relative; }
    .price-wrap input { width: 100%; }
    .change-badge {
      position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
      font-size: 11px; font-weight: 600; padding: 1px 5px; border-radius: 4px;
      &.pos { color: #68d391; background: rgba(104,211,145,0.15); }
      &.neg { color: #fc8181; background: rgba(252,129,74,0.15); }
    }

    input, select {
      background: var(--bg); border: 1px solid var(--border); border-radius: 8px;
      padding: 8px 12px; color: var(--text-primary); font-size: 13px;
      outline: none; transition: border-color 0.2s; width: 100%;
      &:focus { border-color: var(--accent); }
      &.error { border-color: #fc8181; }
      &::placeholder { color: var(--text-secondary); }
    }
    select option { background: var(--card-bg); }
    .field-error { font-size: 11px; color: #fc8181; }
    .hint { font-size: 12px; color: var(--text-secondary); margin-bottom: 14px; }
    .dividend-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
    .div-entry {
      background: var(--bg); border: 1px solid var(--border); border-radius: 8px;
      padding: 8px; transition: border-color 0.2s;
      &.active { border-color: rgba(99,179,237,0.4); }
    }
    .div-checkbox {
      display: flex; align-items: center; gap: 6px; cursor: pointer; margin-bottom: 6px;
      input[type=checkbox] { accent-color: var(--accent); width: 14px; height: 14px; cursor: pointer; }
    }
    .month-label { font-size: 12px; font-weight: 600; color: var(--text-primary); }
    .div-input { width: 100%; padding: 5px 8px; font-size: 12px; }
    .form-error {
      background: rgba(252,129,74,0.1); border: 1px solid rgba(252,129,74,0.3);
      border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #fc814a;
    }
    .modal-footer {
      display: flex; justify-content: flex-end; gap: 10px;
      padding: 16px 24px; border-top: 1px solid var(--border);
    }
    .btn-cancel {
      background: none; border: 1px solid var(--border); color: var(--text-secondary);
      padding: 9px 18px; border-radius: 8px; cursor: pointer; font-size: 13px;
      &:hover { border-color: var(--text-secondary); color: var(--text-primary); }
    }
    .btn-save {
      background: var(--accent); border: none; color: #0d1117;
      padding: 9px 20px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600;
      &:hover:not(:disabled) { background: #90cdf4; }
      &:disabled { opacity: 0.5; cursor: not-allowed; }
    }
  `]
})
export class AddStockModalComponent implements OnDestroy {
  @Output() close = new EventEmitter<void>();
  @Output() added = new EventEmitter<Stock>();

  readonly MONTHS = MONTHS;
  sectors = SECTORS;
  saving = signal(false);
  fetching = signal(false);
  fetchOk = signal(false);
  fetchError = signal(false);
  globalError = '';
  changePercent: number | null = null;

  autoFilled = { name: false, sector: false, price: false };

  form = {
    ticker: '',
    name: '',
    sector: '',
    price: null as number | null,
    dividendYield: null as number | null,
  };
  errors: { ticker?: string; name?: string; price?: string; dy?: string } = {};

  dividendEntries: DividendEntry[] = MONTHS.map((_, i) => ({
    month: i + 1, value: '', enabled: false,
  }));

  private ticker$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private svc: StockDataService, private api: StockApiService) {
    this.ticker$.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap(ticker => {
        const clean = ticker.toUpperCase().trim();
        if (clean.length < 5) {
          this.fetching.set(false);
          this.fetchOk.set(false);
          this.fetchError.set(false);
          return [];
        }
        this.fetching.set(true);
        this.fetchOk.set(false);
        this.fetchError.set(false);
        return this.api.getQuote(clean);
      }),
      takeUntil(this.destroy$)
    ).subscribe(quote => {
      this.fetching.set(false);
      if (!quote || !quote.found) {
        this.fetchOk.set(false);
        this.fetchError.set(true);
        return;
      }
      this.fetchOk.set(true);
      this.fetchError.set(false);
      this.changePercent = quote.changePercent;

      if (quote.name) { this.form.name = quote.name; this.autoFilled.name = true; }
      if (quote.price) { this.form.price = quote.price; this.autoFilled.price = true; }
      if (quote.sector) {
        const matched = SECTORS.find(s =>
          s.toLowerCase().includes(quote.sector.toLowerCase()) ||
          quote.sector.toLowerCase().includes(s.toLowerCase())
        );
        if (matched) { this.form.sector = matched; this.autoFilled.sector = true; }
      }
    });
  }

  onTickerChange(value: string) {
    this.form.ticker = value.toUpperCase();
    this.form.name = '';
    this.form.sector = '';
    this.form.price = null;
    this.form.dividendYield = null;
    this.autoFilled = { name: false, sector: false, price: false };
    this.fetchOk.set(false);
    this.fetchError.set(false);
    this.changePercent = null;
    this.errors = {};
    this.ticker$.next(this.form.ticker);
  }

  onOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('overlay')) this.close.emit();
  }

  save() {
    this.errors = {};
    this.globalError = '';

    if (!this.form.ticker.trim()) this.errors.ticker = 'Ticker obrigatório';
    else if (!/^[A-Z]{4}\d{1,2}$/.test(this.form.ticker)) this.errors.ticker = 'Formato inválido (ex: VALE3)';
    else if (this.svc.hasTicker(this.form.ticker)) this.errors.ticker = 'Ticker já cadastrado';

    if (!this.form.name.trim()) this.errors.name = 'Nome obrigatório';
    if (!this.form.price || this.form.price <= 0) this.errors.price = 'Preço inválido';
    if (this.form.dividendYield !== null && this.form.dividendYield < 0) this.errors.dy = 'Yield inválido';

    const activeDividends = this.dividendEntries.filter(e => e.enabled);
    if (activeDividends.length === 0) {
      this.globalError = 'Informe pelo menos um mês com pagamento de dividendos.';
    }

    if (Object.keys(this.errors).length > 0 || this.globalError) return;

    this.saving.set(true);
    const dividends: DividendRecord[] = [];
    for (const year of [2021, 2022, 2023, 2024, 2025]) {
      for (const entry of activeDividends) {
        const base = parseFloat(entry.value) || 0;
        if (base <= 0) continue;
        const variation = 0.9 + Math.random() * 0.2;
        dividends.push({
          year, month: entry.month,
          value: parseFloat((base * variation).toFixed(4)),
          type: 'dividendo',
          exDate: `${year}-${String(entry.month).padStart(2,'0')}-15`,
          payDate: `${year}-${String(entry.month).padStart(2,'0')}-20`,
        });
      }
    }

    const dy = this.form.dividendYield ?? 0;
    const stock: Stock = {
      ticker: this.form.ticker,
      name: this.form.name,
      sector: this.form.sector || 'Outro',
      price: this.form.price!,
      changePercent: this.changePercent ?? 0,
      dividendYield: dy,
      nota: dy > 0 ? Math.max(1, Math.min(10, Math.round(dy))) : 0,
      dividends,
    };

    this.svc.addStock(stock);
    this.added.emit(stock);
    this.saving.set(false);
    this.close.emit();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

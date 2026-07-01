import { Component, EventEmitter, HostListener, Output, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, switchMap, distinctUntilChanged, takeUntil } from 'rxjs';
import { StockDataService } from '../../services/stock-data.service';
import { StockApiService } from '../../services/stock-api.service';
import { Stock } from '../../models/stock.model';

const SECTORS = [
  'Bancário',
  'Seguros',
  'Petróleo & Gás',
  'Mineração',
  'Energia Elétrica',
  'Saneamento',
  'Telecomunicações',
  'Varejo',
  'Agronegócio',
  'Imobiliário',
  'Saúde',
  'Outro',
];

@Component({
  selector: 'app-add-stock-modal',
  standalone: true,
  imports: [CommonModule, IconComponent, FormsModule],
  templateUrl: './add-stock-modal.html',
  styleUrls: ['./add-stock-modal.scss'],
})
export class AddStockModalComponent implements OnDestroy {
  @Output() close = new EventEmitter<void>();
  @Output() added = new EventEmitter<Stock>();

  // Fecha o modal ao pressionar Esc.
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close.emit();
  }

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

  private ticker$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private svc: StockDataService,
    private api: StockApiService,
  ) {
    this.ticker$
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        switchMap((ticker) => {
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
        takeUntil(this.destroy$),
      )
      .subscribe((quote) => {
        this.fetching.set(false);
        if (!quote || !quote.found) {
          this.fetchOk.set(false);
          this.fetchError.set(true);
          return;
        }
        this.fetchOk.set(true);
        this.fetchError.set(false);
        this.changePercent = quote.changePercent;

        if (quote.name) {
          this.form.name = quote.name;
          this.autoFilled.name = true;
        }
        if (quote.price) {
          this.form.price = quote.price;
          this.autoFilled.price = true;
        }
        if (quote.dividendYield) {
          this.form.dividendYield = quote.dividendYield;
        }
        if (quote.sector) {
          const matched = SECTORS.find(
            (s) =>
              s.toLowerCase().includes(quote.sector.toLowerCase()) ||
              quote.sector.toLowerCase().includes(s.toLowerCase()),
          );
          if (matched) {
            this.form.sector = matched;
            this.autoFilled.sector = true;
          }
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
    else if (!/^[A-Z]{4}\d{1,2}$/.test(this.form.ticker))
      this.errors.ticker = 'Formato inválido (ex: VALE3)';
    else if (this.svc.hasTicker(this.form.ticker)) this.errors.ticker = 'Ticker já cadastrado';

    if (!this.form.name.trim()) this.errors.name = 'Nome obrigatório';
    if (!this.form.price || this.form.price <= 0) this.errors.price = 'Preço inválido';
    if (this.form.dividendYield !== null && this.form.dividendYield < 0)
      this.errors.dy = 'Yield inválido';

    if (Object.keys(this.errors).length > 0 || this.globalError) return;

    this.saving.set(true);

    const dy = this.form.dividendYield ?? 0;
    const stock: Stock = {
      ticker: this.form.ticker,
      name: this.form.name,
      sector: this.form.sector || 'Outro',
      price: this.form.price!,
      changePercent: this.changePercent ?? 0,
      dividendYield: dy,
      nota: dy > 0 ? Math.max(1, Math.min(10, Math.round(dy))) : 0,
      dividends: [],
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

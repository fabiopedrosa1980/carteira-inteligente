import { Component, computed, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockDataService } from '../../services/stock-data.service';
import { StockCardComponent } from '../stock-card/stock-card';
import { DividendCalendarComponent } from '../dividend-calendar/dividend-calendar';
import { BestMonthComponent } from '../best-month/best-month';
import { AddStockModalComponent } from '../add-stock-modal/add-stock-modal';

type SortField = 'name' | 'sector' | 'dy' | 'default';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StockCardComponent, DividendCalendarComponent, BestMonthComponent, AddStockModalComponent],
  template: `
    <div class="dashboard">
      <header class="dashboard-header">
        <div class="header-left">
          <div class="logo">
            <span class="logo-icon">📈</span>
            <span class="logo-text">Carteira <strong>Inteligente</strong></span>
          </div>
          <p class="header-subtitle">Análise de dividendos · Ações do Ibovespa</p>
        </div>
        <div class="header-right">
          <div class="header-stats">
            <div class="stat-pill">
              <span class="sp-label">Ações</span>
              <span class="sp-value">{{ stocks().length }}</span>
            </div>
            <div class="stat-pill">
              <span class="sp-label">Yield Médio</span>
              <span class="sp-value accent">{{ avgYield() | number:'1.1-1' }}%</span>
            </div>
            <div class="stat-pill">
              <span class="sp-label">Maior Yield</span>
              <span class="sp-value green">{{ maxYield() | number:'1.1-1' }}%</span>
            </div>
          </div>
          <button class="btn-add" (click)="showModal = true">+ Adicionar Ação</button>
        </div>
      </header>

      <nav class="tab-nav">
        <button *ngFor="let tab of tabs" [class.active]="activeTab === tab.id" (click)="activeTab = tab.id">
          {{ tab.icon }} {{ tab.label }}
        </button>
      </nav>

      <main class="content">
        <div *ngIf="activeTab === 'portfolio'">
          <div class="section-header">
            <div>
              <h2 class="section-title"><span class="icon">💼</span> Portfólio</h2>
              <p class="section-subtitle">Ações selecionadas com histórico consistente de dividendos</p>
            </div>
            <div class="sort-controls">
              <span class="sort-label">Ordenar por</span>
              <button *ngFor="let opt of sortOptions"
                      [class.active]="sortField() === opt.field"
                      (click)="setSort(opt.field)">
                {{ opt.label }}
                <span class="sort-arrow" *ngIf="sortField() === opt.field">
                  {{ sortAsc() ? '↑' : '↓' }}
                </span>
              </button>
            </div>
          </div>
          <div class="loading-bar" *ngIf="loading()">
            <div class="loading-bar-fill"></div>
            <span>Buscando cotações em tempo real…</span>
          </div>
          <div class="stocks-grid">
            <app-stock-card *ngFor="let stock of sortedStocks()" [stock]="stock"></app-stock-card>
            <div class="add-card" (click)="showModal = true">
              <div class="add-card-header">
                <div class="add-ticker-badge">+ Nova</div>
                <div class="add-yield-badge">0,0% a.a.</div>
              </div>
              <div class="add-card-name">Adicionar Ação</div>
              <div class="add-card-sector">Clique para cadastrar</div>
              <div class="add-card-footer">
                <div class="add-stat">
                  <span class="label">Preço</span>
                  <span class="value">R$ —</span>
                </div>
                <div class="add-stat">
                  <span class="label">Pagamentos</span>
                  <span class="value">—</span>
                </div>
              </div>
            </div>
          </div>

          <div class="summary-cards">
            <div class="summary-card">
              <div class="sc-icon">💰</div>
              <div class="sc-content">
                <div class="sc-label">Maior Dividend Yield</div>
                <div class="sc-value">{{ topYieldStock()?.ticker }} · {{ topYieldStock()?.dividendYield | number:'1.1-1' }}%</div>
              </div>
            </div>
            <div class="summary-card">
              <div class="sc-icon">📊</div>
              <div class="sc-content">
                <div class="sc-label">Total de Pagamentos (5 anos)</div>
                <div class="sc-value">{{ totalPayments() }} registros</div>
              </div>
            </div>
            <div class="summary-card">
              <div class="sc-icon">🏢</div>
              <div class="sc-content">
                <div class="sc-label">Setor com mais ações</div>
                <div class="sc-value">{{ topSector() }}</div>
              </div>
            </div>
          </div>
        </div>

        <div *ngIf="activeTab === 'calendar'">
          <app-dividend-calendar></app-dividend-calendar>
        </div>

        <div *ngIf="activeTab === 'bestmonth'">
          <app-best-month></app-best-month>
        </div>
      </main>

      <footer class="dashboard-footer">
        <p>Dados históricos simulados com base nos padrões reais de pagamento de dividendos (2021–2025). Não constitui recomendação de investimento.</p>
      </footer>
    </div>

    <app-add-stock-modal *ngIf="showModal" (close)="showModal = false"></app-add-stock-modal>
  `,
  styles: [`
    .dashboard { min-height: 100vh; background: var(--bg); }

    .dashboard-header {
      display: flex; justify-content: space-between; align-items: flex-start;
      flex-wrap: wrap; gap: 16px;
      padding: 24px 32px; border-bottom: 1px solid var(--border);
      background: var(--header-bg);
    }
    .logo { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }
    .logo-icon { font-size: 24px; }
    .logo-text { font-size: 20px; color: var(--text-primary); }
    .logo-text strong { color: var(--accent); }
    .header-subtitle { font-size: 13px; color: var(--text-secondary); }

    .header-right { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
    .header-stats { display: flex; gap: 12px; flex-wrap: wrap; }
    .stat-pill {
      display: flex; flex-direction: column; align-items: center;
      background: var(--card-bg); border: 1px solid var(--border);
      border-radius: 10px; padding: 10px 16px; min-width: 80px;
    }
    .sp-label { font-size: 11px; color: var(--text-secondary); margin-bottom: 2px; }
    .sp-value { font-size: 18px; font-weight: 700; color: var(--text-primary); }
    .sp-value.accent { color: var(--accent); }
    .sp-value.green { color: #68d391; }

    .btn-add {
      background: var(--accent); border: none; color: #0d1117;
      padding: 10px 18px; border-radius: 10px; cursor: pointer;
      font-size: 13px; font-weight: 700; white-space: nowrap;
      transition: background 0.2s;
      &:hover { background: #90cdf4; }
    }

    .tab-nav {
      display: flex; gap: 4px; padding: 16px 32px;
      border-bottom: 1px solid var(--border); background: var(--header-bg);
      button {
        padding: 8px 18px; border-radius: 8px; border: none;
        background: transparent; color: var(--text-secondary);
        cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.2s;
        &:hover { background: var(--card-bg); color: var(--text-primary); }
        &.active { background: var(--accent); color: #0d1117; font-weight: 600; }
      }
    }

    .content { padding: 32px; }

    .section-header { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; }
    .sort-controls {
      display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
    }
    .sort-label { font-size: 12px; color: var(--text-secondary); margin-right: 2px; }
    .sort-controls button {
      padding: 5px 12px; border-radius: 20px; border: 1px solid var(--border);
      background: var(--card-bg); color: var(--text-secondary);
      cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s;
      display: flex; align-items: center; gap: 4px;
      &:hover { border-color: var(--accent); color: var(--text-primary); }
      &.active { border-color: var(--accent); background: rgba(99,179,237,0.12); color: var(--accent); font-weight: 600; }
    }
    .sort-arrow { font-size: 11px; }
    .section-title {
      font-size: 20px; font-weight: 700; color: var(--text-primary);
      margin-bottom: 6px; display: flex; align-items: center; gap: 8px;
    }
    .section-subtitle { font-size: 13px; color: var(--text-secondary); }

    .loading-bar {
      display: flex; align-items: center; gap: 10px;
      margin-bottom: 16px; font-size: 12px; color: var(--text-secondary);
    }
    .loading-bar-fill {
      width: 120px; height: 3px; border-radius: 2px;
      background: linear-gradient(90deg, var(--accent) 0%, transparent 100%);
      background-size: 200% 100%;
      animation: shimmer 1.2s linear infinite;
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    .stocks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 14px; margin-bottom: 32px;
    }

    .add-card {
      background: var(--card-bg);
      border: 1px dashed var(--border);
      border-radius: 12px; padding: 16px;
      cursor: pointer; transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
      opacity: 0.6;
      &:hover {
        transform: translateY(-2px);
        border-color: var(--accent);
        box-shadow: 0 4px 20px rgba(99,179,237,0.15);
        opacity: 1;
      }
    }
    .add-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .add-ticker-badge {
      font-size: 15px; font-weight: 700; padding: 4px 10px; border-radius: 6px;
      background: rgba(99,179,237,0.1); color: #63b3ed; letter-spacing: 0.5px;
    }
    .add-yield-badge {
      font-size: 12px; font-weight: 600; padding: 3px 8px; border-radius: 20px;
      background: rgba(160,174,192,0.15); color: var(--text-secondary);
    }
    .add-card-name { font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 2px; }
    .add-card-sector { font-size: 12px; color: var(--text-secondary); margin-bottom: 14px; }
    .add-card-footer { display: flex; justify-content: space-between; }
    .add-stat { display: flex; flex-direction: column; gap: 2px; }
    .add-stat .label { font-size: 11px; color: var(--text-secondary); }
    .add-stat .value { font-size: 14px; font-weight: 600; color: var(--text-secondary); }

    .summary-cards { display: flex; gap: 14px; flex-wrap: wrap; }
    .summary-card {
      flex: 1; min-width: 200px;
      display: flex; gap: 14px; align-items: center;
      background: var(--card-bg); border: 1px solid var(--border);
      border-radius: 12px; padding: 16px 20px;
    }
    .sc-icon { font-size: 24px; }
    .sc-label { font-size: 12px; color: var(--text-secondary); margin-bottom: 2px; }
    .sc-value { font-size: 15px; font-weight: 700; color: var(--text-primary); }

    .dashboard-footer {
      text-align: center; padding: 20px 32px;
      border-top: 1px solid var(--border);
      font-size: 12px; color: var(--text-secondary);
    }
  `]
})
export class DashboardComponent {
  showModal = false;
  activeTab = 'portfolio';

  sortField = signal<SortField>('default');
  sortAsc = signal(true);

  sortOptions: { label: string; field: SortField }[] = [
    { label: 'Nome', field: 'name' },
    { label: 'Setor', field: 'sector' },
    { label: 'DY', field: 'dy' },
  ];

  setSort(field: SortField) {
    if (this.sortField() === field) {
      this.sortAsc.update(v => !v);
    } else {
      this.sortField.set(field);
      this.sortAsc.set(field === 'dy' ? false : true);
    }
  }

  stocks = computed(() => this.svc.stocks());

  sortedStocks = computed(() => {
    const list = [...this.stocks()];
    const field = this.sortField();
    const asc = this.sortAsc();
    if (field === 'default') return list;
    return list.sort((a, b) => {
      let cmp = 0;
      if (field === 'name') cmp = a.name.localeCompare(b.name, 'pt-BR');
      else if (field === 'sector') cmp = a.sector.localeCompare(b.sector, 'pt-BR');
      else if (field === 'dy') cmp = a.dividendYield - b.dividendYield;
      return asc ? cmp : -cmp;
    });
  });

  avgYield = computed(() =>
    this.stocks().reduce((s, st) => s + st.dividendYield, 0) / (this.stocks().length || 1)
  );
  maxYield = computed(() =>
    Math.max(...this.stocks().map(s => s.dividendYield))
  );
  topYieldStock = computed(() => {
    const max = this.maxYield();
    return this.stocks().find(s => s.dividendYield === max);
  });
  totalPayments = computed(() =>
    this.stocks().reduce((s, st) => s + st.dividends.length, 0)
  );
  topSector = computed(() => {
    const counts: Record<string, number> = {};
    for (const s of this.stocks()) counts[s.sector] = (counts[s.sector] ?? 0) + 1;
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return top ? `${top[0]} (${top[1]} ações)` : '-';
  });

  tabs = [
    { id: 'portfolio', label: 'Portfólio', icon: '💼' },
    { id: 'calendar', label: 'Calendário', icon: '📅' },
    { id: 'bestmonth', label: 'Melhor Mês', icon: '🎯' },
  ];

  loading: Signal<boolean> = signal(true);

  constructor(readonly svc: StockDataService) {
    this.loading = svc.loading;
  }
}

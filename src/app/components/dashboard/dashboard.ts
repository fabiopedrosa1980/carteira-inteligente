import { Component, computed, signal, Signal, inject, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockDataService } from '../../services/stock-data.service';
import { BackendApiService, ApiAcaoItem } from '../../services/backend-api.service';
import { StockApiService } from '../../services/stock-api.service';
import { AuthService } from '../../services/auth.service';
import { StockCardComponent } from '../stock-card/stock-card';
import { AddStockModalComponent } from '../add-stock-modal/add-stock-modal';
import { MyAssetsComponent } from '../my-assets/my-assets';
import { GoalsComponent } from '../goals/goals';
import { DividendHistoryComponent } from '../dividend-history/dividend-history';
import { Stock } from '../../models/stock.model';

type SortField = 'name' | 'price' | 'change' | 'default';

const THEME_KEY = 'ci-theme';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StockCardComponent,
    AddStockModalComponent,
    MyAssetsComponent,
    GoalsComponent,
    DividendHistoryComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent {
  private readonly api = inject(BackendApiService);
  private readonly stockApi = inject(StockApiService);
  private readonly auth = inject(AuthService);

  showModal = false;
  activeTab = 'meus-ativos';
  isDark = signal(localStorage.getItem(THEME_KEY) !== 'light');

  readonly acoes = signal<Stock[]>([]);
  readonly acoesLoading = signal(false);

  toggleTheme() {
    this.isDark.update((v) => !v);
    document.body.classList.toggle('light-theme', !this.isDark());
    localStorage.setItem(THEME_KEY, this.isDark() ? 'dark' : 'light');
  }

  sortField = signal<SortField>('default');
  sortAsc = signal(true);

  sortOptions: { label: string; field: SortField }[] = [
    { label: 'Nome', field: 'name' },
    { label: 'Preço', field: 'price' },
    { label: 'Variação', field: 'change' },
  ];

  setSort(field: SortField) {
    if (this.sortField() === field) {
      this.sortAsc.update((v) => !v);
    } else {
      this.sortField.set(field);
      this.sortAsc.set(field !== 'change');
    }
  }

  sortedStocks = computed(() => {
    const list = [...this.acoes()];
    const field = this.sortField();
    const asc = this.sortAsc();
    if (field === 'default') return list;
    return list.sort((a, b) => {
      let cmp = 0;
      if (field === 'name') cmp = a.name.localeCompare(b.name, 'pt-BR');
      else if (field === 'price') cmp = a.price - b.price;
      else if (field === 'change') cmp = a.changePercent - b.changePercent;
      return asc ? cmp : -cmp;
    });
  });

  maxChange = computed(() =>
    this.acoes().length ? Math.max(...this.acoes().map((s) => s.changePercent)) : 0,
  );
  topChangeStock = computed(() => this.acoes().find((s) => s.changePercent === this.maxChange()));

  tabs = [
    { id: 'meus-ativos', label: 'Meus Ativos', icon: '📊' },
    { id: 'portfolio', label: 'Minhas Ações', icon: '💼' },
    { id: 'calendar', label: 'Dividendos', icon: '📅' },
    { id: 'metas', label: 'Metas', icon: '🎯' },
  ];

  loading: Signal<boolean> = signal(true);

  constructor(readonly svc: StockDataService) {
    this.loading = svc.loading;
    document.body.classList.toggle('light-theme', !this.isDark());

    // Carrega ações sempre que o usuário estiver autenticado.
    // Dispara na criação do componente e também após re-login sem refresh.
    effect(() => {
      if (this.auth.isAuthenticated()) {
        untracked(() => this.loadAcoes());
      }
    });
  }

  loadAcoes(): void {
    this.acoesLoading.set(true);
    this.api.getAcoes().subscribe({
      next: (items: ApiAcaoItem[]) => {
        const stocks: Stock[] = items.map((item) => ({
          ticker: item.ticker,
          name: item.name || item.ticker,
          sector: 'Ações',
          price: item.current_price,
          changePercent: item.change_percent,
          dividendYield: item.dividend_yield,
          nota: item.nota,
          dividends: [],
        }));
        this.acoes.set(stocks);
        this.acoesLoading.set(false);

        // Enriquecimento: sobrescreve a variação diária com a cotação real-time
        // (base Yahoo Finance), que está alinhada ao Investidor10/Finance.
        // O campo change_percent de /transactions/acoes está divergente.
        const tickers = stocks.map((s) => s.ticker);
        if (tickers.length === 0) return;
        this.stockApi.getBulkQuotes(tickers).subscribe((quotes) => {
          const byTicker = new Map(
            quotes.filter((q) => q.found).map((q) => [q.ticker.toUpperCase(), q]),
          );
          this.acoes.set(
            this.acoes().map((s) => {
              const quote = byTicker.get(s.ticker.toUpperCase());
              return quote ? { ...s, changePercent: quote.changePercent } : s;
            }),
          );
        });
      },
      error: () => this.acoesLoading.set(false),
    });
  }
}

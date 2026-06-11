import { Component, computed, signal, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockDataService } from '../../services/stock-data.service';
import { BackendApiService, ApiAcaoItem } from '../../services/backend-api.service';
import { StockCardComponent } from '../stock-card/stock-card';
import { DividendCalendarComponent } from '../dividend-calendar/dividend-calendar';
import { AddStockModalComponent } from '../add-stock-modal/add-stock-modal';
import { MeusAtivosComponent } from '../meus-ativos/meus-ativos';
import { Stock } from '../../models/stock.model';

type SortField = 'name' | 'sector' | 'dy' | 'nota' | 'price' | 'default';

const THEME_KEY = 'ci-theme';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StockCardComponent, DividendCalendarComponent, AddStockModalComponent, MeusAtivosComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent {
  private readonly api = inject(BackendApiService);

  showModal = false;
  activeTab = 'meus-ativos';
  isDark = signal(localStorage.getItem(THEME_KEY) !== 'light');

  readonly acoes = signal<Stock[]>([]);
  readonly acoesLoading = signal(true);

  toggleTheme() {
    this.isDark.update(v => !v);
    const next = this.isDark();
    document.body.classList.toggle('light-theme', !next);
    localStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
  }

  sortField = signal<SortField>('default');
  sortAsc = signal(true);

  sortOptions: { label: string; field: SortField }[] = [
    { label: 'Nome', field: 'name' },
    { label: 'Preço', field: 'price' },
    { label: 'Variação', field: 'dy' },
  ];

  setSort(field: SortField) {
    if (this.sortField() === field) {
      this.sortAsc.update(v => !v);
    } else {
      this.sortField.set(field);
      this.sortAsc.set(field === 'dy' || field === 'nota' ? false : true);
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
      else if (field === 'sector') cmp = a.sector.localeCompare(b.sector, 'pt-BR');
      else if (field === 'dy') cmp = a.changePercent - b.changePercent;
      else if (field === 'nota') cmp = a.nota - b.nota;
      else if (field === 'price') cmp = a.price - b.price;
      return asc ? cmp : -cmp;
    });
  });

  totalValue = computed(() =>
    this.acoes().reduce((s, st) => s + st.price * (st.nota || 0), 0)
  );

  maxChange = computed(() =>
    this.acoes().length ? Math.max(...this.acoes().map(s => s.changePercent)) : 0
  );

  topChangeStock = computed(() => {
    const max = this.maxChange();
    return this.acoes().find(s => s.changePercent === max);
  });

  tabs = [
    { id: 'meus-ativos', label: 'Meus Ativos', icon: '📊' },
    { id: 'portfolio', label: 'Minhas Ações', icon: '💼' },
    { id: 'calendar', label: 'Dividendos', icon: '📅' },
  ];

  loading: Signal<boolean> = signal(true);

  constructor(readonly svc: StockDataService) {
    this.loading = svc.loading;
    document.body.classList.toggle('light-theme', !this.isDark());
    this.loadAcoes();
  }

  loadAcoes(): void {
    this.acoesLoading.set(true);
    this.api.getAcoes().subscribe({
      next: (items: ApiAcaoItem[]) => {
        this.acoes.set(items.map(item => ({
          ticker: item.ticker,
          name: item.name || item.ticker,
          sector: 'Ações',
          price: item.current_price,
          changePercent: item.change_percent,
          dividendYield: 0,
          nota: Math.min(Math.round(item.total_quantity), 10),
          dividends: [],
        })));
        this.acoesLoading.set(false);
      },
      error: () => this.acoesLoading.set(false),
    });
  }
}

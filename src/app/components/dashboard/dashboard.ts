import { Component, computed, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockDataService } from '../../services/stock-data.service';
import { StockCardComponent } from '../stock-card/stock-card';
import { DividendCalendarComponent } from '../dividend-calendar/dividend-calendar';
import { AddStockModalComponent } from '../add-stock-modal/add-stock-modal';
import { MeusAtivosComponent } from '../meus-ativos/meus-ativos';

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
  showModal = false;
  activeTab = 'meus-ativos';
  isDark = signal(localStorage.getItem(THEME_KEY) !== 'light');

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
    { label: 'Setor', field: 'sector' },
    { label: 'DY', field: 'dy' },
    { label: 'Nota', field: 'nota' },
    { label: 'Preço', field: 'price' },
  ];

  setSort(field: SortField) {
    if (this.sortField() === field) {
      this.sortAsc.update(v => !v);
    } else {
      this.sortField.set(field);
      this.sortAsc.set(field === 'dy' || field === 'nota' ? false : true);
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
      else if (field === 'nota') cmp = a.nota - b.nota;
      else if (field === 'price') cmp = a.price - b.price;
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
  topSector = computed(() => {
    const counts: Record<string, number> = {};
    for (const s of this.stocks()) counts[s.sector] = (counts[s.sector] ?? 0) + 1;
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return top ? `${top[0]} (${top[1]} ações)` : '-';
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
  }
}

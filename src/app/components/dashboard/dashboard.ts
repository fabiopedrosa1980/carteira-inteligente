import { Component, computed, signal, Signal, inject, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StockDataService } from '../../services/stock-data.service';
import { BackendApiService, ApiAcaoItem } from '../../services/backend-api.service';
import { AuthService } from '../../services/auth.service';
import { TransactionService } from '../../services/transaction.service';
import { MetasService } from '../../services/metas.service';
import { StockCardComponent } from '../stock-card/stock-card';
import { AddStockModalComponent } from '../add-stock-modal/add-stock-modal';
import { MyAssetsComponent } from '../my-assets/my-assets';
import { GoalsComponent } from '../goals/goals';
import { DividendsComponent } from '../dividends/dividends';
import { Stock } from '../../models/stock.model';

type SortField = 'name' | 'price' | 'change' | 'dy' | 'nota' | 'default';

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
    DividendsComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent {
  private readonly api = inject(BackendApiService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly transactionSvc = inject(TransactionService);
  private readonly metasSvc = inject(MetasService);

  logout(): void {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

  showModal = false;
  activeTab = 'meus-ativos';

  // Troca de aba: sempre recarrega da API os dados da tela selecionada,
  // garantindo que o usuário veja informações atualizadas a cada navegação.
  setActiveTab(id: string): void {
    this.activeTab = id;
    this.refreshActiveTab();
  }

  private refreshActiveTab(): void {
    switch (this.activeTab) {
      case 'meus-ativos':
        this.transactionSvc.reload();
        break;
      case 'portfolio':
        this.loadAcoes();
        break;
      case 'calendar':
        // Garante que a lista de ações exista para o histórico de dividendos;
        // o próprio DividendHistoryComponent recarrega ao ser recriado.
        this.loadAcoes();
        break;
      case 'metas':
        this.metasSvc.load();
        break;
    }
  }
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
    { label: 'DY', field: 'dy' },
    { label: 'Nota', field: 'nota' },
  ];

  setSort(field: SortField) {
    if (this.sortField() === field) {
      this.sortAsc.update((v) => !v);
    } else {
      this.sortField.set(field);
      // Métricas onde "maior é melhor" iniciam em ordem decrescente
      this.sortAsc.set(!['change', 'dy', 'nota'].includes(field));
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
      else if (field === 'dy') cmp = a.dividendYield - b.dividendYield;
      else if (field === 'nota') cmp = a.nota - b.nota;
      return asc ? cmp : -cmp;
    });
  });

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
        this.acoes.set(
          items.map((item) => ({
            ticker: item.ticker,
            name: item.name || item.ticker,
            sector: 'Ações',
            price: item.current_price,
            changePercent: item.change_percent,
            dividendYield: item.dividend_yield,
            nota: item.nota,
            dividends: [],
          })),
        );
        this.acoesLoading.set(false);
      },
      error: () => this.acoesLoading.set(false),
    });
  }
}

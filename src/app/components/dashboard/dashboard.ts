import { Component, signal, Signal, inject, effect, untracked, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { StockDataService } from '../../services/stock-data.service';
import { BackendApiService, ApiAcaoItem, ApiTransaction } from '../../services/backend-api.service';
import { AuthService } from '../../services/auth.service';
import { TransactionService } from '../../services/transaction.service';
import { MetasService } from '../../services/metas.service';
import { AddStockModalComponent } from '../add-stock-modal/add-stock-modal';
import { AddTransactionModalComponent } from '../add-transaction-modal/add-transaction-modal';
import { MyAssetsComponent } from '../my-assets/my-assets';
import { GoalsComponent } from '../goals/goals';
import { DividendsComponent } from '../dividends/dividends';
import { ImportComponent } from '../import/import';
import { PortfolioComponent } from '../portfolio/portfolio';
import { Stock } from '../../models/stock.model';
import { AssetType } from '../../models/transaction.model';
import { ValueVisibilityService } from '../../services/value-visibility.service';
import { OnboardingTourService } from '../../services/onboarding-tour.service';

const THEME_KEY = 'ci-theme';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AddStockModalComponent,
    AddTransactionModalComponent,
    MyAssetsComponent,
    GoalsComponent,
    DividendsComponent,
    ImportComponent,
    PortfolioComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements AfterViewInit {
  private readonly api = inject(BackendApiService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly transactionSvc = inject(TransactionService);
  private readonly metasSvc = inject(MetasService);
  private readonly visibility = inject(ValueVisibilityService);
  private readonly tour = inject(OnboardingTourService);

  // Exibe o tour guiado apenas no primeiro acesso (flag em localStorage). O
  // pequeno atraso garante que a nav de abas já esteja no DOM para o spotlight.
  ngAfterViewInit(): void {
    if (!this.tour.hasSeen()) {
      setTimeout(() => this.tour.start((tabId) => this.setActiveTab(tabId)), 400);
    }
  }

  // Reabre o tour manualmente (botão "?" do header), independente do flag.
  startTour(): void {
    this.tour.start((tabId) => this.setActiveTab(tabId));
  }

  readonly user = this.auth.user;

  logout(): void {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

  showModal = false;
  showTxModal = signal(false);
  txPresetType = signal<AssetType | null>(null);
  activeTab = 'portfolio';

  setActiveTab(id: string): void {
    this.activeTab = id;
    this.refreshActiveTab();
  }

  // Visão inicial da tela de Dividendos quando aberta pelos cards de resumo.
  readonly dividendsTab = signal<'historico' | 'recebidos' | 'projetados' | 'radar'>('historico');

  // Deep-link a partir dos cards "Dividendos Recebidos"/"a receber".
  openDividends(tab: 'recebidos' | 'projetados'): void {
    this.dividendsTab.set(tab);
    this.setActiveTab('calendar');
  }

  goHome(): void {
    this.setActiveTab('portfolio');
  }

  private refreshActiveTab(): void {
    switch (this.activeTab) {
      case 'meus-ativos':
        this.transactionSvc.reload();
        break;
      case 'portfolio':
        this.loadAtivos();
        break;
      case 'calendar':
        this.loadAtivos();
        break;
      case 'metas':
        this.metasSvc.load();
        break;
    }
  }

  isDark = signal(localStorage.getItem(THEME_KEY) !== 'light');

  // Privacidade: estado global compartilhado (serviço). O controle agora vive no
  // menu superior e mascara os totais em R$ de todas as telas.
  readonly valoresOcultos = this.visibility.hidden;

  toggleValores(): void {
    this.visibility.toggle();
  }

  readonly acoes = signal<Stock[]>([]);
  readonly acoesLoading = signal(false);

  private readonly groupToAssetType: Record<string, AssetType> = {
    Ações: 'Acoes',
    FII: 'FIIs',
    ETF: 'ETFs',
  };

  openAddTx(group: string): void {
    this.txPresetType.set(this.groupToAssetType[group] ?? null);
    this.showTxModal.set(true);
  }

  // Fecha o modal de lançamento e força a releitura dos dados na API para que a
  // tela reflita o estado atualizado (posições, totais e dividendos).
  closeTxModal(): void {
    this.showTxModal.set(false);
    this.loadAtivos();
    this.svc.reload();
    this.transactionSvc.reload();
  }

  toggleTheme() {
    this.isDark.update((v) => !v);
    document.body.classList.toggle('light-theme', !this.isDark());
    localStorage.setItem(THEME_KEY, this.isDark() ? 'dark' : 'light');
  }

  tabs = [
    {
      id: 'portfolio',
      label: 'Meus Ativos',
      iconPath: 'M3 17l6-6 4 4 7-8M21 7v5M21 7h-5',
    },
    {
      id: 'meus-ativos',
      label: 'Lançamentos',
      iconPath: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    },
    {
      id: 'calendar',
      label: 'Dividendos',
      iconPath:
        'M7 3v3M17 3v3M4 8h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z',
    },
    {
      id: 'metas',
      label: 'Metas',
      iconPath:
        'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
    },
    {
      id: 'import',
      label: 'Importar',
      iconPath: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
    },
  ];

  loading: Signal<boolean> = signal(true);

  constructor(readonly svc: StockDataService) {
    this.loading = svc.loading;
    document.body.classList.toggle('light-theme', !this.isDark());

    effect(() => {
      if (this.auth.isAuthenticated()) {
        untracked(() => this.loadAtivos());
      }
    });
  }

  private deriveEtfPositions(txns: ApiTransaction[]): Stock[] {
    const byTicker = new Map<string, ApiTransaction[]>();
    for (const t of txns) {
      if (!byTicker.has(t.ticker)) byTicker.set(t.ticker, []);
      byTicker.get(t.ticker)!.push(t);
    }
    return Array.from(byTicker.entries())
      .map(([ticker, ts]) => {
        const qty = ts.reduce((s, t) => s + t.quantity, 0);
        const cost = ts.reduce((s, t) => s + t.quantity * t.price, 0);
        return {
          ticker,
          name: ticker,
          sector: 'ETF',
          price: 0,
          changePercent: 0,
          dividendYield: 0,
          nota: 0,
          dividends: [],
          quantity: qty,
          avgPrice: qty > 0 ? cost / qty : 0,
        } as Stock;
      })
      .filter((s) => (s.quantity ?? 0) > 0);
  }

  loadAtivos(): void {
    this.acoesLoading.set(true);
    forkJoin([
      this.api.getAcoes(),
      this.api.getFiis(),
      this.api.getEtfs(),
      this.api.getTransactions(),
    ]).subscribe({
      next: ([acoes, fiis, etfs, txns]) => {
        const mapItem = (item: ApiAcaoItem, sector: string): Stock => ({
          ticker: item.ticker,
          name: item.name || item.ticker,
          sector,
          price: item.current_price,
          changePercent: item.change_percent,
          dividendYield: item.dividend_yield,
          nota: item.nota,
          dividends: [],
          stockId: item.stock_id,
          quantity: item.total_quantity,
          avgPrice: item.avg_price,
          indicators: item.indicators,
          companyInfo: item.company_info,
          high52: item.fifty_two_week_high,
          low52: item.fifty_two_week_low,
        });

        // Se o backend não tem /transactions/etfs, deriva posições das transações.
        const etfStocks =
          etfs.length > 0
            ? etfs.map((item) => mapItem(item, 'ETF'))
            : this.deriveEtfPositions(txns.filter((t) => t.asset_type === 'ETFs'));

        this.acoes.set([
          ...acoes.map((item) => mapItem(item, 'Ações')),
          ...fiis.map((item) => mapItem(item, 'FII')),
          ...etfStocks,
        ]);
        this.acoesLoading.set(false);
      },
      error: () => this.acoesLoading.set(false),
    });
  }
}

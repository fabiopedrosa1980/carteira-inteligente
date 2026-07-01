import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stock } from '../../models/stock.model';
import { PortfolioSummaryComponent } from '../portfolio-summary/portfolio-summary';
import { AllocationCardComponent } from '../allocation-card/allocation-card';
import { PortfolioTableComponent } from '../portfolio-table/portfolio-table';
import { StockDetailsModalComponent } from '../stock-details-modal/stock-details-modal';
import { PrecoTetoService } from '../../services/preco-teto.service';

/**
 * Aba "Meus Ativos": compõe resumo + alocação + tabela de ativos e hospeda o
 * modal de detalhe. Casca que era inline no dashboard — agora o dashboard só
 * repassa as posições e reage aos eventos (abrir dividendos / novo lançamento).
 */
@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    PortfolioSummaryComponent,
    AllocationCardComponent,
    PortfolioTableComponent,
    StockDetailsModalComponent,
  ],
  templateUrl: './portfolio.html',
  styleUrls: ['./portfolio.scss'],
})
export class PortfolioComponent {
  // Público: usado no template para o [precoTeto] do modal de detalhe.
  readonly precoTetoSvc = inject(PrecoTetoService);

  @Input() stocks: Stock[] = [];
  @Input() loading = false;
  @Input() hideValues = false;

  @Output() openDividends = new EventEmitter<'recebidos' | 'projetados'>();
  @Output() addTransaction = new EventEmitter<string>();

  readonly skelCards = Array.from({ length: 6 });
  // Ativo selecionado para o modal de detalhe. Vive aqui: ao trocar de aba o
  // componente é destruído (ngIf no dashboard) e o estado zera naturalmente.
  readonly selectedStock = signal<Stock | null>(null);
}

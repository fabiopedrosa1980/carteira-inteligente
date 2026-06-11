import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { AddTransactionModalComponent } from '../add-transaction-modal/add-transaction-modal';
import { AssetType, PortfolioItem } from '../../models/transaction.model';

@Component({
  selector: 'app-meus-ativos',
  standalone: true,
  imports: [CommonModule, AddTransactionModalComponent],
  templateUrl: './meus-ativos.html',
  styleUrls: ['./meus-ativos.scss'],
})
export class MeusAtivosComponent {
  private readonly svc = inject(TransactionService);

  showModal = false;

  readonly portfolio = this.svc.portfolio;
  readonly loading = this.svc.portfolioLoading;

  sections: { id: AssetType; label: string; icon: string }[] = [
    { id: 'Acoes', label: 'Ações', icon: '📈' },
    { id: 'FIIs', label: 'FIIs', icon: '🏢' },
    { id: 'ETFs', label: 'ETFs', icon: '🌐' },
  ];

  collapsed = signal<Set<AssetType>>(new Set());

  sectionData = computed(() => {
    const all = this.portfolio();
    return {
      Acoes: all.filter(p => p.assetType === 'Acoes'),
      FIIs:  all.filter(p => p.assetType === 'FIIs'),
      ETFs:  all.filter(p => p.assetType === 'ETFs'),
    };
  });

  totalCurrentValue = computed(() =>
    this.portfolio().reduce((sum, p) => sum + p.totalQuantity * p.currentPrice, 0)
  );

  totalFor(type: AssetType): number {
    return (this.sectionData()[type] ?? []).reduce((s, p) => s + p.totalQuantity * p.currentPrice, 0);
  }

  plPercent(item: PortfolioItem): number {
    if (item.avgPrice === 0) return 0;
    return ((item.currentPrice - item.avgPrice) / item.avgPrice) * 100;
  }

  toggle(id: AssetType): void {
    this.collapsed.update(set => {
      const next = new Set(set);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  isCollapsed(id: AssetType): boolean {
    return this.collapsed().has(id);
  }

  onModalClose(): void {
    this.showModal = false;
  }
}

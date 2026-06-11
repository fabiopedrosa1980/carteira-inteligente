import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { AddTransactionModalComponent } from '../add-transaction-modal/add-transaction-modal';
import { AssetType } from '../../models/transaction.model';

@Component({
  selector: 'app-meus-ativos',
  standalone: true,
  imports: [CommonModule, AddTransactionModalComponent],
  templateUrl: './meus-ativos.html',
  styleUrls: ['./meus-ativos.scss'],
})
export class MeusAtivosComponent {
  showModal = false;

  sections: { id: AssetType; label: string; icon: string }[] = [
    { id: 'Acoes', label: 'Ações', icon: '📈' },
    { id: 'FIIs', label: 'FIIs', icon: '🏢' },
    { id: 'ETFs', label: 'ETFs', icon: '🌐' },
  ];

  collapsed = signal<Set<AssetType>>(new Set());

  sectionData = computed(() => {
    const all = this.svc.transactions();
    return {
      Acoes: all.filter(t => t.assetType === 'Acoes'),
      FIIs: all.filter(t => t.assetType === 'FIIs'),
      ETFs: all.filter(t => t.assetType === 'ETFs'),
    };
  });

  totalAll = computed(() =>
    this.svc.transactions().reduce((sum, t) => sum + t.quantity * t.price, 0)
  );

  toggle(id: AssetType) {
    this.collapsed.update(set => {
      const next = new Set(set);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  isCollapsed(id: AssetType): boolean {
    return this.collapsed().has(id);
  }

  totalFor(type: AssetType): number {
    return (this.sectionData()[type] ?? []).reduce((s, t) => s + t.quantity * t.price, 0);
  }

  constructor(readonly svc: TransactionService) {}

  remove(id: number) {
    this.svc.remove(id);
  }
}

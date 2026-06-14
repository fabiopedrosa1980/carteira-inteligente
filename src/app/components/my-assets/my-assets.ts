import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { AddTransactionModalComponent } from '../add-transaction-modal/add-transaction-modal';
import { AssetType, Transaction } from '../../models/transaction.model';

type SortField = 'ticker' | 'date' | 'quantity' | 'price' | 'total';

@Component({
  selector: 'app-my-assets',
  standalone: true,
  imports: [CommonModule, AddTransactionModalComponent],
  templateUrl: './my-assets.html',
  styleUrls: ['./my-assets.scss'],
})
export class MyAssetsComponent {
  showModal = false;
  editing = signal<Transaction | null>(null);

  sections: { id: AssetType; label: string; icon: string }[] = [
    { id: 'Acoes', label: 'Ações', icon: '📈' },
    { id: 'FIIs', label: 'FIIs', icon: '🏢' },
    { id: 'ETFs', label: 'ETFs', icon: '🌐' },
  ];

  collapsed = signal<Set<AssetType>>(new Set());

  sortField = signal<SortField | null>(null);
  sortAsc = signal(true);

  setSort(field: SortField) {
    if (this.sortField() === field) {
      this.sortAsc.update((v) => !v);
    } else {
      this.sortField.set(field);
      this.sortAsc.set(true);
    }
  }

  private sortRows(rows: Transaction[]): Transaction[] {
    const field = this.sortField();
    if (!field) return rows;
    const asc = this.sortAsc();
    return [...rows].sort((a, b) => {
      let cmp = 0;
      switch (field) {
        case 'ticker':
          cmp = a.ticker.localeCompare(b.ticker, 'pt-BR');
          break;
        case 'date':
          cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'quantity':
          cmp = a.quantity - b.quantity;
          break;
        case 'price':
          cmp = a.price - b.price;
          break;
        case 'total':
          cmp = a.quantity * a.price - b.quantity * b.price;
          break;
      }
      return asc ? cmp : -cmp;
    });
  }

  sectionData = computed(() => {
    const all = this.svc.transactions();
    return {
      Acoes: this.sortRows(all.filter((t) => t.assetType === 'Acoes')),
      FIIs: this.sortRows(all.filter((t) => t.assetType === 'FIIs')),
      ETFs: this.sortRows(all.filter((t) => t.assetType === 'ETFs')),
    };
  });

  totalAll = computed(() =>
    this.svc.transactions().reduce((sum, t) => sum + t.quantity * t.price, 0),
  );

  toggle(id: AssetType) {
    this.collapsed.update((set) => {
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

  openAdd() {
    this.editing.set(null);
    this.showModal = true;
  }

  edit(t: Transaction) {
    this.editing.set(t);
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editing.set(null);
  }

  remove(id: number) {
    this.svc.remove(id);
  }
}

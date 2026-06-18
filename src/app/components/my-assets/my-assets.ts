import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { ConfirmService } from '../../services/confirm.service';
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
  presetType = signal<AssetType | null>(null);

  sections: { id: AssetType; label: string; short: string; iconPath: string }[] = [
    { id: 'Acoes', label: 'Lançamentos de Ações', short: 'Ações', iconPath: '' },
    {
      id: 'FIIs',
      label: 'Lançamentos de FIIs',
      short: 'FIIs',
      iconPath: 'M3 21h18M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M9 8h2M9 12h2M9 16h2',
    },
    {
      id: 'ETFs',
      label: 'Lançamentos de ETFs',
      short: 'ETFs',
      iconPath:
        'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z',
    },
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

  openAdd(type?: AssetType) {
    this.editing.set(null);
    this.presetType.set(type ?? null);
    this.showModal = true;
  }

  edit(t: Transaction) {
    this.editing.set(t);
    this.presetType.set(null);
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editing.set(null);
    this.presetType.set(null);
  }

  private readonly confirmService = inject(ConfirmService);

  remove(t: Transaction) {
    this.confirmService
      .confirm({ message: `Deseja realmente excluir o lançamento de ${t.ticker}?` })
      .then((ok) => {
        if (ok) this.svc.remove(t.id);
      });
  }
}

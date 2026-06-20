import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { ConfirmService } from '../../services/confirm.service';
import { AddTransactionModalComponent } from '../add-transaction-modal/add-transaction-modal';
import { AssetType, Transaction } from '../../models/transaction.model';

type SortField = 'ticker' | 'date' | 'quantity' | 'price' | 'total';

interface GroupedRow {
  ticker: string;
  quantity: number;
  avgPrice: number;
  total: number;
  count: number;
}

const GROUPED_KEY = 'lancamentos-grouped';

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

  sections: { id: AssetType; label: string; short: string }[] = [
    { id: 'Acoes', label: 'Ações', short: 'Ações' },
    { id: 'FIIs', label: 'FIIs', short: 'FIIs' },
    { id: 'ETFs', label: 'ETFs', short: 'ETFs' },
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

  // Agrupar por ticker: soma de quantidade + preço médio ponderado.
  grouped = signal<boolean>(this.readGrouped());

  toggleGrouped(): void {
    this.grouped.update((v) => !v);
    try {
      localStorage.setItem(GROUPED_KEY, this.grouped() ? '1' : '0');
    } catch {
      /* ignore */
    }
  }
  private readGrouped(): boolean {
    try {
      return localStorage.getItem(GROUPED_KEY) === '1';
    } catch {
      return false;
    }
  }

  private groupRows(rows: Transaction[]): GroupedRow[] {
    const map = new Map<string, { quantity: number; cost: number; count: number }>();
    for (const t of rows) {
      const key = t.ticker.toUpperCase();
      const g = map.get(key) ?? { quantity: 0, cost: 0, count: 0 };
      g.quantity += t.quantity;
      g.cost += t.quantity * t.price;
      g.count += 1;
      map.set(key, g);
    }
    return [...map.entries()]
      .map(([ticker, g]) => ({
        ticker,
        quantity: g.quantity,
        total: g.cost,
        avgPrice: g.quantity > 0 ? g.cost / g.quantity : 0,
        count: g.count,
      }))
      .sort((a, b) => a.ticker.localeCompare(b.ticker, 'pt-BR'));
  }

  groupedData = computed(() => {
    const all = this.svc.transactions();
    return {
      Acoes: this.groupRows(all.filter((t) => t.assetType === 'Acoes')),
      FIIs: this.groupRows(all.filter((t) => t.assetType === 'FIIs')),
      ETFs: this.groupRows(all.filter((t) => t.assetType === 'ETFs')),
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

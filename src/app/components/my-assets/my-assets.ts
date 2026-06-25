import { Component, Input, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { StockDataService } from '../../services/stock-data.service';
import { ConfirmService } from '../../services/confirm.service';
import { AddTransactionModalComponent } from '../add-transaction-modal/add-transaction-modal';
import { AssetType, Transaction } from '../../models/transaction.model';

type SortField = 'ticker' | 'date' | 'quantity' | 'price' | 'total';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-my-assets',
  standalone: true,
  imports: [CommonModule, AddTransactionModalComponent],
  templateUrl: './my-assets.html',
  styleUrls: ['./my-assets.scss'],
})
export class MyAssetsComponent {
  // Espelha o olho de "ocultar valores" do dashboard: quando ligado, mascara
  // os totais monetários desta tela (total do cabeçalho e totais por seção).
  @Input() hideValues = false;

  showModal = false;
  editing = signal<Transaction | null>(null);
  presetType = signal<AssetType | null>(null);

  sections: { id: AssetType; label: string; short: string }[] = [
    { id: 'Acoes', label: 'Ações', short: 'Ações' },
    { id: 'FIIs', label: 'FIIs', short: 'FIIs' },
    { id: 'ETFs', label: 'ETFs', short: 'ETFs' },
  ];

  collapsed = signal<Set<AssetType>>(new Set());

  sortField = signal<SortField | null>('ticker');
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

  // ---- Paginação por seção (10 itens/página) ----
  private readonly pages = signal<Record<string, number>>({});

  private rowsCount(sec: AssetType): number {
    return (this.sectionData()[sec] ?? []).length;
  }
  totalPages(sec: AssetType): number {
    return Math.max(1, Math.ceil(this.rowsCount(sec) / PAGE_SIZE));
  }
  pageOf(sec: AssetType): number {
    return Math.min(this.pages()[sec] ?? 0, this.totalPages(sec) - 1);
  }
  showPager(sec: AssetType): boolean {
    return this.rowsCount(sec) > PAGE_SIZE;
  }
  pagedDetailed(sec: AssetType): Transaction[] {
    const start = this.pageOf(sec) * PAGE_SIZE;
    return (this.sectionData()[sec] ?? []).slice(start, start + PAGE_SIZE);
  }
  prevPage(sec: AssetType): void {
    const p = this.pageOf(sec);
    if (p > 0) this.pages.update((m) => ({ ...m, [sec]: p - 1 }));
  }
  nextPage(sec: AssetType): void {
    const p = this.pageOf(sec);
    if (p < this.totalPages(sec) - 1) this.pages.update((m) => ({ ...m, [sec]: p + 1 }));
  }

  private readonly stockData = inject(StockDataService);

  constructor(readonly svc: TransactionService) {}

  // Força a releitura dos dados na API após alterar lançamentos.
  private forceReload(): void {
    this.svc.reload();
    this.stockData.reload();
  }

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
    this.forceReload();
  }

  private readonly confirmService = inject(ConfirmService);

  remove(t: Transaction) {
    this.confirmService
      .confirm({ message: `Deseja realmente excluir o lançamento de ${t.ticker}?` })
      .then((ok) => {
        if (ok) {
          this.svc.remove(t.id);
          this.forceReload();
        }
      });
  }

  // Remove todos os lançamentos, reutilizando a mesma confirmação de exclusão.
  clearAll() {
    this.confirmService
      .confirm({
        title: 'Limpar tudo',
        message: 'Deseja realmente excluir TODOS os lançamentos? Esta ação não pode ser desfeita.',
        confirmLabel: 'Limpar tudo',
      })
      .then((ok) => {
        if (ok) {
          this.svc.clearAll(() => this.forceReload());
        }
      });
  }
}

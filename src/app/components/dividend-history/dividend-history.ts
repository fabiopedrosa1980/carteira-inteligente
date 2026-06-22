import { Component, Input, OnChanges, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendApiService, ApiDividend, ApiAcaoItem } from '../../services/backend-api.service';

const PAGE_SIZE = 10;

type SortField = 'type' | 'ex_date' | 'pay_date' | 'amount';

@Component({
  selector: 'app-dividend-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dividend-history.html',
  styleUrls: ['./dividend-history.scss'],
})
export class DividendHistoryComponent implements OnChanges {
  @Input() assetType: 'Acoes' | 'FIIs' = 'Acoes';

  private readonly api = inject(BackendApiService);

  readonly positions = signal<ApiAcaoItem[]>([]);
  readonly loadingPositions = signal(true);

  readonly selectedStockId = signal<number | null>(null);
  readonly dividends = signal<ApiDividend[]>([]);
  readonly loading = signal(false);
  readonly error = signal(false);
  readonly page = signal(0);
  // Linhas do skeleton da tabela.
  readonly skelRows = Array.from({ length: 6 });

  // Ordenação por coluna. Padrão: Data de Pagamento, mais recente primeiro.
  readonly sortField = signal<SortField>('pay_date');
  readonly sortAsc = signal(false);
  // Padrão: ano corrente (null = todos os anos).
  readonly selectedYear = signal<number | null>(new Date().getFullYear());

  readonly availableYears = computed(() => {
    const currentYear = new Date().getFullYear();
    // Ordem decrescente: ano mais recente primeiro
    return Array.from({ length: 5 }, (_, i) => currentYear - i);
  });

  // Somente posições com stock_id válido aparecem no combo
  readonly visiblePositions = computed(() => this.positions().filter((p) => p.stock_id > 0));

  readonly anyProcessing = computed(() => this.visiblePositions().some((p) => !p.history_ready));

  readonly filteredDividends = computed(() => {
    const year = this.selectedYear();
    if (year === null) return this.dividends();
    return this.dividends().filter((d) => {
      const y = d.year ?? new Date(d.pay_date).getFullYear();
      return y === year;
    });
  });

  // Aplica a ordenação por coluna sobre os dividendos filtrados pelo ano.
  readonly sortedDividends = computed(() => {
    const field = this.sortField();
    const dir = this.sortAsc() ? 1 : -1;
    const rows = [...this.filteredDividends()];
    return rows.sort((a, b) => {
      let cmp: number;
      if (field === 'amount') {
        cmp = (a.amount ?? 0) - (b.amount ?? 0);
      } else if (field === 'type') {
        cmp = this.typeLabel(a.type).localeCompare(this.typeLabel(b.type));
      } else {
        // ex_date / pay_date: strings ISO ordenam corretamente; vazios ao fim.
        const av = a[field] ?? '';
        const bv = b[field] ?? '';
        if (!av && !bv) cmp = 0;
        else if (!av) return 1;
        else if (!bv) return -1;
        else cmp = av.localeCompare(bv);
      }
      return cmp * dir;
    });
  });

  readonly totalPages = computed(() => Math.ceil(this.sortedDividends().length / PAGE_SIZE));
  readonly pageItems = computed(() =>
    this.sortedDividends().slice(this.page() * PAGE_SIZE, (this.page() + 1) * PAGE_SIZE),
  );
  readonly showPagination = computed(() => this.sortedDividends().length > PAGE_SIZE);

  ngOnChanges(): void {
    this.load();
  }

  private load(): void {
    // Carrega apenas a classe selecionada (Ações ou FIIs).
    this.loadingPositions.set(true);
    this.error.set(false);
    this.positions.set([]);
    this.dividends.set([]);
    this.selectedStockId.set(null);

    const source = this.assetType === 'FIIs' ? this.api.getFiis() : this.api.getAcoes();
    source.subscribe({
      next: (items) => {
        this.positions.set(items);
        this.loadingPositions.set(false);
        const first = items.find((p) => p.stock_id > 0);
        if (first) this.selectStock(first.stock_id);
      },
      error: () => {
        this.loadingPositions.set(false);
        this.error.set(true);
      },
    });
  }

  selectStock(stockId: number): void {
    this.selectedStockId.set(stockId);
    this.page.set(0);
    this.loading.set(true);
    this.error.set(false);
    this.api.getStockDividends(stockId).subscribe({
      next: (items) => {
        // A ordenação é aplicada por `sortedDividends` (padrão: pay_date desc).
        this.dividends.set([...items]);
        this.loading.set(false);
      },
      error: () => {
        this.dividends.set([]);
        this.loading.set(false);
        this.error.set(true);
      },
    });
  }

  selectYear(year: number | null): void {
    this.selectedYear.set(year);
    this.page.set(0);
  }

  // Ordena por coluna: alterna a direção se já ativa; senão, define a coluna com
  // um padrão sensato (datas/valor desc, tipo asc) e volta para a 1ª página.
  setSort(field: SortField): void {
    if (this.sortField() === field) {
      this.sortAsc.update((v) => !v);
    } else {
      this.sortField.set(field);
      this.sortAsc.set(field === 'type');
    }
    this.page.set(0);
  }

  prevPage(): void {
    if (this.page() > 0) this.page.update((p) => p - 1);
  }

  nextPage(): void {
    if (this.page() < this.totalPages() - 1) this.page.update((p) => p + 1);
  }

  typeLabel(type: string): string {
    if (!type) return 'Dividendo';
    return type.toLowerCase() === 'jcp' ? 'JCP' : 'Dividendo';
  }
}

import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { BackendApiService, ApiDividend, ApiAcaoItem } from '../../services/backend-api.service';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-dividend-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dividend-history.html',
  styleUrls: ['./dividend-history.scss'],
})
export class DividendHistoryComponent implements OnInit {
  private readonly api = inject(BackendApiService);

  readonly positions = signal<ApiAcaoItem[]>([]);
  readonly loadingPositions = signal(true);

  readonly selectedStockId = signal<number | null>(null);
  readonly dividends = signal<ApiDividend[]>([]);
  readonly loading = signal(false);
  readonly error = signal(false);
  readonly page = signal(0);
  // null = todos os anos (padrão)
  readonly selectedYear = signal<number | null>(null);

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

  readonly totalPages = computed(() => Math.ceil(this.filteredDividends().length / PAGE_SIZE));
  readonly pageItems = computed(() =>
    this.filteredDividends().slice(this.page() * PAGE_SIZE, (this.page() + 1) * PAGE_SIZE),
  );
  readonly showPagination = computed(() => this.filteredDividends().length > PAGE_SIZE);

  ngOnInit(): void {
    // Inclui ações e FIIs no histórico de proventos.
    forkJoin([this.api.getAcoes(), this.api.getFiis()]).subscribe({
      next: ([acoes, fiis]) => {
        const items = [...acoes, ...fiis];
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
        this.dividends.set(
          [...items].sort((a, b) => (b.pay_date ?? '').localeCompare(a.pay_date ?? '')),
        );
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

  typeClass(type: string): string {
    return (type ?? '').toLowerCase() === 'jcp' ? 'badge-jcp' : 'badge-dividendo';
  }
}

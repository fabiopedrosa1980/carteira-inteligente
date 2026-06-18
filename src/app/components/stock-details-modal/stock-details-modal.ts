import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendApiService, ApiDividend } from '../../services/backend-api.service';
import { Stock } from '../../models/stock.model';

@Component({
  selector: 'app-stock-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-details-modal.html',
  styleUrls: ['./stock-details-modal.scss'],
})
export class StockDetailsModalComponent implements OnInit {
  @Input({ required: true }) stock!: Stock;
  @Output() close = new EventEmitter<void>();

  private readonly api = inject(BackendApiService);

  readonly dividends = signal<ApiDividend[]>([]);
  readonly loadingDividends = signal(false);

  ngOnInit(): void {
    if (this.stock.stockId && this.stock.stockId > 0) {
      this.loadingDividends.set(true);
      this.api.getStockDividends(this.stock.stockId).subscribe((list) => {
        // Mais recentes primeiro.
        const sorted = [...list].sort((a, b) => b.year - a.year || b.month - a.month);
        this.dividends.set(sorted);
        this.loadingDividends.set(false);
      });
    }
  }

  get hasIndicators(): boolean {
    const i = this.stock.indicators;
    return !!i && Object.values(i).some((v) => v !== undefined && v !== null);
  }

  typeLabel(type: string): string {
    const t = (type ?? '').toLowerCase();
    if (t === 'jcp') return 'JCP';
    if (t === 'rendimento') return 'Rendimento';
    return 'Dividendo';
  }

  onOverlayClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('overlay')) this.close.emit();
  }
}

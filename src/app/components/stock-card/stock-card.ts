import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stock } from '../../models/stock.model';

@Component({
  selector: 'app-stock-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-card.html',
  styleUrls: ['./stock-card.scss'],
})
export class StockCardComponent {
  @Input() stock!: Stock;

  get yieldClass(): string {
    if (this.stock.dividendYield >= 9) return 'yield-high';
    if (this.stock.dividendYield >= 6) return 'yield-mid';
    return 'yield-low';
  }

  get displayName(): string {
    const name = this.stock.name !== this.stock.ticker ? this.stock.name : '—';
    return name.length > 40 ? name.slice(0, 40) + '…' : name;
  }

  get notaClass(): string {
    if (this.stock.nota >= 8) return 'nota-high';
    if (this.stock.nota >= 5) return 'nota-mid';
    return 'nota-low';
  }
}

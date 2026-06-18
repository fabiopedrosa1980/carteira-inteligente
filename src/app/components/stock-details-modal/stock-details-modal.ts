import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stock } from '../../models/stock.model';

@Component({
  selector: 'app-stock-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-details-modal.html',
  styleUrls: ['./stock-details-modal.scss'],
})
export class StockDetailsModalComponent {
  @Input({ required: true }) stock!: Stock;
  @Output() close = new EventEmitter<void>();

  get hasIndicators(): boolean {
    return !!this.stock.indicators && this.stock.indicators.length > 0;
  }
}

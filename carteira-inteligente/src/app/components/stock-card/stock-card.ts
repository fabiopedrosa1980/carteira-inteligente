import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stock } from '../../models/stock.model';

@Component({
  selector: 'app-stock-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stock-card">
      <div class="card-header">
        <div class="ticker-badge" [class]="'sector-' + sectorClass">{{ stock.ticker }}</div>
        <div class="yield-badge" [class]="yieldClass">
          {{ stock.dividendYield > 0 ? (stock.dividendYield | number:'1.1-1') + '% a.a.' : '—' }}
        </div>
      </div>
      <div class="stock-name">{{ stock.name !== stock.ticker ? stock.name : '—' }}</div>
      <div class="stock-sector">{{ stock.sector }}</div>
      <div class="card-footer">
        <div class="price">
          <span class="label">Preço</span>
          <span class="value" *ngIf="stock.price > 0">R$ {{ stock.price | number:'1.2-2' }}</span>
          <span class="value loading" *ngIf="stock.price === 0">—</span>
        </div>
        <div class="change" *ngIf="stock.price > 0">
          <span class="label">Hoje</span>
          <span class="value" [class.pos]="stock.changePercent >= 0" [class.neg]="stock.changePercent < 0">
            {{ stock.changePercent >= 0 ? '+' : '' }}{{ stock.changePercent | number:'1.2-2' }}%
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stock-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px;
      cursor: pointer;
      transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
      &:hover {
        transform: translateY(-2px);
        border-color: var(--accent);
        box-shadow: 0 4px 20px rgba(99,179,237,0.15);
      }
    }
    .card-header {
      display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;
    }
    .ticker-badge {
      font-size: 15px; font-weight: 700; letter-spacing: 0.5px; padding: 4px 10px; border-radius: 6px;
      &.sector-bancario { background: rgba(99,179,237,0.15); color: #63b3ed; }
      &.sector-seguros { background: rgba(154,230,180,0.15); color: #9ae6b4; }
      &.sector-petroleo { background: rgba(252,129,74,0.15); color: #fc814a; }
      &.sector-mineracao { background: rgba(246,173,85,0.15); color: #f6ad55; }
      &.sector-energia { background: rgba(183,148,246,0.15); color: #b794f6; }
      &.sector-saneamento { background: rgba(129,230,217,0.15); color: #81e6d9; }
    }
    .yield-badge {
      font-size: 12px; font-weight: 600; padding: 3px 8px; border-radius: 20px;
      &.yield-high { background: rgba(154,230,180,0.2); color: #68d391; }
      &.yield-mid { background: rgba(246,173,85,0.2); color: #f6ad55; }
      &.yield-low { background: rgba(160,174,192,0.2); color: #a0aec0; }
    }
    .stock-name { font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .stock-sector { font-size: 12px; color: var(--text-secondary); margin-bottom: 14px; }
    .card-footer { display: flex; justify-content: space-between; gap: 8px; }
    .price, .change { display: flex; flex-direction: column; gap: 2px; }
    .label { font-size: 11px; color: var(--text-secondary); }
    .value { font-size: 13px; font-weight: 600; color: var(--text-primary); }
    .value.loading { color: var(--text-secondary); }
    .value.pos { color: #68d391; }
    .value.neg { color: #fc8181; }
  `]
})
export class StockCardComponent {
  @Input() stock!: Stock;

  get sectorClass(): string {
    const map: Record<string, string> = {
      'Bancário': 'bancario', 'Seguros': 'seguros', 'Petróleo & Gás': 'petroleo',
      'Mineração': 'mineracao', 'Energia Elétrica': 'energia', 'Saneamento': 'saneamento',
    };
    return map[this.stock.sector] ?? 'bancario';
  }

  get yieldClass(): string {
    if (this.stock.dividendYield >= 9) return 'yield-high';
    if (this.stock.dividendYield >= 6) return 'yield-mid';
    return 'yield-low';
  }
}

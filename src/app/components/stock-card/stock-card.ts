import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stock } from '../../models/stock.model';
import { saldo, variacaoPosicao, rentabilidade } from '../../models/position.util';

@Component({
  selector: 'app-stock-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './stock-card.html',
  styleUrls: ['./stock-card.scss'],
})
export class StockCardComponent {
  @Input() stock!: Stock;
  @Output() select = new EventEmitter<Stock>();

  get displayName(): string {
    const name = this.stock.name !== this.stock.ticker ? this.stock.name : '—';
    return name.length > 30 ? name.slice(0, 30) + '…' : name;
  }

  // Posição: saldo, variação (R$) e rentabilidade (%) — null quando não há dados.
  get saldo(): number | null {
    return saldo(this.stock);
  }
  get variacao(): number | null {
    return variacaoPosicao(this.stock);
  }
  get rentabilidade(): number | null {
    return rentabilidade(this.stock);
  }

  abs(n: number): number {
    return Math.abs(n);
  }
}

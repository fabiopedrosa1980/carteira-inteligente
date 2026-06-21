import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stock } from '../../models/stock.model';
import { saldo, variacaoPosicao, rentabilidade } from '../../models/position.util';

@Component({
  selector: 'app-stock-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-card.html',
  styleUrls: ['./stock-card.scss'],
})
export class StockCardComponent {
  @Input() stock!: Stock;
  @Output() select = new EventEmitter<Stock>();

  get yieldClass(): string {
    if (this.stock.dividendYield >= 9) return 'yield-high';
    if (this.stock.dividendYield >= 6) return 'yield-mid';
    return 'yield-low';
  }

  get displayName(): string {
    const name = this.stock.name !== this.stock.ticker ? this.stock.name : '—';
    return name.length > 30 ? name.slice(0, 30) + '…' : name;
  }

  get notaClass(): string {
    // Faixas de cor da Nota: < 5 vermelho, 5 a 7 amarelo, > 7 verde.
    if (this.stock.nota > 7) return 'nota-high';
    if (this.stock.nota >= 5) return 'nota-mid';
    return 'nota-low';
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

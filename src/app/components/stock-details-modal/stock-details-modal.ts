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

  get hasCompanyInfo(): boolean {
    return !!this.stock.companyInfo && this.stock.companyInfo.length > 0;
  }

  // Arredonda valores numéricos (formato BR, com sufixo opcional como "%") para
  // no máximo 2 casas decimais. Valores não numéricos são devolvidos intactos.
  formatValue(value: string): string {
    const raw = (value ?? '').trim();
    const match = raw.match(
      /^(-?\d{1,3}(?:\.\d{3})*(?:,\d+)?|-?\d+(?:,\d+)?)(\s*%|\s*[a-zA-Z]+)?$/,
    );
    if (!match) return raw;

    const num = parseFloat(match[1].replace(/\./g, '').replace(',', '.'));
    if (!isFinite(num)) return raw;

    const suffix = (match[2] ?? '').trim();
    // toLocaleString pt-BR com até 2 casas (sem zeros à direita desnecessários).
    const formatted = num.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
    return suffix ? `${formatted}${suffix === '%' ? '' : ' '}${suffix}` : formatted;
  }
}

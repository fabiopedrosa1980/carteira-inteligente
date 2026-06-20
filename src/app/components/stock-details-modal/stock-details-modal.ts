import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
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

  // Fecha o detalhe ao pressionar Esc.
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close.emit();
  }

  // Descrição dos indicadores mais comuns (chave normalizada → texto do tooltip).
  private static readonly DESCRIPTIONS: Record<string, string> = {
    pl: 'Preço/Lucro — quantos anos de lucro atual para reaver o preço pago pela ação.',
    pvp: 'Preço/Valor Patrimonial — relação entre o preço e o valor contábil por ação.',
    dy: 'Dividend Yield — proventos dos últimos 12 meses sobre o preço atual.',
    dividendyield: 'Dividend Yield — proventos dos últimos 12 meses sobre o preço atual.',
    roe: 'ROE — retorno sobre o patrimônio líquido (lucro ÷ patrimônio).',
    roic: 'ROIC — retorno sobre o capital investido na operação.',
    margemliquida: 'Margem líquida — lucro líquido como percentual da receita.',
    margembruta: 'Margem bruta — lucro bruto como percentual da receita.',
    margemebit: 'Margem EBIT — resultado operacional como percentual da receita.',
    'dividaliquida/ebitda': 'Dívida líquida/EBITDA — endividamento sobre a geração de caixa.',
    dividaliquidaebitda: 'Dívida líquida/EBITDA — endividamento sobre a geração de caixa.',
    'ev/ebitda': 'EV/EBITDA — valor da firma sobre a geração de caixa operacional.',
    evebitda: 'EV/EBITDA — valor da firma sobre a geração de caixa operacional.',
    lpa: 'LPA — lucro por ação.',
    vpa: 'VPA — valor patrimonial por ação.',
    payout: 'Payout — percentual do lucro distribuído como proventos.',
    liquidezcorrente: 'Liquidez corrente — capacidade de pagar obrigações de curto prazo.',
  };

  get hasIndicators(): boolean {
    return !!this.stock.indicators && this.stock.indicators.length > 0;
  }

  // Normaliza o rótulo (minúsculas, sem acentos/espaços/pontos) para comparação.
  private normLabel(label: string): string {
    return (label ?? '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\s.]/g, '');
  }

  // Descrição do indicador (tooltip), ou vazio quando não há descrição conhecida.
  describe(label: string): string {
    return StockDetailsModalComponent.DESCRIPTIONS[this.normLabel(label)] ?? '';
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

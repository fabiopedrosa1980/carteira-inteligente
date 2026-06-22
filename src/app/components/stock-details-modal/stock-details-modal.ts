import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stock } from '../../models/stock.model';
import { PrecoTetoResult, Zona } from '../../models/preco-teto.util';

@Component({
  selector: 'app-stock-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-details-modal.html',
  styleUrls: ['./stock-details-modal.scss'],
})
export class StockDetailsModalComponent {
  @Input({ required: true }) stock!: Stock;
  @Input() precoTeto?: PrecoTetoResult;
  @Output() close = new EventEmitter<void>();

  // ---- Seção de Preço-teto ----
  // Mostra a seção sempre que o cálculo está disponível (inclui "sem dados"/n/a,
  // para deixar explícito por que não há veredito).
  get hasTeto(): boolean {
    return !!this.precoTeto;
  }
  get isFii(): boolean {
    return this.stock.sector === 'FII';
  }

  private static readonly ZONA_LABEL: Record<Zona, string> = {
    compra: '🟢 Zona de compra',
    justo: '🟡 Preço justo / perto',
    caro: '🔴 Caro',
    'sem-dados': '⚪ Sem dados',
    na: 'n/a (ETF)',
  };
  zonaLabel(z: Zona): string {
    return StockDetailsModalComponent.ZONA_LABEL[z];
  }

  pvpLabel(sinal: 'barato' | 'caro' | 'neutro' | null): string {
    if (sinal === 'barato') return 'abaixo do valor patrimonial (barato)';
    if (sinal === 'caro') return 'acima do valor patrimonial (caro)';
    if (sinal === 'neutro') return 'no valor patrimonial';
    return '';
  }

  // Desconto/ágio vs teto formatado (ex.: "−18%" / "+10%").
  descontoLabel(pct: number | null): string {
    if (pct === null) return '—';
    const v = Math.round(pct * 100);
    return (v >= 0 ? '+' : '−') + Math.abs(v) + '%';
  }

  // Fecha o detalhe ao pressionar Esc.
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close.emit();
  }

  // Descrição dos indicadores fundamentalistas (chave normalizada → tooltip).
  // O normalizador remove espaços/pontos/acentos mas mantém a barra "/", por isso
  // os índices de razão têm variante com e sem barra para casar com qualquer rótulo.
  private static readonly DESCRIPTIONS: Record<string, string> = {
    // Múltiplos de preço
    pl: 'Preço/Lucro — quantos anos de lucro atual para reaver o preço pago pela ação.',
    'p/l': 'Preço/Lucro — quantos anos de lucro atual para reaver o preço pago pela ação.',
    pvp: 'Preço/Valor Patrimonial — relação entre o preço e o valor contábil por ação.',
    'p/vp': 'Preço/Valor Patrimonial — relação entre o preço e o valor contábil por ação.',
    pebit: 'Preço/EBIT — preço da ação sobre o resultado operacional por ação.',
    'p/ebit': 'Preço/EBIT — preço da ação sobre o resultado operacional por ação.',
    pativo: 'Preço/Ativo — valor de mercado sobre o total de ativos.',
    'p/ativo': 'Preço/Ativo — valor de mercado sobre o total de ativos.',
    psr: 'PSR (Preço/Receita) — valor de mercado sobre a receita líquida.',
    'p/sr': 'PSR (Preço/Receita) — valor de mercado sobre a receita líquida.',
    pcapitaldegiro: 'Preço/Capital de Giro — preço sobre o capital de giro da empresa.',
    'p/capitaldegiro': 'Preço/Capital de Giro — preço sobre o capital de giro da empresa.',
    pativocirculanteliquido:
      'Preço/Ativo Circulante Líquido — preço sobre o ativo circulante menos passivos.',
    'p/ativocirculanteliquido':
      'Preço/Ativo Circulante Líquido — preço sobre o ativo circulante menos passivos.',
    // Enterprise value
    'ev/ebitda': 'EV/EBITDA — valor da firma sobre a geração de caixa operacional.',
    evebitda: 'EV/EBITDA — valor da firma sobre a geração de caixa operacional.',
    'ev/ebit': 'EV/EBIT — valor da firma sobre o resultado operacional.',
    evebit: 'EV/EBIT — valor da firma sobre o resultado operacional.',
    // Proventos
    dy: 'Dividend Yield — proventos dos últimos 12 meses sobre o preço atual.',
    dividendyield: 'Dividend Yield — proventos dos últimos 12 meses sobre o preço atual.',
    payout: 'Payout — percentual do lucro distribuído como proventos.',
    // Rentabilidade
    roe: 'ROE — retorno sobre o patrimônio líquido (lucro ÷ patrimônio).',
    roa: 'ROA — retorno sobre os ativos (lucro ÷ ativos totais).',
    roic: 'ROIC — retorno sobre o capital investido na operação.',
    giroativos: 'Giro de Ativos — receita gerada para cada R$ de ativos.',
    // Margens
    margembruta: 'Margem bruta — lucro bruto como percentual da receita.',
    margemebit: 'Margem EBIT — resultado operacional como percentual da receita.',
    margemebitda: 'Margem EBITDA — geração de caixa operacional como percentual da receita.',
    margemliquida: 'Margem líquida — lucro líquido como percentual da receita.',
    // Endividamento
    'dividaliquida/ebitda': 'Dívida líquida/EBITDA — endividamento sobre a geração de caixa.',
    dividaliquidaebitda: 'Dívida líquida/EBITDA — endividamento sobre a geração de caixa.',
    'dividaliquida/ebit': 'Dívida líquida/EBIT — endividamento sobre o resultado operacional.',
    dividaliquidaebit: 'Dívida líquida/EBIT — endividamento sobre o resultado operacional.',
    'dividaliquida/patrimonio':
      'Dívida líquida/Patrimônio — endividamento sobre o patrimônio líquido.',
    dividaliquidapatrimonio:
      'Dívida líquida/Patrimônio — endividamento sobre o patrimônio líquido.',
    'patrimonio/ativos': 'Patrimônio/Ativos — quanto do ativo é financiado por capital próprio.',
    patrimonioativos: 'Patrimônio/Ativos — quanto do ativo é financiado por capital próprio.',
    'passivos/ativos': 'Passivos/Ativos — quanto do ativo é financiado por terceiros.',
    passivosativos: 'Passivos/Ativos — quanto do ativo é financiado por terceiros.',
    liquidezcorrente: 'Liquidez corrente — capacidade de pagar obrigações de curto prazo.',
    // Por ação
    lpa: 'LPA — lucro por ação.',
    vpa: 'VPA — valor patrimonial por ação.',
    // Crescimento
    cagrreceitas5anos: 'CAGR Receitas (5 anos) — crescimento anual composto da receita.',
    cagrreceitas: 'CAGR Receitas — crescimento anual composto da receita.',
    cagrlucros5anos: 'CAGR Lucros (5 anos) — crescimento anual composto do lucro.',
    cagrlucros: 'CAGR Lucros — crescimento anual composto do lucro.',
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

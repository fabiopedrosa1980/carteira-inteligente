import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stock } from '../../models/stock.model';
import { StockDataService } from '../../services/stock-data.service';
import { TransactionService } from '../../services/transaction.service';
import { saldo, custo } from '../../models/position.util';
import {
  receivedForTicker,
  projectedForTicker,
  localDateStr,
} from '../../models/dividends-received.util';

/**
 * Cards de resumo da carteira (patrimônio, investido, ganho, variação e
 * dividendos recebidos/a receber). Extraído do dashboard para reduzir o
 * componente-mãe; recebe as posições via input e deriva os agregados aqui.
 */
@Component({
  selector: 'app-portfolio-summary',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './portfolio-summary.html',
  styleUrls: ['./portfolio-summary.scss'],
})
export class PortfolioSummaryComponent {
  private readonly svc = inject(StockDataService);
  private readonly transactionSvc = inject(TransactionService);

  // Posições da carteira (vindas do dashboard).
  private readonly _stocks = signal<Stock[]>([]);
  @Input() set stocks(value: Stock[]) {
    this._stocks.set(value ?? []);
  }

  // Oculta os valores em R$ (acompanha o botão olho do header).
  @Input() hideValues = false;

  // Deep-link para a tela de Dividendos (Recebidos/Projetados).
  @Output() openDividends = new EventEmitter<'recebidos' | 'projetados'>();

  readonly patrimonioTotal = computed(() =>
    this._stocks().reduce((sum, s) => sum + (saldo(s) ?? 0), 0),
  );
  readonly valorInvestido = computed(() =>
    this._stocks().reduce((sum, s) => sum + (custo(s) ?? 0), 0),
  );
  readonly lucroTotal = computed(() => this.patrimonioTotal() - this.valorInvestido());
  readonly lucroPercent = computed(() => {
    const inv = this.valorInvestido();
    return inv > 0 ? (this.lucroTotal() / inv) * 100 : null;
  });

  // Dividendos Recebidos: mesma lógica/util da tela Dividendos → Recebidos
  // (receivedForTicker). Escopo = Ações + FIIs. Proventos vêm de svc.stocks();
  // as cotas elegíveis vêm dos lançamentos; a classe vem das posições.
  readonly dividendosRecebidos = computed(() => {
    const transactions = this.transactionSvc.transactions();
    const todayStr = localDateStr();
    const currentYear = new Date().getFullYear();
    const norm = (t: string) => (t ?? '').toUpperCase().trim();

    const allowed = new Set(
      this._stocks()
        .filter((s) => s.sector === 'Ações' || s.sector === 'FII')
        .map((s) => norm(s.ticker)),
    );

    return this.svc.stocks().reduce((total, stk) => {
      const ticker = norm(stk.ticker);
      if (!allowed.has(ticker)) return total;

      const txOfTicker = transactions.filter((t) => norm(t.ticker) === ticker);
      const dividends = stk.dividends.map((d) => ({
        year: d.year,
        month: d.month,
        amount: d.value,
        exDate: d.exDate,
        payDate: d.payDate,
      }));

      return total + receivedForTicker(dividends, txOfTicker, todayStr, currentYear);
    }, 0);
  });

  // Dividendos a receber: proventos do ano corrente ainda a pagar × cotas atuais
  // (projectedForTicker). Mesmo escopo do card de Recebidos (Ações + FIIs).
  readonly dividendosAReceber = computed(() => {
    const todayStr = localDateStr();
    const currentYear = new Date().getFullYear();
    const norm = (t: string) => (t ?? '').toUpperCase().trim();

    const sharesByTicker = new Map<string, number>();
    for (const s of this._stocks()) {
      if (s.sector !== 'Ações' && s.sector !== 'FII') continue;
      sharesByTicker.set(norm(s.ticker), s.quantity ?? 0);
    }

    return this.svc.stocks().reduce((total, stk) => {
      const ticker = norm(stk.ticker);
      const shares = sharesByTicker.get(ticker);
      if (!shares) return total;

      const dividends = stk.dividends.map((d) => ({
        year: d.year,
        month: d.month,
        amount: d.value,
        exDate: d.exDate,
        payDate: d.payDate,
      }));

      return total + projectedForTicker(dividends, shares, todayStr, currentYear);
    }, 0);
  });
}

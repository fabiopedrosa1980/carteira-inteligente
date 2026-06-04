import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockDataService } from '../../services/stock-data.service';

interface BuyMonth {
  rank: number;
  month: number;
  monthName: string;
  score: number;
  stockCount: number;
  nextMonthName: string;
}

@Component({
  selector: 'app-best-month',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="best-month-section">
      <h2 class="section-title">
        <span class="icon">🎯</span>
        Melhor Mês para Comprar Ações
      </h2>
      <p class="section-subtitle">
        Baseado no histórico de dividendos: compre antes do mês de maior pagamento para garantir os proventos.
      </p>

      <div class="podium">
        <div *ngFor="let item of top3; let i = index" class="podium-card" [class]="'rank-' + (i+1)">
          <div class="rank-badge">#{{ i + 1 }}</div>
          <div class="medal">{{ medals[i] }}</div>
          <div class="month-name">{{ item.monthName }}</div>
          <div class="reason">
            {{ item.stockCount }} ações pagam em {{ item.nextMonthName }}
          </div>
          <div class="score-bar">
            <div class="bar-fill" [style.width.%]="(item.score / maxScore) * 100"></div>
          </div>
          <div class="score">Score: {{ item.score | number:'1.2-2' }}</div>
        </div>
      </div>

      <div class="ranking-table">
        <h3 class="table-title">Ranking Completo</h3>
        <div class="table-header">
          <span>#</span>
          <span>Mês para Comprar</span>
          <span>Dividendos em</span>
          <span>Ações</span>
          <span>Score</span>
        </div>
        <div *ngFor="let item of allMonths; let i = index"
             class="table-row"
             [class.highlight]="i < 3">
          <span class="rank">{{ i + 1 }}</span>
          <span class="buy-month">{{ item.monthName }}</span>
          <span class="div-month">{{ item.nextMonthName }}</span>
          <span class="stock-count">{{ item.stockCount }}</span>
          <span class="score-val">
            <div class="mini-bar">
              <div class="mini-fill" [style.width.%]="(item.score / maxScore) * 100"
                   [class]="i < 3 ? 'top' : ''"></div>
            </div>
            {{ item.score | number:'1.1-1' }}
          </span>
        </div>
      </div>

      <div class="per-stock-section">
        <h3 class="table-title">Melhores Meses por Ação</h3>
        <div class="stock-analysis-grid">
          <div *ngFor="let a of analysis" class="stock-analysis-card">
            <div class="sa-ticker">{{ a.ticker }}</div>
            <div class="sa-months">
              <div *ngFor="let m of a.bestMonths; let i = index" class="sa-month-row">
                <span class="sa-rank">{{ i + 1 }}º</span>
                <span class="sa-month">{{ m.monthName }}</span>
                <span class="sa-value">R$ {{ m.avgDividend | number:'1.4-4' }}</span>
                <div class="sa-bar">
                  <div class="sa-fill" [style.width.%]="(m.avgDividend / a.bestMonths[0].avgDividend) * 100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .best-month-section { margin-bottom: 40px; }
    .section-title {
      font-size: 20px; font-weight: 700; color: var(--text-primary);
      margin-bottom: 6px; display: flex; align-items: center; gap: 8px;
    }
    .section-subtitle { font-size: 13px; color: var(--text-secondary); margin-bottom: 24px; max-width: 600px; }

    .podium {
      display: flex; gap: 16px; margin-bottom: 32px; flex-wrap: wrap;
    }
    .podium-card {
      flex: 1; min-width: 180px; border-radius: 12px; padding: 20px;
      border: 1px solid var(--border); text-align: center; position: relative;
      &.rank-1 { background: linear-gradient(135deg, rgba(246,173,85,0.12), rgba(246,173,85,0.04)); border-color: rgba(246,173,85,0.5); }
      &.rank-2 { background: linear-gradient(135deg, rgba(160,174,192,0.12), rgba(160,174,192,0.04)); border-color: rgba(160,174,192,0.4); }
      &.rank-3 { background: linear-gradient(135deg, rgba(252,129,74,0.12), rgba(252,129,74,0.04)); border-color: rgba(252,129,74,0.4); }
    }
    .rank-badge {
      position: absolute; top: 10px; left: 12px;
      font-size: 11px; font-weight: 700; color: var(--text-secondary);
    }
    .medal { font-size: 28px; margin-bottom: 8px; }
    .month-name { font-size: 22px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
    .reason { font-size: 12px; color: var(--text-secondary); margin-bottom: 14px; }
    .score-bar { height: 4px; background: var(--border); border-radius: 2px; margin-bottom: 6px; }
    .bar-fill { height: 100%; border-radius: 2px; background: var(--accent); }
    .score { font-size: 11px; color: var(--text-secondary); }

    .ranking-table { background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin-bottom: 32px; }
    .table-title { font-size: 14px; font-weight: 700; color: var(--text-primary); padding: 16px 20px 0; margin-bottom: 12px; }
    .table-header {
      display: grid; grid-template-columns: 40px 1fr 1fr 80px 140px;
      padding: 8px 20px; background: rgba(99,179,237,0.05);
      font-size: 11px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;
    }
    .table-row {
      display: grid; grid-template-columns: 40px 1fr 1fr 80px 140px;
      padding: 10px 20px; border-top: 1px solid var(--border);
      font-size: 13px; color: var(--text-primary); align-items: center;
      &.highlight { background: rgba(99,179,237,0.04); }
      &:hover { background: rgba(99,179,237,0.06); }
    }
    .rank { font-weight: 700; color: var(--text-secondary); }
    .buy-month { font-weight: 600; }
    .div-month { color: var(--accent); }
    .stock-count { font-weight: 600; color: #9ae6b4; }
    .score-val { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-secondary); }
    .mini-bar { width: 60px; height: 4px; background: var(--border); border-radius: 2px; flex-shrink: 0; }
    .mini-fill { height: 100%; border-radius: 2px; background: rgba(99,179,237,0.4); &.top { background: var(--accent); } }

    .per-stock-section { }
    .stock-analysis-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 12px;
    }
    .stock-analysis-card {
      background: var(--card-bg); border: 1px solid var(--border); border-radius: 10px; padding: 14px;
    }
    .sa-ticker { font-size: 15px; font-weight: 700; color: var(--accent); margin-bottom: 12px; }
    .sa-months { display: flex; flex-direction: column; gap: 8px; }
    .sa-month-row { display: grid; grid-template-columns: 20px 40px 70px 1fr; align-items: center; gap: 8px; }
    .sa-rank { font-size: 11px; color: var(--text-secondary); font-weight: 600; }
    .sa-month { font-size: 12px; font-weight: 600; color: var(--text-primary); }
    .sa-value { font-size: 11px; color: #9ae6b4; text-align: right; }
    .sa-bar { height: 3px; background: var(--border); border-radius: 2px; }
    .sa-fill { height: 100%; border-radius: 2px; background: rgba(154,230,180,0.5); }
  `]
})
export class BestMonthComponent {
  allMonths: BuyMonth[] = [];
  top3: BuyMonth[] = [];
  analysis: any[] = [];
  medals = ['🥇', '🥈', '🥉'];
  maxScore = 1;

  constructor(private svc: StockDataService) {
    effect(() => {
      svc.stocks();
      const raw = this.svc.getBestMonthsToBuy();
      this.allMonths = raw.map((r, i) => ({ rank: i + 1, ...r }));
      this.top3 = this.allMonths.slice(0, 3);
      this.maxScore = this.allMonths[0]?.score ?? 1;
      this.analysis = this.svc.getBestMonthAnalysis();
    });
  }
}

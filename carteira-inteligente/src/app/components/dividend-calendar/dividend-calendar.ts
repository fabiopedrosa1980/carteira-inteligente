import { Component, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockDataService } from '../../services/stock-data.service';
import { MonthSummary } from '../../models/stock.model';

@Component({
  selector: 'app-dividend-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="calendar-section">
      <h2 class="section-title">
        <span class="icon">📅</span>
        Calendário Mensal de Dividendos
      </h2>
      <p class="section-subtitle">Histórico médio de pagamentos por mês (2021–2025)</p>

      <div class="year-selector">
        <button *ngFor="let y of years" [class.active]="y === selectedYear" (click)="selectedYear = y">{{ y }}</button>
        <button [class.active]="selectedYear === 0" (click)="selectedYear = 0">Média</button>
      </div>

      <div class="calendar-grid">
        <div *ngFor="let summary of summaries; let i = index"
             class="month-card"
             [class.has-dividends]="summary.tickers.length > 0"
             [class.top-month]="isTopMonth(summary)">
          <div class="month-header">
            <span class="month-name">{{ summary.monthName }}</span>
            <span class="month-count" *ngIf="summary.tickers.length > 0">
              {{ summary.tickers.length }} ações
            </span>
          </div>

          <div class="tickers-list" *ngIf="summary.tickers.length > 0">
            <span *ngFor="let t of summary.tickers" class="ticker-chip">{{ t }}</span>
          </div>
          <div class="no-dividends" *ngIf="summary.tickers.length === 0">Sem pagamentos</div>

          <div class="month-stats" *ngIf="summary.tickers.length > 0">
            <div class="stat">
              <span class="stat-label">Total médio</span>
              <span class="stat-value">R$ {{ summary.totalDividends | number:'1.2-2' }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Yield médio</span>
              <span class="stat-value accent">{{ summary.avgYield | number:'1.2-2' }}%</span>
            </div>
          </div>

          <div class="top-badge" *ngIf="isTopMonth(summary)">🏆 Top mês</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .calendar-section { margin-bottom: 40px; }
    .section-title {
      font-size: 20px; font-weight: 700; color: var(--text-primary);
      margin-bottom: 6px; display: flex; align-items: center; gap: 8px;
    }
    .section-subtitle { font-size: 13px; color: var(--text-secondary); margin-bottom: 20px; }
    .year-selector {
      display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap;
      button {
        padding: 6px 14px; border-radius: 20px; border: 1px solid var(--border);
        background: var(--card-bg); color: var(--text-secondary);
        cursor: pointer; font-size: 13px; transition: all 0.2s;
        &:hover { border-color: var(--accent); color: var(--accent); }
        &.active { background: var(--accent); color: #0d1117; border-color: var(--accent); font-weight: 600; }
      }
    }
    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 12px;
    }
    .month-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 14px;
      min-height: 120px;
      position: relative;
      transition: border-color 0.2s;
      &.has-dividends { border-color: rgba(99,179,237,0.25); }
      &.top-month { border-color: rgba(246,173,85,0.5); background: rgba(246,173,85,0.04); }
    }
    .month-header {
      display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;
    }
    .month-name { font-size: 14px; font-weight: 700; color: var(--text-primary); }
    .month-count { font-size: 11px; background: rgba(99,179,237,0.15); color: #63b3ed; padding: 2px 7px; border-radius: 10px; }
    .tickers-list { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 10px; }
    .ticker-chip {
      font-size: 10px; font-weight: 600; padding: 2px 6px;
      background: rgba(99,179,237,0.1); color: #63b3ed; border-radius: 4px;
    }
    .no-dividends { font-size: 12px; color: var(--text-secondary); font-style: italic; margin-bottom: 10px; }
    .month-stats { display: flex; gap: 12px; }
    .stat { display: flex; flex-direction: column; gap: 1px; }
    .stat-label { font-size: 10px; color: var(--text-secondary); }
    .stat-value { font-size: 13px; font-weight: 600; color: var(--text-primary); &.accent { color: #68d391; } }
    .top-badge {
      position: absolute; top: 10px; right: 10px;
      font-size: 10px; background: rgba(246,173,85,0.2); color: #f6ad55;
      padding: 2px 6px; border-radius: 4px;
    }
  `]
})
export class DividendCalendarComponent {
  summaries: MonthSummary[] = [];
  years = [2021, 2022, 2023, 2024, 2025];
  selectedYear = 0;
  maxTotal = 0;

  constructor(private svc: StockDataService) {
    effect(() => {
      // re-runs whenever the stocks signal changes
      svc.stocks();
      this.summaries = this.svc.getMonthSummaries();
      this.maxTotal = this.summaries.length ? Math.max(...this.summaries.map(s => s.totalDividends)) : 0;
    });
  }

  isTopMonth(s: MonthSummary): boolean {
    return s.totalDividends > 0 && s.totalDividends === this.maxTotal;
  }
}

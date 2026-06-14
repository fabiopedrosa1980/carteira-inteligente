import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendApiService } from '../../services/backend-api.service';
import { MonthSummary } from '../../models/stock.model';

@Component({
  selector: 'app-dividend-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dividend-calendar.html',
  styleUrls: ['./dividend-calendar.scss']
})
export class DividendCalendarComponent implements OnInit {
  summaries: MonthSummary[] = [];
  readonly years: number[];
  selectedYear: number;
  bestScore = 0;

  constructor(private api: BackendApiService) {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);
    this.selectedYear = currentYear;
  }

  ngOnInit(): void {
    this.selectYear(this.selectedYear);
  }

  selectYear(year: number): void {
    this.selectedYear = year;
    this.loadCalendar(year);
  }

  private loadCalendar(year: number): void {
    this.api.getDividendsMonthly(year).subscribe(data => {
      this.summaries = data.map(m => ({
        month: m.month,
        monthName: m.month_name,
        tickers: m.tickers,
        totalDividends: m.avg_total,
        avgYield: m.avg_yield,
      }));
      this.bestScore = this.summaries.length
        ? Math.max(...this.summaries.map(s => s.tickers.length * s.avgYield))
        : 0;
    });
  }

  isTopMonth(s: MonthSummary): boolean {
    return s.tickers.length > 0 && (s.tickers.length * s.avgYield) === this.bestScore;
  }
}

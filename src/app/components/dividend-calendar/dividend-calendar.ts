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
  years = [2021, 2022, 2023, 2024, 2025];
  selectedYear = 2025;
  bestScore = 0;

  constructor(private api: BackendApiService) {}

  ngOnInit(): void {
    this.loadCalendar(this.selectedYear);
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

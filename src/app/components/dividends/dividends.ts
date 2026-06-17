import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividendHistoryComponent } from '../dividend-history/dividend-history';
import { DividendsSummaryComponent } from '../dividends-summary/dividends-summary';

type DividendsTab = 'historico' | 'recebidos' | 'projetados';

@Component({
  selector: 'app-dividends',
  standalone: true,
  imports: [CommonModule, DividendHistoryComponent, DividendsSummaryComponent],
  templateUrl: './dividends.html',
  styleUrls: ['./dividends.scss'],
})
export class DividendsComponent {
  activeTab = signal<DividendsTab>('historico');

  tabs: { id: DividendsTab; label: string; icon: string }[] = [
    { id: 'historico', label: 'Histórico', icon: '📋' },
    { id: 'recebidos', label: 'Recebidos', icon: '💰' },
    { id: 'projetados', label: 'Projetados', icon: '📈' },
  ];

  setTab(id: DividendsTab): void {
    this.activeTab.set(id);
  }
}

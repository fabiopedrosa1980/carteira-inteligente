import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividendHistoryComponent } from '../dividend-history/dividend-history';
import { DividendsSummaryComponent } from '../dividends-summary/dividends-summary';

type DividendsTab = 'historico' | 'recebidos' | 'projetados';
type AssetClass = 'Acoes' | 'FIIs';

@Component({
  selector: 'app-dividends',
  standalone: true,
  imports: [CommonModule, DividendHistoryComponent, DividendsSummaryComponent],
  templateUrl: './dividends.html',
  styleUrls: ['./dividends.scss'],
})
export class DividendsComponent {
  activeTab = signal<DividendsTab>('historico');
  assetType = signal<AssetClass>('Acoes');

  tabs: { id: DividendsTab; label: string; icon: string }[] = [
    { id: 'historico', label: 'Histórico', icon: '📋' },
    { id: 'recebidos', label: 'Recebidos', icon: '💰' },
    { id: 'projetados', label: 'Projetados', icon: '📈' },
  ];

  assetClasses: { id: AssetClass; label: string }[] = [
    { id: 'Acoes', label: 'Ações' },
    { id: 'FIIs', label: 'FIIs' },
  ];

  setTab(id: DividendsTab): void {
    this.activeTab.set(id);
  }

  setAssetType(id: AssetClass): void {
    this.assetType.set(id);
  }
}

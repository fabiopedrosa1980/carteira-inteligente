import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividendHistoryComponent } from '../dividend-history/dividend-history';
import { DividendsSummaryComponent } from '../dividends-summary/dividends-summary';
import { DividendsRadarComponent } from '../dividends-radar/dividends-radar';
import { ProximasDatasComComponent } from '../proximas-datas-com/proximas-datas-com';

type DividendsTab = 'historico' | 'recebidos' | 'projetados' | 'radar';
type AssetClass = 'Acoes' | 'FIIs';

@Component({
  selector: 'app-dividends',
  standalone: true,
  imports: [
    CommonModule,
    DividendHistoryComponent,
    DividendsSummaryComponent,
    DividendsRadarComponent,
    ProximasDatasComComponent,
  ],
  templateUrl: './dividends.html',
  styleUrls: ['./dividends.scss'],
})
export class DividendsComponent {
  activeTab = signal<DividendsTab>('historico');
  assetType = signal<AssetClass>('Acoes');

  tabs: { id: DividendsTab; label: string; iconPath: string }[] = [
    {
      id: 'historico',
      label: 'Histórico',
      iconPath:
        'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 12h6M9 16h6',
    },
    {
      id: 'recebidos',
      label: 'Recebidos',
      iconPath: 'M12 2v20M17 7a4 4 0 0 0-4-3h-2a3 3 0 0 0 0 6h2a3 3 0 0 1 0 6h-2a4 4 0 0 1-4-3',
    },
    {
      id: 'projetados',
      label: 'Projetados',
      iconPath: 'M3 17l6-6 4 4 7-8M21 7v5M21 7h-5',
    },
    {
      id: 'radar',
      label: 'Radar',
      iconPath:
        'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 12l7-7',
    },
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

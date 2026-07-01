import { Injectable } from '@angular/core';
import { driver, type DriveStep } from 'driver.js';

/**
 * Tour guiado de boas-vindas. Exibe uma vez por navegador (flag em localStorage)
 * apresentando as 5 abas principais do dashboard. A troca de aba a cada passo é
 * delegada pelo caller via callback `onGoToTab`, para o conteúdo real aparecer
 * atrás do spotlight enquanto o popover explica.
 */
@Injectable({ providedIn: 'root' })
export class OnboardingTourService {
  // Versionado: subir o sufixo (v2, v3...) reexibe o tour para todos após
  // mudanças relevantes de UI.
  private static readonly SEEN_KEY = 'ci_tour_seen_v1';

  hasSeen(): boolean {
    return localStorage.getItem(OnboardingTourService.SEEN_KEY) === 'true';
  }

  markSeen(): void {
    localStorage.setItem(OnboardingTourService.SEEN_KEY, 'true');
  }

  /** Limpa o flag para reexibir o tour (usado pelo botão "?" do header). */
  reset(): void {
    localStorage.removeItem(OnboardingTourService.SEEN_KEY);
  }

  /**
   * Inicia o tour. `onGoToTab` é chamado antes de destacar cada aba, para que o
   * dashboard ative a aba correspondente. Ao concluir/fechar, marca como visto.
   */
  // Mesmos ícones (SVG) das abas do menu, para o tour espelhar a navegação.
  private static readonly TAB_ICONS: Record<string, string> = {
    portfolio: 'M3 17l6-6 4 4 7-8M21 7v5M21 7h-5',
    'meus-ativos': 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    calendar:
      'M7 3v3M17 3v3M4 8h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z',
    metas:
      'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
    import: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
  };

  // Título do passo com o mesmo ícone da aba correspondente.
  private iconTitle(tabId: string, label: string): string {
    const path = OnboardingTourService.TAB_ICONS[tabId] ?? '';
    return (
      '<span style="display:inline-flex;align-items:center;gap:8px">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">' +
      `<path d="${path}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` +
      `</svg>${label}</span>`
    );
  }

  start(onGoToTab: (tabId: string) => void): void {
    const tabStep = (tabId: string, label: string, description: string): DriveStep => ({
      element: `[data-tour="tab-${tabId}"]`,
      popover: { title: this.iconTitle(tabId, label), description, side: 'bottom', align: 'start' },
      onHighlightStarted: () => onGoToTab(tabId),
    });

    const steps: DriveStep[] = [
      {
        popover: {
          title: '👋 Bem-vindo à Carteira Inteligente',
          description:
            'Um tour rápido pelas principais telas. Você pode sair a qualquer momento e reabrir depois no botão <strong>?</strong> do topo.',
        },
      },
      tabStep(
        'portfolio',
        'Meus Ativos',
        'Sua carteira consolidada: preço atual, zona de compra (preço-teto), rentabilidade e a alocação por classe.',
      ),
      tabStep(
        'meus-ativos',
        'Lançamentos',
        'Registre e acompanhe suas compras e vendas. É a partir daqui que as posições e os custos são calculados.',
      ),
      tabStep(
        'calendar',
        'Dividendos',
        'Calendário e histórico de proventos: o que já recebeu, o que está projetado e um radar dos próximos pagamentos.',
      ),
      tabStep(
        'metas',
        'Metas',
        'Defina objetivos de patrimônio ou renda passiva e acompanhe o progresso ao longo do tempo.',
      ),
      tabStep(
        'import',
        'Importar',
        'Importe a planilha de Posição da B3 (.xlsx) com os seus ativos para lançar toda a carteira de uma vez, sem digitação.',
      ),
    ];

    const d = driver({
      showProgress: true,
      allowClose: true,
      nextBtnText: 'Próximo',
      prevBtnText: 'Anterior',
      doneBtnText: 'Concluir',
      progressText: '{{current}} de {{total}}',
      steps,
      onDestroyed: () => this.markSeen(),
    });

    d.drive();
  }
}

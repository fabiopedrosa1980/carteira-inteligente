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
  start(onGoToTab: (tabId: string) => void): void {
    const tabStep = (tabId: string, title: string, description: string): DriveStep => ({
      element: `[data-tour="tab-${tabId}"]`,
      popover: { title, description, side: 'bottom', align: 'start' },
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
        '📊 Meus Ativos',
        'Sua carteira consolidada: preço atual, zona de compra (preço-teto), rentabilidade e a alocação por classe.',
      ),
      tabStep(
        'meus-ativos',
        '📝 Lançamentos',
        'Registre e acompanhe suas compras e vendas. É a partir daqui que as posições e os custos são calculados.',
      ),
      tabStep(
        'calendar',
        '📅 Dividendos',
        'Calendário e histórico de proventos: o que já recebeu, o que está projetado e um radar dos próximos pagamentos.',
      ),
      tabStep(
        'metas',
        '🎯 Metas',
        'Defina objetivos de patrimônio ou renda passiva e acompanhe o progresso ao longo do tempo.',
      ),
      tabStep(
        'import',
        '📥 Importar',
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

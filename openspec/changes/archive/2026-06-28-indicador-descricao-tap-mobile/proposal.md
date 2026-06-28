## Why

No detalhe do ativo, cada indicador fundamentalista tem um ícone "i" que explica o indicador. Hoje a descrição é exibida via atributo HTML nativo `title` (`[title]="describe(...)"`), que só aparece no **hover do mouse**. Em dispositivos **mobile/touch não há hover**, então tocar no ícone "i" não mostra nada — o usuário de celular nunca consegue ver a descrição do indicador. O requisito `stock-indicator-descriptions` exige que cada indicador apresente sua descrição, mas na prática isso falha no mobile.

## What Changes

- Tornar a descrição do indicador acessível por **toque (tap)** no mobile, não apenas por hover no desktop.
- Transformar o ícone "i" (`.i-info`) em um controle interativo (botão) que **abre/fecha** a descrição ao tocar, com `aria-label` e acessível por teclado.
- Exibir a descrição em um tooltip/popover (ou bloco inline) visível no card do indicador ao ativar, sem ser cortado pelos limites do painel.
- Fechar a descrição ao tocar fora, ao tocar novamente no mesmo "i" ou ao pressionar Esc; abrir uma nova fecha a anterior.
- Manter o comportamento de hover no desktop (sem regressão).

## Capabilities

### New Capabilities
<!-- Nenhuma capability nova; ajuste de comportamento de uma capability existente. -->

### Modified Capabilities
- `stock-indicator-descriptions`: passa a exigir que a descrição do indicador seja acessível também em dispositivos touch (via tap), não apenas no hover do mouse.

## Impact

- `src/app/components/stock-details-modal/stock-details-modal.html` — ícone "i" vira botão com toggle; markup do tooltip/descrição.
- `src/app/components/stock-details-modal/stock-details-modal.ts` — estado de qual descrição está aberta (signal), métodos toggle/close, fechar em clique fora e Esc.
- `src/app/components/stock-details-modal/stock-details-modal.scss` — estilo do tooltip/popover e do estado aberto; posicionamento que não seja cortado por `.details-panel { overflow: hidden }`.
- Apenas frontend (sem mudança de API ou modelo de dados).

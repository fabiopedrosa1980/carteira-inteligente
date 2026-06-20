## Why

No mobile ainda restam três pontos de layout: os cards de "Minhas Ações" precisam caber 2 por linha sem gerar rolagem; a aba Radar oferece a visão em matriz (heatmap de 13 colunas) que força rolagem horizontal em telas estreitas; e o menu principal deve permanecer em uma única linha, rolando quando não couber. O objetivo é deixar essas três telas estáveis e legíveis no celular.

## What Changes

- **Cards de Minhas Ações**: garantir 2 cards por linha no mobile com colunas que encolhem (`minmax(0,1fr)`) e conteúdo contido, sem rolagem horizontal da página nem do card.
- **Radar no mobile**: eliminar a rolagem horizontal. A visão em **cards** (Jan→Dez) passa a ser a experiência mobile, exibida em 2 colunas; a visão em **matriz** (heatmap largo) é desabilitada/oculta no mobile via `ResponsiveService.isMobile()`, evitando o container com `overflow-x`.
- **Menu principal no mobile**: assegurar que a navegação por abas fique em **uma única linha** e role horizontalmente (padrão `<app-scroll-bar>` já existente), sem quebrar para uma segunda linha.

## Capabilities

### New Capabilities
- `mobile-view-fit`: comportamento de ajuste mobile dos cards de Minhas Ações, da aba Radar (sem rolagem) e do menu principal (uma linha rolável).

### Modified Capabilities
<!-- Nenhuma capability de requisitos já versionada em openspec/specs/ é alterada. -->

## Impact

- `src/app/components/dashboard/dashboard.scss` — grid `.stocks-grid` (Minhas Ações) e confirmação do menu em uma linha.
- `src/app/components/stock-card/stock-card.scss` — contenção do conteúdo do card no mobile.
- `src/app/components/dividends-radar/dividends-radar.ts` / `.html` / `.scss` — usar `ResponsiveService` para forçar a visão em cards no mobile e ocultar o alternador/visão de matriz; cards do radar em 2 colunas no mobile.
- Reaproveita o `ResponsiveService` e o `<app-scroll-bar>` já existentes; sem novas dependências.
- Apenas template/estilos e uma pequena lógica de visão reativa; sem mudança em serviços de dados, modelos ou API.

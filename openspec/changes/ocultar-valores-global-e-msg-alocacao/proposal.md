## Why

O botão de **ocultar valores** (olho) hoje vive no cabeçalho da seção "Meus Ativos" e só mascara os totais daquela aba (e do card de alocação). Privacidade deveria ser global: ao ocultar, **todos os totais em R$ de todas as telas** (Meus Ativos, Lançamentos, Dividendos, Metas) deveriam sumir, e o controle deveria ficar no **menu superior**, junto das ações globais (tema, sair), logo após o usuário. Além disso, ao editar a **distribuição** (alvos de alocação) em Meus Ativos, não há retorno visual — falta a mensagem de "alterado com sucesso" no mesmo padrão das outras operações.

## What Changes

- **Mover o controle de ocultar valores para o menu superior:** o ícone de olho sai do cabeçalho de "Meus Ativos" e passa para a `header-actions` (top bar), **logo após o chip do usuário**, antes do tema/sair.
- **Ocultar valores vira global:** o estado de privacidade passa a ser compartilhado (serviço) e aplicado a **todos os totais monetários de todas as telas** — patrimônio/saldos (Meus Ativos), total investido e totais por seção (Lançamentos), totais de Dividendos (recebidos/projetados/mensais) e quaisquer totais em R$ de Metas. Percentuais e contagens permanecem visíveis. O estado continua persistido (localStorage) entre sessões.
- **Mensagem de sucesso ao editar a distribuição:** ao salvar a edição de alvos/limite no card de alocação, exibir um toast "Distribuição alterada com sucesso" via o `NotificationService` existente (mesmo padrão de "adicionado/atualizado com sucesso").

## Capabilities

### New Capabilities
- `ocultar-valores-global`: controle único de privacidade no menu superior que mascara todos os totais em R$ de todas as telas, com estado persistido.
- `alocacao-mensagem-edicao`: ao editar a distribuição da carteira, a aplicação confirma com um toast de sucesso no padrão atual.

### Modified Capabilities
<!-- nenhuma -->

## Impact

- **Novo `ValueVisibilityService`** (signal + toggle + persistência `ci-hide-values`) — fonte única do estado, substituindo o `valoresOcultos` local do `DashboardComponent`.
- **`dashboard.html`** — move o botão de olho do header da seção Meus Ativos para `header-actions` (após `user-chip`); `dashboard.ts` delega ao serviço.
- **Telas** — `my-assets`, `allocation-card`, `dividends`, `goals` passam a ler o serviço (ou recebem o estado) e aplicam o mascaramento (`.values-hidden`/blur) aos seus totais em R$.
- **`allocation-card.ts`** — `saveEdit()` chama `NotificationService.show('Distribuição alterada com sucesso')`.
- **Sem mudança no backend.**
- **Parte relacionada fora deste change:** a padronização da margem do título de Dividendos pertence à capability já existente `titulo-alinhado-aos-cards` (mudança `titulos-margem-alinhada-cards`), cujo spec já cobre Dividendos; será concluída lá.
- **Não é recomendação de investimento** — apenas controle de exibição/privacidade.

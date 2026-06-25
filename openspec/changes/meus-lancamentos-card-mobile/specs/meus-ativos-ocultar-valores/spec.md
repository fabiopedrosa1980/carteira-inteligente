## ADDED Requirements

### Requirement: Botão olho para ocultar/exibir valores dos cards de resumo

Na aba "Meus Ativos" (portfolio), o cabeçalho da seção SHALL exibir um **botão olho** que alterna a visibilidade dos **valores monetários** dos cards de resumo (Patrimônio Total, Investido, Ganho, Variação e os cards de Dividendos). Quando os valores estão **visíveis**, o botão MUST mostrar o ícone "olho cortado" (ação: ocultar); quando estão **ocultos**, o botão MUST mostrar o ícone "olho" (ação: exibir). O botão MUST ter `title`/`aria-label` coerente com a ação atual.

Quando ocultos, os valores SHALL ser **mascarados visualmente** (sem revelar os números), preservando o layout dos cards (sem mudança de tamanho nem rolagem). Os **rótulos e ícones** dos cards MUST permanecer visíveis. A preferência (oculto/visível) MUST ser **persistida** (localStorage) e reaplicada ao recarregar; o estado padrão (sem preferência salva) MUST ser "valores visíveis".

#### Scenario: Ocultar valores

- **WHEN** os valores estão visíveis e o usuário aciona o botão olho
- **THEN** os valores monetários dos cards de resumo passam a ficar mascarados
- **AND** os rótulos e ícones dos cards continuam visíveis
- **AND** o botão passa a exibir o ícone de "exibir" (olho)

#### Scenario: Exibir valores

- **WHEN** os valores estão ocultos e o usuário aciona o botão olho
- **THEN** os valores monetários voltam a ser exibidos
- **AND** o botão passa a exibir o ícone de "ocultar" (olho cortado)

#### Scenario: Preferência persistida

- **WHEN** o usuário oculta os valores e recarrega a página
- **THEN** os valores permanecem ocultos ao reabrir a aba "Meus Ativos"

#### Scenario: Estado padrão visível

- **WHEN** não há preferência salva
- **THEN** os valores dos cards de resumo são exibidos por padrão

#### Scenario: Layout preservado ao ocultar

- **WHEN** os valores estão ocultos
- **THEN** os cards mantêm o mesmo tamanho e posição
- **AND** não há rolagem horizontal

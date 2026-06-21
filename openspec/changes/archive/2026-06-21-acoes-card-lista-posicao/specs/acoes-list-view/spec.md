## ADDED Requirements

### Requirement: Alternância entre visão em Cards e visão em Lista

A tela de "Minhas Ações" SHALL oferecer alternância entre **visão em cards** e **visão em lista**, controlada por ícones (cards/lista). A visão em **cards** MUST ser o padrão inicial. Os ícones de alternância MUST ficar no cabeçalho da seção, à direita, junto aos controles de "Ordenar por". A ordenação selecionada MUST se aplicar igualmente às duas visões.

#### Scenario: Padrão é cards

- **WHEN** a tela de Minhas Ações é aberta
- **THEN** a visão em cards é exibida por padrão
- **AND** os ícones de alternância cards/lista aparecem à direita do cabeçalho, junto a "Ordenar por"

#### Scenario: Alternar para lista

- **WHEN** o usuário clica no ícone de lista
- **THEN** os ativos passam a ser exibidos em formato de lista
- **AND** a ordenação atual é preservada

### Requirement: Lista exibe os mesmos campos de posição em colunas

Na visão em lista, cada ativo SHALL ser exibido em uma linha com colunas para: **Ativo**, **Quantidade**, **Preço atual**, **Variação do dia (Hoje)**, **Saldo**, **Variação da posição (R$)** e **Rentabilidade (%)**. Os valores derivados MUST usar a mesma regra de cálculo do card. A lista MUST permanecer legível no mobile, sem rolagem horizontal da página.

#### Scenario: Linha da lista

- **WHEN** a visão em lista é exibida com ativos na carteira
- **THEN** cada linha mostra Ativo, Qtd, Preço, Hoje, Saldo, Variação (R$) e Rentabilidade (%)
- **AND** variação e rentabilidade indicam sinal/cor positivo/negativo

#### Scenario: Lista no mobile

- **WHEN** a visão em lista é exibida em tela estreita
- **THEN** o conteúdo permanece legível sem rolagem horizontal da página (colunas reproporcionadas/ocultadas conforme necessário)

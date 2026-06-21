# meus-ativos-resumo Specification

## Purpose

Define o bloco de resumo financeiro da tela "Meus Ativos" que exibe as métricas consolidadas da carteira — Patrimônio Total, Valor Investido, Lucro Total e Dividendos Históricos — imediatamente antes dos acordeões de grupos de ativos.

## Requirements

### Requirement: Bloco de resumo exibido antes dos acordeões

A tela "Meus Ativos" (tab `portfolio`) SHALL exibir um bloco `.portfolio-summary` entre o cabeçalho da seção e os acordeões de grupos, quando houver ao menos 1 ativo carregado. O bloco MUST ser ocultado durante o loading e quando a lista está vazia.

#### Scenario: Bloco visível com ativos carregados

- **WHEN** `acoes()` tem ao menos 1 ativo e `acoesLoading()` é false
- **THEN** o bloco `.portfolio-summary` é exibido antes das `sections-list`
- **AND** exibe valores calculados para as 4 métricas

#### Scenario: Bloco oculto durante carregamento

- **WHEN** `acoesLoading()` é true
- **THEN** o bloco de resumo não é exibido (junto com os acordeões)

#### Scenario: Bloco oculto com portfólio vazio

- **WHEN** `acoes().length === 0` e loading terminou
- **THEN** o bloco de resumo não é exibido
- **AND** a mensagem de portfólio vazio é exibida no lugar

### Requirement: Patrimônio Total exibido como métrica hero

O bloco SHALL exibir **Patrimônio Total** como a métrica principal, com o valor monetário em destaque. Patrimônio Total é definido como a soma de `saldo(s)` para todos os ativos em carteira, onde `saldo(s) = quantidade × preço atual`.

#### Scenario: Valor de Patrimônio exibido

- **WHEN** o portfólio tem ativos com quantidade e preço atual
- **THEN** o Patrimônio Total exibe a soma correta em formato `R$ X.XXX,XX`
- **AND** ativos com quantidade ≤ 0 ou preço ≤ 0 contribuem com R$ 0,00

### Requirement: Lucro Total anotado ao Patrimônio

O Lucro Total SHALL ser exibido como anotação tipográfica subordinada ao valor do Patrimônio, na mesma zona visual (hero). Lucro Total = `patrimonioTotal - valorInvestido`. O valor MUST ser colorido: positivo em `--pos-color` (verde), negativo em `--neg-color` (vermelho). O label MUST incluir o percentual de rentabilidade: `(lucro / valorInvestido) × 100`.

#### Scenario: Lucro positivo

- **WHEN** patrimônio > custo total
- **THEN** lucro exibe em verde, prefixado com "+"
- **AND** inclui percentual de rentabilidade positivo

#### Scenario: Lucro negativo

- **WHEN** patrimônio < custo total
- **THEN** lucro exibe em vermelho, prefixado com "−"
- **AND** inclui percentual de rentabilidade negativo

#### Scenario: Sem dados para lucro

- **WHEN** valorInvestido é 0 (ativos sem avgPrice)
- **THEN** lucro exibe "—" sem coloração semântica

### Requirement: Valor Investido na zona secundária

O bloco SHALL exibir **Valor Investido** como métrica compacta na zona secundária. Valor Investido = soma de `custo(s)` para todos os ativos, onde `custo(s) = quantidade × preço médio`.

#### Scenario: Valor Investido calculado

- **WHEN** há ativos com quantidade e preço médio
- **THEN** Valor Investido exibe a soma em formato `R$ X.XXX,XX`

### Requirement: Dividendos Históricos na zona secundária

O bloco SHALL exibir **Dividendos** como métrica compacta na zona secundária. O valor é calculado a partir de `StockDataService.stocks()`, somando `d.value × stock.quantity` para todos os registros de dividendos de todos os ativos. O label SHALL ser "Dividendos Hist." para indicar que é uma estimativa histórica.

#### Scenario: Dividendos calculados

- **WHEN** StockDataService tem stocks com histórico de dividendos
- **THEN** Dividendos Hist. exibe a soma estimada em formato `R$ X.XXX,XX`

#### Scenario: Sem histórico de dividendos

- **WHEN** StockDataService.stocks() está vazio ou stocks não têm dividendos
- **THEN** Dividendos Hist. exibe R$ 0,00

### Requirement: Layout responsivo em duas zonas

O bloco SHALL usar layout assimétrico com zona hero (Patrimônio + Lucro) e zona secundária (Investido + Dividendos):
- **Desktop (>640px)**: grid `3fr 2fr`, zonas lado a lado
- **Mobile (≤640px)**: zona hero full-width em cima, zona secundária 2-col em baixo

#### Scenario: Layout desktop

- **WHEN** viewport é >640px
- **THEN** zona hero à esquerda (~60%), zona secundária à direita (~40%)

#### Scenario: Layout mobile

- **WHEN** viewport é ≤640px
- **THEN** zona hero ocupa toda a largura
- **AND** Investido e Dividendos ficam lado a lado na linha abaixo

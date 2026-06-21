# acoes-card-position Specification

## Purpose
TBD - created by archiving change acoes-card-lista-posicao. Update Purpose after archive.
## Requirements
### Requirement: Card de Minhas Ações exibe quantidade, preço atual, saldo, variação e rentabilidade

O card de ação em "Minhas Ações" SHALL exibir, por ativo: a **quantidade** de cotas, o **preço atual** (cotação do dia), o **saldo atual** da posição, a **variação da posição em R$** e a **rentabilidade em %**. Os valores derivados MUST ser calculados no frontend a partir de `quantity`, `avg_price` (preço médio) e `current_price` (preço atual):

- `saldo = quantity × preçoAtual`
- `custo = quantity × preçoMédio`
- `variação (R$) = saldo − custo`
- `rentabilidade (%) = (preçoAtual − preçoMédio) / preçoMédio × 100`

A variação do dia ("Hoje", `change_percent`) MUST continuar sendo exibida e é distinta da variação da posição. Variação (R$) e rentabilidade (%) MUST indicar sinal e cor (positivo/negativo).

#### Scenario: Posição com lucro

- **WHEN** um ativo tem `quantity = 120`, `preçoMédio = 34,00` e `preçoAtual = 38,50`
- **THEN** o card mostra Quantidade 120, Preço R$ 38,50, Saldo R$ 4.620,00
- **AND** Variação +R$ 540,00 e Rentabilidade +13,2%, em cor positiva

#### Scenario: Posição com prejuízo

- **WHEN** `preçoAtual` é menor que `preçoMédio`
- **THEN** Variação (R$) e Rentabilidade (%) aparecem negativas, em cor negativa

#### Scenario: Sem dados para derivar

- **WHEN** um ativo não tem quantidade (> 0) ou não tem preço médio (> 0)
- **THEN** o card não exibe saldo/variação/rentabilidade que dependam desses dados (sem mostrar valores inválidos)


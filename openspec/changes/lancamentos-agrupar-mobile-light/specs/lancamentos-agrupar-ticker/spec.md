## MODIFIED Requirements

### Requirement: Agrupar lançamentos por ticker

A tela de Lançamentos SHALL oferecer uma opção para **agrupar por ticker**. Quando ativada, cada seção (Ações/FIIs/ETFs) SHALL exibir uma linha por ativo, com a **quantidade somada**, o **preço médio ponderado** (custo total ÷ quantidade total) e o valor total do ativo. Quando desativada, a lista detalhada (uma linha por lançamento) SHALL ser exibida. A escolha SHALL ser lembrada entre sessões.

Em telas estreitas (mobile), a visão agrupada SHALL ser apresentada como **cards empilhados** — ticker em destaque e os demais campos como pares **rótulo: valor** (Quantidade, Preço médio, Total, Lançamentos) — com **fonte maior** e boa legibilidade tanto no tema escuro quanto no **tema claro**.

#### Scenario: Cards empilhados no mobile
- **WHEN** a visão agrupada é exibida em tela estreita
- **THEN** cada ativo aparece como um card com o ticker em destaque e os campos como pares rótulo: valor

#### Scenario: Legível no tema claro
- **WHEN** a visão agrupada é exibida no tema claro em mobile
- **THEN** os cards e textos têm contraste adequado para leitura

#### Scenario: Preço médio ponderado
- **WHEN** um ativo tem vários lançamentos com preços diferentes
- **THEN** o preço médio exibido é a média ponderada pela quantidade

#### Scenario: Desktop inalterado
- **WHEN** a visão agrupada é exibida em telas largas
- **THEN** o layout em tabela (colunas) permanece como antes

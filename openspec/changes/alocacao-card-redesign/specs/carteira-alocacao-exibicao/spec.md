## ADDED Requirements

### Requirement: Faixa de composição única da carteira

O card de Alocação SHALL exibir a composição atual como uma **barra segmentada única** (stacked), onde cada classe (Ações / FIIs / ETFs) ocupa uma fração proporcional ao seu percentual do patrimônio, com **marcador de alvo** por classe. Cada segmento MUST ter cor distinta e derivada dos tokens do tema, e a barra MUST permanecer legível em web e mobile.

#### Scenario: Composição proporcional

- **WHEN** a carteira tem posições em mais de uma classe
- **THEN** a faixa mostra um segmento por classe com largura proporcional ao percentual
- **AND** cada segmento indica visualmente o alvo da classe

#### Scenario: Uma única classe

- **WHEN** toda a carteira está em uma classe
- **THEN** a faixa mostra um único segmento ocupando 100%, sem quebra

### Requirement: Ledger por classe sem overflow

O detalhamento por classe SHALL ser apresentado em **colunas alinhadas** (classe, % atual, % alvo, ação de rebalanceamento) com números em `tabular-nums`. O montante de rebalanceamento (ex.: "reduzir R$ 14.916") MUST NOT colidir nem transbordar com o rótulo de alvo; em telas estreitas a ação MUST reposicionar (quebra controlada para a própria linha) em vez de espremer o conteúdo.

#### Scenario: Desktop com colunas alinhadas

- **WHEN** o card é exibido em desktop
- **THEN** classe, atual, alvo e ação ficam em colunas alinhadas, sem sobreposição

#### Scenario: Mobile sem quebra

- **WHEN** o card é exibido em largura estreita (mobile)
- **THEN** a ação de rebalanceamento reposiciona sem colidir com os demais campos

### Requirement: Edição do alvo por classe na barra

No modo de edição, o card SHALL apresentar **um controle por classe** (Ações, FIIs, ETFs) — três sliders independentes, cada um com um **handle arrastável** sobre a sua própria barra de percentual — para ajustar o alvo de cada classe. Cada slider MUST ser operável por teclado (setas ajustam o alvo) e expor semântica de slider (ARIA). Como os alvos são independentes, a soma PODE ficar diferente de 100% e o sistema MUST sinalizar isso com um aviso (sem redistribuir entre classes). O valor de alvo MUST refletir no ledger e ser persistido ao salvar.

#### Scenario: Ajustar o alvo de uma classe

- **WHEN** o usuário arrasta o handle do slider de uma classe
- **THEN** apenas o alvo daquela classe é ajustado
- **AND** o ledger reflete o novo alvo

#### Scenario: Soma diferente de 100%

- **WHEN** a soma dos três alvos fica diferente de 100%
- **THEN** o card exibe um aviso indicando a soma atual

#### Scenario: Ajuste por teclado

- **WHEN** o handle de uma classe está focado e o usuário pressiona as setas
- **THEN** o alvo daquela classe é ajustado em incrementos previsíveis

### Requirement: Cores e moldura consistentes com o tema

A apresentação do card SHALL usar exclusivamente os **tokens do tema** (`--accent`, `--color-pos`, `--color-neg`, `--color-warning`, `--input-bg`, `--border`, `--card-bg`, `--text-*`) — sem valores hex hardcoded — e MUST manter raio, padding e tipografia coerentes com os cards de resumo da carteira, em tema claro e escuro.

#### Scenario: Tema claro e escuro

- **WHEN** o usuário alterna entre tema claro e escuro
- **THEN** todas as cores do card derivam dos tokens e permanecem legíveis e consistentes

#### Scenario: Coerência com os cards vizinhos

- **WHEN** o card de Alocação é exibido junto aos cards de resumo
- **THEN** moldura e tipografia seguem o mesmo padrão visual

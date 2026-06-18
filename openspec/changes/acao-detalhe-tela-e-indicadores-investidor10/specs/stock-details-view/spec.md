## MODIFIED Requirements

### Requirement: Detalhes da ação ao clicar no card

Na tela Minhas Ações, clicar em um card de ação SHALL abrir uma visualização de detalhes **em tela cheia (in-page)**, substituindo a lista de cards — sem modal/overlay. A tela SHALL exibir no mínimo: ticker, nome, preço, variação do dia, dividend yield, nota e setor, além do histórico de dividendos da ação e dos indicadores fundamentalistas quando disponíveis. A tela SHALL oferecer uma ação de "Voltar" que retorna à lista.

#### Scenario: Abrir detalhes em tela cheia
- **WHEN** o usuário clica em um card de ação
- **THEN** a lista de cards é substituída pela tela de detalhes da ação (sem overlay)

#### Scenario: Voltar para a lista
- **WHEN** o usuário aciona "Voltar" na tela de detalhes
- **THEN** a tela de detalhes é encerrada e a lista de ações é exibida novamente

#### Scenario: Indicadores quando disponíveis
- **WHEN** a ação possui indicadores fundamentais retornados pela API
- **THEN** os indicadores são exibidos na tela de detalhes

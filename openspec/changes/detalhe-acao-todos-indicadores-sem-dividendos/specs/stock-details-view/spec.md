## MODIFIED Requirements

### Requirement: Detalhes da ação ao clicar no card

Na tela Minhas Ações, clicar em um card de ação SHALL abrir uma visualização de detalhes em tela cheia (in-page), substituindo a lista de cards — sem modal/overlay. A tela SHALL exibir: ticker, nome, preço, variação do dia, dividend yield, nota, setor e os dados de posição (cotas, preço médio), além de **todos os indicadores fundamentalistas** disponíveis para o ativo. A tela NÃO SHALL exibir o histórico de dividendos. A tela SHALL oferecer uma ação de "Voltar" que retorna à lista.

#### Scenario: Todos os indicadores exibidos
- **WHEN** a API retorna indicadores para o ativo
- **THEN** a tela de detalhes exibe todos eles em um grid (rótulo + valor)

#### Scenario: Sem seção de dividendos
- **WHEN** a tela de detalhes da ação é exibida
- **THEN** não há seção de histórico de dividendos na tela

#### Scenario: Indicadores ausentes
- **WHEN** a API não retorna indicadores para o ativo
- **THEN** a tela é exibida normalmente, sem a seção de indicadores e sem erro

#### Scenario: Voltar para a lista
- **WHEN** o usuário aciona "Voltar"
- **THEN** a tela de detalhes é encerrada e a lista de ações é exibida

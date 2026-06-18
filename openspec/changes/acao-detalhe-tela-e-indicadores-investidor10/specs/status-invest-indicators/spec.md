## MODIFIED Requirements

### Requirement: Indicadores fundamentais via Investidor10

A API (backend Go) SHALL fornecer indicadores fundamentalistas por ticker (ex.: P/L, P/VP, Dividend Yield, ROE, Payout) obtidos do **Investidor10**, e o frontend SHALL exibi-los na visualização de detalhes da ação quando presentes. Na ausência dos indicadores, o frontend SHALL exibir os detalhes sem eles, sem erro.

#### Scenario: Indicadores presentes
- **WHEN** a API retorna indicadores para um ticker
- **THEN** os indicadores são exibidos na tela de detalhes da ação

#### Scenario: Indicadores ausentes
- **WHEN** a API não retorna indicadores para um ticker
- **THEN** a tela de detalhes é exibida normalmente, sem a seção de indicadores e sem erro

#### Scenario: Fonte Investidor10
- **WHEN** o backend Go busca os indicadores
- **THEN** ele os obtém do Investidor10 (e não do Status Invest)

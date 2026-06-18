## ADDED Requirements

### Requirement: Indicadores fundamentais via Status Invest

A API (backend Go) SHALL fornecer indicadores fundamentais por ticker obtidos do Status Invest (ex.: P/L, P/VP, Dividend Yield, ROE), e o frontend SHALL exibi-los na visualização de detalhes da ação quando presentes. Na ausência dos indicadores, o frontend SHALL exibir os detalhes sem eles, sem erro.

#### Scenario: Indicadores presentes
- **WHEN** a API retorna indicadores para um ticker
- **THEN** os indicadores são exibidos na visualização de detalhes da ação

#### Scenario: Indicadores ausentes
- **WHEN** a API não retorna indicadores para um ticker
- **THEN** a visualização de detalhes é exibida normalmente, sem a seção de indicadores e sem erro

#### Scenario: Contrato de API documentado
- **WHEN** o backend Go for implementado
- **THEN** ele expõe os indicadores do Status Invest no payload de ação/quote conforme o contrato descrito no design

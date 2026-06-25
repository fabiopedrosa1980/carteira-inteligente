## ADDED Requirements

### Requirement: Valores não cortados no Histórico de Dividendos em mobile

Na tela de **Histórico de Dividendos**, a tabela de dividendos SHALL exibir os **valores** (coluna "Valor") **sem truncamento** (sem ellipsis/corte) em telas estreitas (mobile, ≤480px). As larguras das colunas (Tipo, Data Com, Pagamento, Valor) MUST ser rebalanceadas para que o valor monetário caiba por completo, e o valor MUST permanecer em uma única linha (`white-space: nowrap`) sem ser cortado. A tabela MUST permanecer contida, sem rolagem horizontal da página. No desktop o layout permanece inalterado.

#### Scenario: Valor completo no mobile

- **WHEN** a tabela de Histórico de Dividendos é exibida em largura ≤480px
- **THEN** o valor de cada linha é exibido por completo (sem ellipsis/corte)
- **AND** o valor permanece em uma única linha

#### Scenario: Tabela contida

- **WHEN** a tabela de Histórico de Dividendos é exibida em largura ≤480px
- **THEN** a tabela permanece contida na largura da tela
- **AND** não há rolagem horizontal da página

#### Scenario: Desktop inalterado

- **WHEN** a tabela é exibida em largura > 480px
- **THEN** o layout de colunas permanece como no desktop atual

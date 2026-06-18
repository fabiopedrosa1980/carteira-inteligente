## ADDED Requirements

### Requirement: Proventos de FIIs nas telas de Dividendos

A API (backend Go) SHALL retornar os proventos (rendimentos) de FIIs, e o frontend SHALL incluí-los nas telas de Dividendos (Histórico, Recebidos e Projetados), que hoje consideram apenas ações.

#### Scenario: FIIs no histórico de dividendos
- **WHEN** a carteira possui FIIs com proventos
- **THEN** o histórico de dividendos inclui os rendimentos dos FIIs

#### Scenario: FIIs em Recebidos e Projetados
- **WHEN** a carteira possui FIIs com proventos no ano corrente
- **THEN** os valores de FIIs são considerados nos totais de Recebidos e Projetados

#### Scenario: Contrato de API documentado
- **WHEN** o backend Go for implementado/ajustado
- **THEN** ele retorna os proventos de FIIs no endpoint de dividendos conforme o contrato descrito no design

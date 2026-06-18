## MODIFIED Requirements

### Requirement: Indicadores fundamentais via Investidor10

A API (backend Go) SHALL obter os indicadores fundamentalistas de um ticker no Investidor10 **no momento do cadastro** do ativo (criação do Stock / importação) e **persisti-los** junto ao Stock. As requisições de posições (`GetAcoes`/`GetFiis`) SHALL ler os indicadores persistidos, sem raspar ao vivo por requisição. O job periódico de atualização SHALL também atualizar os indicadores. O frontend SHALL exibir os indicadores recebidos; na ausência, exibir sem eles e sem erro.

#### Scenario: Indicadores obtidos no cadastro
- **WHEN** um ticker é cadastrado (criação do Stock ou primeiro lançamento)
- **THEN** os indicadores são buscados uma vez no Investidor10 e persistidos no Stock

#### Scenario: Posições servem indicadores do banco
- **WHEN** o usuário abre Minhas Ações (ou FIIs)
- **THEN** os indicadores vêm do banco (sem scraping por requisição)

#### Scenario: Atualização periódica
- **WHEN** o job periódico de sincronização executa
- **THEN** os indicadores persistidos são atualizados

#### Scenario: Indicadores ausentes
- **WHEN** o Investidor10 não retorna indicadores para o ticker
- **THEN** o Stock fica sem indicadores e a tela não quebra

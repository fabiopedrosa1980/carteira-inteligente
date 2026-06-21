## ADDED Requirements

### Requirement: Ticker deve condizer com o tipo de ativo escolhido

No modal de lançamento, ao inserir um ativo, a aplicação SHALL validar se o **ticker condiz com o tipo selecionado** (Ações, FIIs, ETFs). Como as APIs não retornam a categoria do ativo, a validação MUST usar uma **heurística por sufixo do ticker** da B3: tickers terminados em **3, 4, 5, 6, 7 ou 8** são **Ações**; terminados em **11** são **FII ou ETF**. Em incompatibilidade óbvia (ex.: tipo "Ações" com ticker terminado em 11, ou tipo "FIIs"/"ETFs" com ticker de ação), a aplicação MUST **impedir o salvamento** e exibir mensagem clara. A ambiguidade FII × ETF (ambos terminam em 11) MUST ser tolerada (não bloquear entre essas duas classes).

#### Scenario: Bloqueia ação cadastrada como FII/ETF

- **WHEN** o tipo escolhido é "FIIs" ou "ETFs" e o ticker termina em 3/4/5/6/7/8 (ação)
- **THEN** o salvamento é impedido
- **AND** é exibida mensagem indicando incompatibilidade entre ticker e tipo

#### Scenario: Bloqueia FII/ETF cadastrado como ação

- **WHEN** o tipo escolhido é "Ações" e o ticker termina em 11
- **THEN** o salvamento é impedido
- **AND** é exibida mensagem indicando incompatibilidade entre ticker e tipo

#### Scenario: FII e ETF não se bloqueiam entre si

- **WHEN** o ticker termina em 11 e o tipo escolhido é "FIIs" ou "ETFs"
- **THEN** o salvamento é permitido (sem bloqueio por ambiguidade)

#### Scenario: Sufixo não reconhecido

- **WHEN** o ticker não casa com nenhum sufixo conhecido
- **THEN** a validação não bloqueia o salvamento por tipo (não há base para afirmar incompatibilidade)

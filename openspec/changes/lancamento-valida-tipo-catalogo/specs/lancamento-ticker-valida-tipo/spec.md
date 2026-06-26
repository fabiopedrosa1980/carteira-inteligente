## MODIFIED Requirements

### Requirement: Ticker deve condizer com o tipo de ativo escolhido

No modal de lançamento, ao inserir um ativo, a aplicação SHALL validar se o **ticker condiz com o tipo selecionado** (Ações, FIIs, ETFs) resolvendo o tipo do ativo em **tiers**, do sinal mais confiável ao menos:

1. **Catálogo da API Go** — o `assetType` informado pela cotação `/quote` (derivado de `b3_assets`) é a **fonte de verdade**. Igual ao tipo escolhido → MUST **permitir o salvamento**; divergente → MUST **impedir** e exibir mensagem clara.
2. **Nome do ativo** — quando o catálogo não conhece o ticker mas a cotação retornou nome, a aplicação MUST classificar tickers terminados em 11 pelo nome: nome contendo "imobiliário"/"FII" → **FIIs**; contendo "índice"/"index"/"ishares"/"ETF" → **ETFs**; caso contrário → **Ações** (unit). Tickers 3–8 → **Ações**.
3. **Sufixo do ticker** — sem catálogo nem nome, apenas o sufixo **3, 4, 5, 6, 7 ou 8** classifica como **Ações** (único sinal confiável para bloquear). O sufixo **11 é indeterminado** (pode ser FII, ETF ou unit de ação) e MUST NOT bloquear nenhum tipo escolhido. Sufixos não reconhecidos também não bloqueiam.

Em todos os tiers, units de ação terminadas em 11 (TAEE11, SANB11) MUST poder ser registradas como **Ações**.

#### Scenario: Catálogo confirma o tipo e permite salvar

- **WHEN** o `assetType` da API é igual ao tipo escolhido (ex.: TAEE11→Ações, MXRF11→FIIs, BOVA11→ETFs)
- **THEN** o salvamento é permitido

#### Scenario: Catálogo diverge e bloqueia

- **WHEN** o `assetType` da API diverge do tipo escolhido (ex.: ETF confirmado salvo como "FIIs", ou ação salva como "FIIs")
- **THEN** o salvamento é impedido
- **AND** é exibida mensagem indicando incompatibilidade entre ticker e tipo

#### Scenario: Nome classifica unit 11 como Ação (fallback sem catálogo)

- **WHEN** o catálogo não conhece o ticker terminado em 11, o nome é de empresa (sem "imobiliário"/"índice") e o tipo escolhido é "Ações"
- **THEN** o salvamento é permitido

#### Scenario: Nome classifica FII/ETF e bloqueia divergência (fallback sem catálogo)

- **WHEN** o catálogo não conhece o ticker terminado em 11, o nome indica FII ("imobiliário") ou ETF ("índice"/"ishares") e o tipo escolhido diverge dessa classificação
- **THEN** o salvamento é impedido
- **AND** é exibida mensagem indicando incompatibilidade entre ticker e tipo

#### Scenario: Sufixo bloqueia ação (3–8) cadastrada como FII/ETF

- **WHEN** catálogo e nome estão indisponíveis, o tipo escolhido é "FIIs" ou "ETFs" e o ticker termina em 3/4/5/6/7/8 (ação)
- **THEN** o salvamento é impedido

#### Scenario: Sufixo 11 sem catálogo nem nome não bloqueia

- **WHEN** catálogo e nome estão indisponíveis e o ticker termina em 11
- **THEN** a validação não bloqueia nenhum tipo escolhido (11 é indeterminado: FII, ETF ou unit de ação)

#### Scenario: Sufixo não reconhecido

- **WHEN** catálogo e nome estão indisponíveis e o ticker não casa com nenhum sufixo conhecido
- **THEN** a validação não bloqueia o salvamento por tipo

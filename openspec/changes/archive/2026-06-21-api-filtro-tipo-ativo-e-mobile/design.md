## Context

O backend Go usa arquitetura em camadas: `domain` → `application` → `infrastructure/persistence` → `adapters/http`. A implementação de Ações e FIIs é idêntica — `aggregatePositions(userID, assetType)` já suporta qualquer `AssetType`, e `respondPositions` enriquece as posições com cotação Yahoo independente do tipo. Adicionar ETFs é replicar o padrão existente.

ETFs na B3 (BOVA11, IVVB11, SMAL11…) seguem o mesmo formato `.SA` no Yahoo Finance, então `fetchYahooQuote` funciona sem modificação.

## Goals / Non-Goals

**Goals:**
- Endpoint `/transactions/etfs` com comportamento idêntico a `/acoes` e `/fiis`
- Propagação limpa por todas as camadas sem duplicação de lógica
- Mobile: apenas Ativo + Saldo visíveis em ≤640px

**Non-Goals:**
- Novo campo de tipo no response JSON (o frontend já filtra por endpoint)
- Endpoint unificado com query param `?type=` (poderia ser uma refatoração futura)
- Modificar `computeNotas` para ETFs (a fórmula funciona igualmente)

## Decisions

### Propagar pelo mesmo padrão Ações/FIIs

Não criar lógica especial para ETFs. O `aggregatePositions` do repositório já recebe `AssetType` como parâmetro — basta adicionar `GetEtfsPositions` que chama `aggregatePositions(userID, domain.AssetTypeETFs)`.

No handler, `GetEtfs` chama `h.respondPositions(c, h.service.GetEtfsPositions)` — exatamente como `GetAcoes` e `GetFiis`.

Após a implementação, o frontend deixa de cair no fallback `deriveEtfPositions` (que só tinha qty/avgPrice, sem preço atual), passando a ter dados completos.

### Mobile: mover ocultação de Rent. para ≤640px

A regra `≤480px` adicionada na change anterior ocultava Rent. apenas em telas muito pequenas. O usuário quer Rent. oculta no mobile padrão (≤640px). A solução é mover `nth-child(7)` para dentro do `@media (max-width: 640px)` existente da `.acoes-list`, e remover o bloco `≤480px` separado (que se torna redundante).

Larguras resultantes em ≤640px: `cl-ativo: 60%`, `cl-saldo: 40%`, `cl-rent: 0`.

### Sem alterações no frontend TypeScript

`getEtfs()` já existe e aponta para o endpoint correto. Assim que o Go responder 200, o Angular vai usar os dados reais. O fallback `deriveEtfPositions` pode ser mantido como segurança ou removido — mantém-se por ora.

## Risks / Trade-offs

- **ETFs sem cobertura no Yahoo**: tickers menos líquidos podem retornar `price: 0`, `name: ticker`. Aceitável — mesmo comportamento já existente para ações/FIIs sem cobertura.
- **Go em repo separado**: os commits precisam ser feitos em dois repos distintos — `carteira-inteligente-api` e `carteira-inteligente`. A API precisa ser deployada no Render antes do frontend refletir ETFs com dados reais.

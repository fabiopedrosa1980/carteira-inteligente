## 1. Classificador por nome e resolvedor em tiers

- [x] 1.1 Adicionar `detectAssetTypeByName(ticker, name): AssetType | null` em `asset-type.util.ts` (só decide para 11; FII antes de ETF; Ação por exclusão; normaliza acento/caixa)
- [x] 1.2 Adicionar `resolveAssetType(ticker, quote): AssetType | null` (tier 1 catálogo `assetType` → tier 2 nome → tier 3 sufixo)
- [x] 1.3 Garantir que `null` = indeterminado (nunca bloqueia)

## 2. Validação no modal de lançamento

- [x] 2.1 Guardar a última cotação resolvida (`assetType` + `name`) no componente para uso no `save()`
- [x] 2.2 Trocar a validação de tipo em `save()` para usar `resolveAssetType` (bloqueia só quando resolvido ≠ tipo escolhido)
- [x] 2.3 Trocar o getter `tickerTypeMismatch` (aviso em tempo real) para usar o mesmo `resolveAssetType`
- [x] 2.4 Confirmar que tipo travado por seção e override manual continuam respeitados

## 3. Validação no backend Go (defesa em profundidade)

- [x] 3.1 Injetar `application.AssetUseCase` no `TransactionHandler` (atualizar `NewTransactionHandler` e a montagem em `main.go` + teste)
- [x] 3.2 Em `CreateTransaction`, consultar `GetByTicker(req.Ticker)`; se existe no catálogo e `type != req.AssetType` → responder HTTP 422 com mensagem de incompatibilidade
- [x] 3.3 Ticker fora do catálogo (ErrNotFound) → seguir criando normalmente
- [x] 3.4 Teste de handler: 201 quando tipo confere, 422 quando diverge, 201 quando ticker ausente do catálogo

## 4. Testes e verificação

- [x] 4.1 Testes de unidade de `detectAssetTypeByName`/`resolveAssetType` cobrindo a amostra (TAEE11/SANB11/KLBN11/ALUP11/BPAC11→Acoes; MXRF11/HGLG11/KNRI11/XPML11/VISC11→FIIs; BOVA11/IVVB11/SMAL11/HASH11→ETFs)
- [ ] 4.2 Verificar no app: TAEE11 e SANB11 salvam como Ações sem bloqueio
- [ ] 4.3 Verificar no app: MXRF11 salva como FIIs; BOVA11 salva como ETFs
- [ ] 4.4 Verificar bloqueio de divergência (ex.: BOVA11 como FIIs; PETR4 como FIIs)
- [x] 4.5 `go build`/`go test` no repo Go e `npx prettier --write` + `ng build` no front sem erros

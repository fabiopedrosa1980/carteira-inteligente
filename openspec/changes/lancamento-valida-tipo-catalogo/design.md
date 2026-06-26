## Context

A validação atual de tipo no `add-transaction-modal.save()` usa só `detectAssetType` (sufixo). Com a mudança `catalogo-ativos-b3`, a cotação `/quote` já traz `assetType` (catálogo `b3_assets`) e `name` (Yahoo). Sondagem real confirma que o **nome** separa o sufixo 11 com confiabilidade alta: FIIs trazem "Fundo de Investimento Imobiliário"/"FII"; ETFs trazem "Índice"/"Index"/"iShares"; units de ação são nomes de empresa ("S.A.", "Banco", "Companhia") sem esses marcadores. A heurística por sufixo, sozinha, não distingue FII×ETF nem reconhece units 11 como Ações.

## Goals / Non-Goals

**Goals:**
- Permitir registrar Ações, FIIs e ETFs no tipo correto, com o catálogo da API Go como fonte de verdade.
- Bloquear apenas divergências reais (tipo escolhido ≠ tipo resolvido com confiança).
- Desambiguar tickers 11 fora do catálogo pelo nome da cotação.

**Non-Goals:**
- Mudar o backend Go (já entrega `assetType` e `name`).
- Reescrever o auto-fill do tipo (tratado em `catalogo-ativos-b3`); aqui o foco é a **validação**/aviso.
- Persistir/validar tipo no servidor (validação é client-side, como hoje).

## Decisions

### 1. Resolução do tipo em tiers, reaproveitável
Criar um resolvedor único usado por `save()` e pelo getter `tickerTypeMismatch`:
```
resolveAssetType(ticker, quote): AssetType | null
  1. if quote.assetType → retorna (catálogo, fonte de verdade)
  2. else if quote.name → detectAssetTypeByName(ticker, name)
  3. else → detectAssetType(ticker)   // sufixo; 11 → null
```
Retorno `null` = indeterminado → **não bloqueia**. Bloqueio só quando o resolvido é não-nulo e ≠ tipo escolhido.
- *Alternativa descartada:* manter dois caminhos separados (save e aviso) com lógicas divergentes — fonte de inconsistência; um resolvedor único garante que aviso e bloqueio concordem.

### 2. `detectAssetTypeByName(ticker, name)` (tier 2)
Só decide para tickers terminados em 11 (para 3–8 o sufixo já basta → Ações). Ordem das checagens importa: **FII antes de ETF** e ambos antes do default Ação.
- contém `imobiliári`/`\bfii\b` → FIIs
- senão contém `índice`/`indice`/`index`/`ishares`/`\betf\b` → ETFs
- senão → Ações (unit)
Normaliza acentos/caixa antes do match. Retorna `null` para 11 sem nome utilizável.
- *Alternativa descartada:* classificar por `S.A.`/`Banco` para afirmar Ação — frágil; melhor tratar Ação como o **default por exclusão** dos marcadores de fundo/índice.

### 3. Confiar no nome para bloquear
O nome é confiável o suficiente (sondagem 16/16) para **bloquear** divergências no tier 2, não só sugerir. Isso evita salvar um FII como ETF quando o catálogo está indisponível. Em caso raro de nome atípico, o usuário ainda vê a mensagem e pode revisar; o risco é baixo e simétrico ao ganho.

### 4. Defesa em profundidade no backend Go
O front pode ser contornado (cliente desatualizado, chamada direta à API). Por isso `CreateTransaction` valida o `asset_type` contra `b3_assets`: injeta `application.AssetUseCase`, faz `GetByTicker(req.Ticker)` e, se o ticker existe no catálogo com tipo diferente, responde **422** com mensagem. Ticker fora do catálogo → aceita (conservador, simétrico ao tier 3 do front).
- *Escopo:* só `CreateTransaction` ("incluir o ativo"). `UpdateTransaction` não recebe o ticker no payload (ticker é fixo na edição), então a checagem por catálogo exigiria carregar a transação — fica fora deste escopo.
- *Alternativa descartada:* validar no `TransactionService` (camada de aplicação) — o catálogo é uma dependência de infraestrutura já exposta como use case; injetar no handler mantém o serviço de transação agnóstico ao catálogo.

## Risks / Trade-offs

- **Nome atípico classifica errado um 11 fora do catálogo** → impacto restrito ao fallback (catálogo cobre ~1557 tickers); a mensagem é clara e o catálogo, quando disponível, sempre prevalece. Mitigação: ordem FII→ETF→Ação e normalização de acentos.
- **Cotação lenta/sem nome** → cai no tier 3 (sufixo); 11 indeterminado não bloqueia, preservando a capacidade de registrar units.
- **Divergência entre aviso e bloqueio** → eliminada por usar o mesmo resolvedor nos dois pontos.

## Migration Plan

1. Adicionar `detectAssetTypeByName` + `resolveAssetType` em `asset-type.util.ts` (com testes de unidade dos casos da sondagem).
2. Trocar a validação de `save()` e o getter `tickerTypeMismatch` para usar `resolveAssetType(ticker, lastQuote)`.
3. Garantir que o componente guarda a última cotação resolvida (`assetType` + `name`) para a validação no submit.
4. Verificar manualmente: TAEE11/SANB11 como Ações (permite), MXRF11 como FIIs, BOVA11 como ETFs, e bloqueios de divergência.
5. **Rollback:** sem catálogo/nome o resolvedor degrada para o comportamento por sufixo atual; reverter é trocar a chamada de volta para `detectAssetType`.

## Open Questions

- Manter o bloqueio por nome (Decisão 3) ou rebaixá-lo a aviso não-bloqueante quando vier só do nome (não do catálogo)? Default proposto: bloquear, dada a confiabilidade observada.

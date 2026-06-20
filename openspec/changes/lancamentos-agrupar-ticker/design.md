## Context

`MyAssetsComponent` mantém `sectionData` (computed) com os lançamentos por `assetType` (`Acoes`/`FIIs`/`ETFs`), ordenados por `sortField`/`sortAsc`. A tabela (em `my-assets.html`) tem colunas Ativo · Data · Qtd · Preço Unit · Total · Operação, com editar/remover por linha e clique para editar. `totalFor`/`totalAll` somam `quantity*price`.

## Goals / Non-Goals

**Goals:**
- Alternar entre detalhado (atual) e agrupado por ticker.
- Agrupado: por ticker, somar quantidade e calcular preço médio ponderado.
- Lembrar a escolha entre sessões.

**Non-Goals:**
- Editar/remover no modo agrupado (é agregado).
- Mudar o cálculo de totais das seções (a soma é a mesma).

## Decisions

**1. Estado.** `grouped = signal<boolean>(...)` inicializado de `localStorage` (`lancamentos-grouped`), default `false`. `toggleGrouped()` persiste.

**2. Dados agrupados (computed, sem fetch).**
```ts
interface GroupedRow { ticker: string; quantity: number; avgPrice: number; total: number; count: number; }
```
Para cada seção: agrupar por `ticker` (uppercase), somar `quantity` e `cost = Σ(quantity*price)`; `avgPrice = quantity > 0 ? cost/quantity : 0`; `total = cost`; `count` = nº de lançamentos. Ordenar por ticker (pt-BR).

**3. Preço médio = ponderado.** `Σ(qty×preço) / Σ(qty)` — média ponderada pela quantidade, não aritmética. Casas: exibir com 2 decimais (currency BRL), igual ao resto da tela.

**4. Render condicional.**
- `grouped()`: tabela agrupada — colunas Ativo · Qtd · Preço médio · Total · (nº lançamentos). Sem data, sem coluna Operação, linha não-clicável.
- `!grouped()`: a tabela detalhada atual, intacta (com editar/remover e sort).

**5. Alternador.** Botão/segmented "Detalhado | Agrupado" (ou um toggle "Agrupar por ticker") no header, coerente com os toggles do app. `aria-pressed`.

**6. Contadores.** O badge de contagem da seção e o "N lançamentos" do subtítulo continuam refletindo o nº de **lançamentos** (não muda com o agrupamento); cada linha agrupada mostra seu próprio `count`.

## Risks / Trade-offs

- [Vendas/quantidades negativas] o modelo atual trata lançamentos como quantidade positiva (compra). Se existirem vendas, o preço médio ponderado simples pode não refletir custo de carteira; no escopo atual (lançamentos somados) é aceitável e coerente com o pedido ("somando os ativos").
- [Sort no agrupado] mantém ordenação por ticker; o sort por colunas continua valendo no modo detalhado. Simplicidade > recurso.

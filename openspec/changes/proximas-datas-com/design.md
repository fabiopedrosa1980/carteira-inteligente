## Context

Dividendos tem 4 sub-tabs (Histórico, Recebidos, Projetados, Radar). O Radar (`DividendsRadarComponent`) mostra a sazonalidade do ano anterior por `ex_date`, **só da carteira** (`getAcoes`/`getFiis` + `getStockDividends`). Investigando a API: nenhum provento tem `ex_date` futuro (base retrospectiva), então a próxima data-com precisa ser **estimada** pelo ritmo histórico. `getStocks()` expõe o universo acompanhado (~14 ativos) com `ex_date`/`pay_date`/`amount`/`type` por provento.

## Goals / Non-Goals

**Goals:**
- Faixa "Próximas datas-com" ordenada por urgência (dias até a próxima data-com estimada).
- Motor de cadência client-side que projeta a próxima `ex_date` a partir do histórico.
- Eixo 🟢 tenho (reforço) / 🔴 não tenho (oportunidade) cruzando carteira + universo.
- Rotulagem honesta: estimativa (≈), dia só quando há confiança; senão mês.

**Non-Goals:**
- Datas-com oficiais/anunciadas (não existem na base).
- Valor líquido por imposto (Dividendo×JCP×Rendimento) e projeção de R$ — fora do v1.
- Mudança de backend; alertas/push; persistência.

## Decisions

**1. Onde vive.** Banda no **topo da sub-tab Radar**, acima do grid de 12 meses — junta o acionável (próximas datas-com) com o contexto (sazonalidade). Novo componente `ProximasDatasComComponent` com `@Input() assetType`, carregado independentemente do grid.

**2. Universo.** Une `getStocks()` (universo) com `getAcoes()`/`getFiis()` (carteira). Diff por ticker normalizado → marca `owned: boolean`. Filtra pela classe do `assetType`. Busca `getStockDividends(stock_id)` em paralelo (`forkJoin`) para cada ativo do universo da classe.

**3. Motor de cadência.**
```
exs = ex_dates históricas ordenadas (asc), só válidas
gaps = intervalos consecutivos (dias)
if exs.length < 2: sem projeção (excluir)
gap = mediana(gaps)
cadência: ~30→mensal · ~90→trimestral · ~180→semestral · ~365→anual (faixa ±25%)
próxima = última_ex; while (próxima <= hoje) próxima += gap   // rola pra frente
dias = próxima − hoje
```

**4. Confiança dia vs mês.** Coeficiente de variação dos gaps (desvio/mediana):
- CV baixo (≤ ~0,15) **e** ≥ 3 ex_dates → mostra **dia** estimado (≈ 28/jun).
- senão → mostra **mês** provável (ago/2026), sem cravar dia.
- 1 só gap → mês; 0 gap → excluído.

**5. Ritmo quebrado.** Se a última `ex_date` for muito antiga (> 1,5× gap atrás), o ativo saiu do ritmo → excluir da faixa (evita estimativa fantasma).

**6. Ordenação e corte.** Ordena por `dias` asc; horizonte padrão **45 dias**. Itens só com mês provável dentro do horizonte entram ordenados pelo 1º dia do mês.

**7. Conteúdo do item.** `🟢/🔴 · ticker · data-com estimada (dia|mês) · cadência · "em N dias"`. Aviso de rodapé: "≈ estimativa pelo histórico · confirme no RI".

**8. Estilo.** Reaproveita a linguagem visual do stock-card / radar-card (já alinhados): borda, chip accent, faixa lateral de destaque para urgência alta.

## Risks / Trade-offs

- [Estimativa erra] → empresa antecipa/atrasa/corta. Mitiga com rótulo "≈" e exclusão de ritmo quebrado; nunca apresentar como oficial.
- [Universo pequeno/incompleto] → `/stocks` tem só os ativos rastreados; oportunidades fora dele não aparecem. Aceitável no v1.
- [Custo de fetch] → N ativos × `getStockDividends` em paralelo; `/stocks` é pequeno (~14), risco baixo. `catchError`→[] mantém defensivo.
- [Pagador irregular] → cai no modo "mês provável"; se nem isso, é excluído — melhor omitir que enganar.

## Context

A faixa lateral de 3px na lista de Meus Ativos (`DashboardComponent`) é um **semáforo de oportunidade de compra**. A cor vem da CSS var `--zona-color`, definida por classe na `<tr>` (`dashboard.scss:349`): default `var(--border)`, `.zona-compra` → `--color-pos`, `.zona-justo` → `#e0a82e`, `.zona-caro` → `--color-neg`. A classe vem de `zonaClass(stock)`.

Para Ações/FIIs a zona vem do preço-teto por dividend yield (`precoTetoOf`). ETF não tem preço-teto (`preco-teto.util.ts:115` → `zona: 'na'`), então a faixa caía no default `var(--border)` — igual à borda → bug "borda na borda".

Uma primeira iteração coloriu o ETF por **preço atual vs preço médio**, mas isso mede **P&L da posição**, não oportunidade, e é invertido (acima do médio = bom resultado, mas pior entrada). Esta change adota o sinal de mercado correto: **posição na faixa de 52 semanas**.

Dados disponíveis hoje para a posição de ETF (`ApiAcaoItem`): `avg_price`, `current_price`, `change_percent`, `dividend_yield`, `indicators[]` (esparsos para ETF). **Não há** máxima/mínima de 52 semanas. O backend Go consulta o Yahoo Finance, que já retorna `fiftyTwoWeekHigh`/`fiftyTwoWeekLow` no mesmo payload de cotação — o dado existe na fonte, falta o backend repassá-lo.

## Goals / Non-Goals

**Goals:**
- Faixa do ETF reflete **oportunidade de compra** pela posição na faixa de 52 semanas (B2).
- Conceito **unificado**: a faixa significa "está barato pra comprar?" para todos os tipos.
- Corrigir a "borda na borda" (estado neutro deixa de usar `var(--border)`).
- Degradar com elegância: ETF fica **neutro** enquanto o backend não fornecer 52 sem — nada quebra.
- Reusar as cores de zona já existentes.

**Non-Goals:**
- Não alterar a semântica/cores de Ações/FIIs.
- Não adicionar coluna nem reexibir o caption do ETF.
- Não usar preço médio (P&L) na coloração do ETF.
- Não implementar o backend neste repo (frontend; o backend é pré-requisito em repo separado).
- Não tocar no detalhe do ativo.

## Decisions

### 1. Sinal = posição na faixa de 52 semanas (B2)

`pos = (preçoAtual − mín52) / (máx52 − mín52)`, recortado em [0, 1]. Limiares: `pos < 0,30` → verde (oportunidade); `0,30 ≤ pos ≤ 0,70` → amarelo (justo); `pos > 0,70` → vermelho (caro).

_Alternativas:_ **B1** (drawdown só do topo) — mais simples, mas ignora o quão longe pode cair; **B3** (vs média de 200d) — "abaixo da tendência" é bom, mas "acima" fica ambíguo e exige a MA. B2 foi escolhido porque o Yahoo entrega máx **e** mín no mesmo objeto (custo extra ≈ zero sobre B1) e o sinal fica mais equilibrado.

### 2. Lógica no `DashboardComponent`, não no util de preço-teto

`preco-teto.util.ts` continua retornando `na` para ETF. A regra de 52 semanas é exibição da lista e fica em `zonaClass(stock)` (ou helper dedicado) detectando `sector === 'ETF'`. Mantém o detalhe do ativo e o cálculo de teto intactos.

### 3. Reusar classes `zona-compra/justo/caro`

Mapeia o veredito do ETF para as classes que já pintam a faixa. Sem paleta nova; consistência total de cor. A divergência semântica anterior (verde = valorizou) desaparece: agora verde = barato, igual a Ações/FIIs.

### 4. Estado neutro não coincide com a borda

ETF sem faixa de 52 sem válida (e qualquer estado neutro) usa `--zona-color: transparent` em vez de `var(--border)`, eliminando a "borda na borda".

### 5. Contrato de API (pré-requisito de backend)

O backend deve incluir no `ApiAcaoItem` dos ETFs os campos de 52 semanas — proposto: `fifty_two_week_high` e `fifty_two_week_low` (números). O frontend mapeia para campos opcionais em `Stock` (ex.: `high52`, `low52`). Origem: Yahoo Finance (`fiftyTwoWeekHigh`/`fiftyTwoWeekLow`).

### 6. Degradação graciosa

Sem `high52`/`low52`, com `máx == mín`, ou com `preçoAtual ≤ 0`/ausente → ETF fica **neutro** (`zona-na` → transparente). Isso permite mergear o frontend **antes** do backend: o ETF simplesmente não mostra sinal até o dado chegar.

## Risks / Trade-offs

- **Dependência de backend em repo separado** → Mitigação: degradação graciosa (neutro) torna o frontend seguro de mergear isolado; o sinal "liga" quando o backend expõe os campos.
- **Falling knife** (ETF em queda estrutural mostra `pos` baixo = "falsa oportunidade") → Mitigação: válido para ETF de índice amplo (mean-reverting); disclaimer "não é recomendação" já existe.
- **Janela de 52 sem é arbitrária** (não capta ciclos longos) → Mitigação: é a convenção de mercado mais comum e legível; limiares ajustáveis.
- **Limiares 0,30/0,70 fixos** podem soar arbitrários → Mitigação: simples e explicáveis; revisáveis sem afetar outras telas.

## Migration Plan

1. **Backend (pré-requisito, fora deste repo):** expor `fifty_two_week_high`/`fifty_two_week_low` nos ETFs.
2. **Frontend:** adicionar campos opcionais ao modelo, mapear na API, trocar a regra do ETF (de P&L para 52 sem) e o SCSS do neutro. Pode ir antes do backend (ETF fica neutro até o dado existir). Rollback = reverter o commit; nenhum estado persistido.

## Open Questions

- **Acesso ao backend Go**: confirmado que dá pra adicionar os campos de 52 sem? Define se o sinal liga "agora" ou fica aguardando o backend (frontend já pronto com fallback neutro).
- Nomes finais dos campos da API (`fifty_two_week_high`/`low` propostos).
- Limiares `0,30 / 0,70` — manter ou calibrar?

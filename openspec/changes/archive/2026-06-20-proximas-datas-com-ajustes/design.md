## Context

`DividendsComponent.tabs` define a ordem das sub-tabs; hoje: Histórico · Recebidos · Projetados · **Próximas datas-com** · Radar de proventos. `ProximasDatasComComponent` tem `const HORIZON_DAYS = 45` e filtra itens com `est.daysUntil > HORIZON_DAYS`. A faixa une universo (`getStocks`, filtrado por `sector`) com a carteira (`getAcoes`/`getFiis`) e marca `owned`.

## Goals / Non-Goals

**Goals:**
- "Próximas datas-com" como última sub-tab.
- Horizonte de 90 dias.
- Garantir/validar que a carteira contribui com itens na faixa.

**Non-Goals:**
- Mudar o motor de cadência, o layout do item ou o estilo.
- Tornar o horizonte configurável pelo usuário (fica fixo em 90).

## Decisions

**1. Ordem das abas.** Mover o objeto `proximas` para depois de `radar` na lista `tabs`. Nova ordem: Histórico · Recebidos · Projetados · Radar de proventos · **Próximas datas-com**. `activeTab` default segue `historico`.

**2. Horizonte.** `HORIZON_DAYS = 90`. Com isso, cadências trimestrais (~91d) entram quando a próxima data-com cai dentro da janela; semestrais/anuais entram só quando já estão próximas. Mantém o texto vazio coerente ("Nenhuma data-com estimada nos próximos 90 dias").

**3. Validação da carteira.** Conferir, com dados reais da API, que ativos possuídos aparecem na faixa de 90 dias (🟢). Pré-condição já garantida no código: `owned` vem do diff por ticker; como os `stock_id` da carteira são os mesmos do universo (`getStocks`), os ativos possuídos estão no universo iterado. A validação confirma empiricamente que pelo menos um item 🟢 aparece (ex.: FII mensal sempre dentro de 90 dias).

## Risks / Trade-offs

- [Mais itens na faixa] 90 dias traz mais ativos — inclusive estimativas menos urgentes. Aceitável; a ordenação por urgência mantém os mais próximos no topo.
- [Texto vazio desatualizado] o `*ngIf` de vazio cita "45 dias"; atualizar para 90 para não enganar.
- [Carteira fora do universo] se algum ativo da carteira não estivesse em `getStocks`, ele não apareceria; a validação detecta esse caso se ocorrer.

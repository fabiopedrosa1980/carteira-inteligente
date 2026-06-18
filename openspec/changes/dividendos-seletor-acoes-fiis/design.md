## Context

`DividendsComponent` controla as sub-tabs (Histórico/Recebidos/Projetados) e renderiza `DividendHistoryComponent` e `DividendsSummaryComponent` via `*ngIf`. Hoje ambos carregam Ações + FIIs combinados: `forkJoin([api.getAcoes(), api.getFiis()])`. O `BackendApiService` já expõe `getAcoes()` e `getFiis()` separadamente.

## Goals / Non-Goals

**Goals:**
- Seletor Ações/FIIs na tela de Dividendos.
- Cada visão carrega apenas a classe selecionada e recarrega ao trocar.

**Non-Goals:**
- Incluir ETFs (fora do pedido; sem endpoint dedicado).
- Alterar o cálculo de Recebidos/Projetados além da fonte (ações vs FIIs).

## Decisions

**1. Estado da classe no container.** Em `DividendsComponent`, adicionar `assetType = signal<'Acoes' | 'FIIs'>('Acoes')` e um seletor segmentado (dois botões) acima das `.dv-tabs`. Passar `[assetType]="assetType()"` para os dois componentes filhos.

**2. Filhos carregam por classe e recarregam ao trocar.** Adicionar `@Input() assetType: 'Acoes' | 'FIIs'` em `DividendHistoryComponent` e `DividendsSummaryComponent`. Extrair a carga atual para um método `load()` que escolhe a fonte: `assetType === 'FIIs' ? api.getFiis() : api.getAcoes()` (substituindo o `forkJoin` combinado). Implementar `OnChanges` para chamar `load()` quando `assetType` mudar (e na primeira atribuição), reutilizando os signals de loading/estado existentes. Alternativa considerada: recriar o filho via `*ngIf` keyed — descartada por ser menos explícita que `OnChanges`.

**3. UX.** Seletor com rótulos "Ações" e "FIIs"; o `dividends-summary` continua usando `mode` (received/projected) em conjunto com o novo `assetType`.

## Risks / Trade-offs

- [OnChanges disparar carga dupla se vários inputs mudarem juntos] → `load()` é idempotente (apenas refaz a busca); custo aceitável.
- [Estado de seleção dentro do summary ao recarregar] → Resetar `rows`/`expanded`/`loading` no início de `load()` para evitar exibir dados da classe anterior.
- [FIIs sem dados] → As telas já tratam lista vazia; nada quebra quando não há FIIs.

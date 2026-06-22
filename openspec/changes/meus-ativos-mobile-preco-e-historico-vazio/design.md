## Context

Três ajustes pequenos, todos de frontend, sem mudança de API:

1. **Card mobile de "Meus Ativos"** — a `.acoes-list` vira cards em `@media (max-width: 640px)` usando um grid de áreas por `td:nth-child(n)`. A coluna "Preço Atual" é `td:nth-child(4)` e hoje está **oculta no mobile** (`display: none`), decisão tomada quando foi adicionada (redundante com o Saldo). O usuário agora quer essa cotação visível no card.
   - Observação: o spec `meus-ativos-mobile-colunas` (que descreve uma tabela de 3 colunas no mobile) está **desatualizado** frente ao código atual (layout de cards). Esta mudança trata o layout de cards implementado como verdade.
2. **Histórico** — `dividend-history` já trata: carregando (`loadingPositions`), erro (`error`), processamento (`anyProcessing`) e vazio-pós-seleção (`dh-empty`). Falta o caso **sem nenhuma posição** (`visiblePositions().length === 0`): hoje a tela some sem mensagem.
3. **Indicadores (`.ps-cards`)** — grid hoje em `repeat(3, 1fr)` no web e `1fr 1fr` no mobile. Pedido: manter **3 por linha no web e 2 por linha no mobile** (que é o estado atual); item entra no plano apenas para fixar/validar esse comportamento.

## Goals / Non-Goals

**Goals:**
- Mostrar "Preço Atual" no card mobile de Meus Ativos, junto ao Preço Médio, com rótulo e fallback "—".
- Exibir mensagem de estado vazio no Histórico quando a carteira não tem posições.
- Fixar `.ps-cards` em 3 colunas no web e 2 no mobile.

**Non-Goals:**
- Não alterar a tabela do desktop de Meus Ativos (a coluna já existe lá).
- Não mudar a lógica de filtros/dados do Histórico.
- Não reconciliar o spec desatualizado `meus-ativos-mobile-colunas` nesta mudança.

## Decisions

### 1. Revelar "Preço Atual" no card mobile via grid de áreas
Trocar `td:nth-child(4) { display: none; }` por uma célula posicionada no grid. Reorganizar `grid-template-areas` para pareá-la com o Preço Médio (comparação custo × cotação):
```
'ticker hoje'
'saldo  saldo'
'rent   var'
'preco  patual'
'qtd    qtd'
```
Atribuir `td:nth-child(4) { grid-area: patual; }` (Preço Atual), com `::before { content: 'Preço atual'; }` e alinhamento à direita, no mesmo idioma dos demais micro-rótulos do card. Preço Médio (`td:nth-child(3)`) mantém `grid-area: preco`.
- *Alternativa descartada*: Preço Atual em linha própria full-width — quebra a comparação visual com o Preço Médio.

### 2. Estado vazio do Histórico
Adicionar um bloco abaixo dos controles, exibido quando `!loadingPositions() && !error() && !anyProcessing() && visiblePositions().length === 0`. Reutilizar o padrão visual de vazio (`dh-empty` ou equivalente) com mensagem orientando a cadastrar lançamentos. A condição garante precedência de carregando/erro/processamento.
- *Alternativa descartada*: reaproveitar o `dh-empty` atual — ele depende de `selectedStockId() !== null`, que nunca ocorre sem posições; precisa de bloco próprio.

### 3. `.ps-cards` — 3 colunas no web, 2 no mobile
Manter `grid-template-columns: repeat(3, 1fr)` no web e o override mobile `1fr 1fr` (2 colunas) em ≤640px. Esse já é o estado atual após a mudança anterior; a tarefa serve para confirmar/validar o comportamento, ajustando apenas se algo regrediu. O card hero (Patrimônio) continua ocupando 1 coluna.

## Risks / Trade-offs

- **Card mobile mais alto** com a linha extra (Preço Atual) → aceitável; mantém comparação custo × cotação. Mitigar mantendo tipografia/discrição dos micro-rótulos.
- **Reorganização do grid de áreas** pode deslocar Qtd → revisar visualmente o card no mobile (≤640px) após a mudança.
- **Spec desatualizado** (`meus-ativos-mobile-colunas`) permanece divergente → fora de escopo; anotado para reconciliação futura.

## Migration Plan

Mudança puramente de frontend, sem migração de dados. Deploy via build/serve padrão; rollback = reverter os commits.

## Open Questions

- Texto exato do estado vazio do Histórico. Default: "Você ainda não tem ativos na carteira. Cadastre lançamentos para ver o histórico de dividendos."

## Context

Três ajustes nas telas de Dividendos (componentes `dividends-radar`, `dividend-history`, `dividends-summary`), orquestradas por `dividends.html`/`dividends.ts`, que define as abas (`tabs`) com `iconPath` para Histórico, Recebidos, Projetados e Radar:

1. **Radar** — `dividends-radar.html` tem `.radar-toolbar` com `.radar-view-toggle` (botões `rv-btn` cards/matriz). O estado vazio (`rows().length === 0`, com `!loading()`) já existe (`.radar-no-data`). O alternador hoje aparece sempre.
2. **Estados vazios** — `dividend-history` (`.dh-no-data-icon`), `dividends-summary` (`.ds-no-data-icon`) e `dividends-radar` (`.radar-no-data-icon`) usam o mesmo SVG de calendário. Os `iconPath` por aba estão em `dividends.ts`.
3. **Histórico** — `dividend-history` exibe `pageItems()` (página de `filteredDividends()`), sem ordenação por coluna. Colunas: Tipo (`type`), Data Com (`ex_date`), Data de Pagamento (`pay_date`), Valor (`amount`). Hoje a ordenação fixa é por `pay_date` desc (em `selectStock`). Já existe um padrão de cabeçalho ordenável em `dashboard`/`my-assets` (`th-sortable`/`th-arrow`, `setSort`, `sortField`, `sortAsc`).

## Goals / Non-Goals

**Goals:**
- Ocultar o alternador de visualização do Radar no estado vazio.
- Usar o ícone do sub-menu de cada tela nos estados vazios.
- Tornar a tabela do Histórico ordenável por todas as colunas, com indicador e alternância asc/desc.

**Non-Goals:**
- Não alterar os cálculos de proventos nem as fontes de dados.
- Não alterar o layout/colunas da tabela do Histórico além de torná-la ordenável.
- Não mexer nos ícones das abas em si (apenas reaproveitar seus `iconPath`).

## Decisions

- **Radar — condição de exibição do alternador**: envolver `.radar-view-toggle` com `*ngIf="loading() || rows().length > 0"`. Assim ele aparece com dados e durante o skeleton, e some apenas no estado vazio pós-carregamento. Alternativa descartada: ocultar a `.radar-toolbar` inteira — a legenda já tem seu próprio `*ngIf` e pode ter regras distintas.
- **Ícones por tela**: substituir o `<path>`/`<rect>` de calendário de cada estado vazio pelo `iconPath` da aba correspondente (single-path com `stroke`, `stroke-width: 1.8`, `stroke-linecap/linejoin: round`), mantendo as classes `*-no-data-icon` e o tamanho atual:
  - `dividend-history`: ícone de Histórico (fixo).
  - `dividends-radar`: ícone de Radar (fixo).
  - `dividends-summary`: ícone por modo — expor no componente um getter/computed `iconPath` que devolve o path de Recebidos quando `mode === 'received'` e o de Projetados quando `mode === 'projected'`, e usar `[attr.d]="iconPath"` no template. Evita duplicar SVGs e mantém a paridade com as abas.
- **Histórico — ordenação por coluna**: replicar o padrão de `my-assets`/`dashboard`:
  - Sinais `sortField` (`'type' | 'ex_date' | 'pay_date' | 'amount'`, padrão `'pay_date'`) e `sortAsc` (padrão `false`, i.e. mais recente primeiro).
  - `setSort(field)`: se já for a coluna ativa, inverte `sortAsc`; senão, define a coluna e um padrão sensato (datas/valor desc, tipo asc), e zera a página (`page.set(0)`).
  - Novo computed `sortedDividends` derivado de `filteredDividends()` aplicando `sortField`/`sortAsc`; `pageItems` passa a paginar sobre `sortedDividends`. Remover a ordenação fixa de `selectStock` (a ordenação padrão passa a vir dos sinais).
  - Cabeçalhos `<th>` clicáveis com indicador (`th-arrow`/seta) na coluna ativa, reaproveitando o estilo do padrão existente, adicionado ao `dividend-history.scss`.
  - Comparações: strings de data (`ex_date`/`pay_date`) por `localeCompare` (formato ISO ordena corretamente); `amount` numérico; `type` pelo rótulo normalizado.

## Risks / Trade-offs

- [Datas ausentes (`ex_date`/`pay_date` vazios) podem ordenar de forma inesperada] → Tratar nulos/vazios como menores (ou maiores) de forma consistente, mantendo-os agrupados nas extremidades.
- [Remover a ordenação fixa de `selectStock` pode mudar a ordem inicial] → O padrão `sortField='pay_date'` + `sortAsc=false` reproduz a ordem atual (mais recente primeiro).
- [Ícones de aba têm formas diferentes do calendário e podem variar de "peso" visual a 40px] → Aceitável; é o objetivo (reconhecer a tela). Mantém-se tamanho e cor (accent) atuais.

## Open Questions

Nenhuma.

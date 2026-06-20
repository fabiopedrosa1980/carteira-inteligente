## Context

`DashboardComponent` é a home (rota `/`). A marca está em `dashboard.html` como `<div class="logo">` (SVG `.logo-mark` + `<span class="logo-text">Carteira <strong>Inteligente</strong></span>`), sem interação. O componente já tem `activeTab = 'meus-ativos'` (padrão) e `setActiveTab(id)`, que troca a aba, limpa `selectedStock` e recarrega os dados. A app é single-route.

## Goals / Non-Goals

**Goals:**
- Clicar na marca volta à home (aba `meus-ativos`) e fecha o detalhe aberto.
- Acessível por teclado.

**Non-Goals:**
- Criar rota nova; mudar o layout/estilo da marca.

## Decisions

**1. `goHome()`.** Método que chama `this.setActiveTab('meus-ativos')` — reaproveita o fluxo existente (troca aba + `selectedStock.set(null)` + refresh). Nome semântico para o template.

**2. Marca clicável e acessível.** No `.logo`: `(click)="goHome()"`, `role="button"`, `tabindex="0"`, `(keydown.enter)="goHome()"` e `(keydown.space)="goHome(); $event.preventDefault()"`, `title="Voltar para o início"`, `aria-label="Carteira Inteligente — voltar para o início"`. Mantém a `<div>` (sem virar `<button>`, evitando reset de estilo).

**3. Estilo.** Adicionar `cursor: pointer` ao `.logo` e um leve realce no hover (ex.: leve aumento de opacidade do texto/mark) para sinalizar a interação, sem alterar o layout.

**4. Fechar modais com Esc.** Cada componente de modal ganha um `@HostListener('document:keydown.escape')` que dispara o fechamento. Como `add-transaction-modal`, `add-stock-modal` e `stock-details-modal` são renderizados condicionalmente (`*ngIf`), o listener só existe quando o modal está aberto → chamar `this.close.emit()`. O `confirm-dialog` está sempre montado e exibe conforme `state()`; o listener deve **só agir quando há diálogo aberto** (`if (this.state()) this.cancel()`), tratando Esc como cancelar. Sem `stopPropagation` entre modais (não há aninhamento simultâneo no app).

## Risks / Trade-offs

- [Clique na home já ativa] re-disparar `setActiveTab('meus-ativos')` recarrega os dados; aceitável (comportamento de "atualizar"/voltar ao topo).
- [Semântica] `div[role=button]` exige handlers de teclado, já incluídos; alternativa seria `<button>`, evitada pelo impacto visual.

# Tasks: meus-ativos-mobile-fix

## [FEITO] dashboard.html — remover .acoes-list-wrap

- [x] Na visão em lista, remover o `<div class="acoes-list-wrap">` que envolve o `<table class="acoes-list">`, deixando a tabela diretamente dentro de `<div class="accordion-inner">` (commit 9de316f)

## [FEITO] dashboard.scss — ajustar estilos mobile

- [x] Remover regras de `.acoes-list-wrap`; ocultar colunas Qtd, Preço Médio, Hoje, Variação e Rent. em ≤640px (commit 9cca7a0)

## Botão "+" por grupo — abrir modal de lançamentos pré-configurado

O cabeçalho de cada acordeão (Ações / FIIs / ETFs) na visão em lista deve ter um ícone "+" que abre `AddTransactionModalComponent` com `defaultAssetType` pré-definido pela seção.

Mapeamento grupo → AssetType:
- `'Ações'` → `'Acoes'`
- `'FII'`   → `'FIIs'`
- `'ETF'`   → `'ETFs'`

### dashboard.ts

- [x] Importar `AddTransactionModalComponent` e adicioná-lo ao array `imports` do componente
- [x] Adicionar signal `showTxModal = signal(false)` e `txPresetType = signal<AssetType | null>(null)`
- [x] Adicionar método `openAddTx(group: string): void` que mapeia grupo para `AssetType` e abre o modal
- [x] Importar `AssetType` de `../../models/transaction.model`

### dashboard.html

- [x] No `.accordion-header` da visão em lista, adicionar botão com ícone SVG "+" à direita (antes do chevron), com `(click)="openAddTx(group); $event.stopPropagation()"` e `title="Adicionar lançamento"`
- [x] Adicionar `<app-add-transaction-modal>` ao final do template, condicionado a `showTxModal()`, passando `[defaultAssetType]="txPresetType()"` e `(close)="showTxModal.set(false)"`

### dashboard.scss

- [x] Estilizar o botão "+" no header do acordeão: ícone 16×16px, cor `var(--text-secondary)`, sem borda, fundo transparente, `border-radius: 6px`, hover com cor `var(--accent)` — mesmo padrão do `btn-add-inline` de Lançamentos

## Verificação e2e

- [ ] Abrir http://localhost:4200, ir para aba "Meus Ativos" em visão lista
- [ ] Clicar no "+" do grupo Ações: modal deve abrir com tipo "Ações" pré-selecionado e campo desabilitado
- [ ] Clicar no "+" do grupo FIIs: modal com "FIIs" pré-selecionado
- [ ] Clicar no "+" do grupo ETFs: modal com "ETFs" pré-selecionado
- [ ] Redimensionar para 375px via DevTools: confirmar que nenhuma coluna transborda e o "+" aparece corretamente
- [ ] Testar também em 640px e desktop (>640px) sem regressão

## Why

A marca no cabeçalho (logo + "Carteira Inteligente") não é clicável. O padrão de UX da web é que clicar na marca leva de volta à **página inicial**. Aqui, "home" é a aba padrão (Lançamentos / `meus-ativos`), e clicar na marca deve voltar a ela e fechar qualquer detalhe aberto.

## What Changes

- Tornar a **marca** (logo + texto "Carteira Inteligente") **clicável**, voltando para a home (aba padrão `meus-ativos`), fechando o detalhe de ativo aberto, se houver.
- Acessível: cursor de ponteiro, `role`/`tabindex` e ativação por teclado (Enter/Espaço), com `aria-label`/`title`.
- **Fechar os modais com a tecla ESC:** os modais de Lançamento (adição/edição), de Adicionar ativo, de Detalhe de ativo e o diálogo de Confirmação SHALL fechar ao pressionar **Esc** (no confirmar, Esc equivale a cancelar).

## Capabilities

### Added Capabilities
- `header-brand-home`: clicar na marca (logo + texto) no cabeçalho volta para a página inicial.
- `modais-fechar-esc`: fechar os modais/diálogos com a tecla Esc.

## Impact

**Frontend (este repo):**
- `src/app/components/dashboard/dashboard.html` — marca com `(click)`/teclado + atributos de acessibilidade.
- `src/app/components/dashboard/dashboard.ts` — `goHome()` reaproveitando `setActiveTab('meus-ativos')`.
- `src/app/components/dashboard/dashboard.scss` — cursor/hover da marca clicável.
- `add-transaction-modal`, `add-stock-modal`, `stock-details-modal`, `confirm-dialog` (`.ts`) — `@HostListener('document:keydown.escape')` chamando o fechamento (`close.emit()` ou `cancel()`).

Sem mudança de rota (single-route) nem backend.

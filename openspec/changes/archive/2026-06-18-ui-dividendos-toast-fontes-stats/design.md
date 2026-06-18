## Context

Os títulos de Dividendos vêm de três lugares: os rótulos das sub-tabs em `dividends.ts` (`'Histórico de Dividendos'`, `'Dividendos Recebidos'`, `'Dividendos Projetados'`), o `<h3 class="dh-title">` fixo em `dividend-history.html`, e o `title` computado por `mode` em `dividends-summary.ts`. O toast (`toast.scss`) usa `font-size: 0.75rem` e padding pequeno. A fonte base global é `font-size: 14px` em `html, body` (`styles.scss`); a maioria dos componentes usa tamanhos em `px`. A faixa `portfolio-stats` em `dashboard.html` fica antes do `.section-header` de Minhas Ações e depende de 5 computeds do `dashboard.ts`, usados apenas ali.

## Goals / Non-Goals

**Goals:**
- Títulos curtos (Histórico/Recebidos/Projetados) nas sub-tabs e nos títulos internos.
- Toast maior e mais legível.
- Fonte base maior (14 → 15px) para mobile e web.
- Remover a faixa de pills antes do header em Minhas Ações e o código morto associado.

**Non-Goals:**
- Refatorar todos os tamanhos em `px` para `rem` (mudança ampla e arriscada).
- Alterar ícones ou subtítulos das seções de Dividendos.
- Remover o header de página ou as sub-tabs de Dividendos.

## Decisions

**1. Títulos curtos.**
- `dividends.ts`: rótulos → `Histórico`, `Recebidos`, `Projetados` (mantém ícones).
- `dividend-history.html`: `Histórico de Dividendos` → `Histórico`.
- `dividends-summary.ts`: `title` computado → `Recebidos` / `Projetados`. Os subtítulos descritivos permanecem para dar contexto.

**2. Toast maior.**
Em `toast.scss`: `font-size` 0.75rem → ~0.95rem; `padding` 0.5/0.75rem → ~0.8/1.1rem; `max-width` 320 → ~380px; `gap` e `toast-close` proporcionalmente maiores. Mantém o bloco `@media (max-width: 480px)` (largura cheia com margens).

**3. Fonte base 14 → 15px.**
Alterar apenas `html, body { font-size: 15px }` em `styles.scss`. É o menor lever que melhora a leitura em web e mobile. Componentes com tamanhos em `px` não escalam automaticamente — aceitável; um refactor para `rem` fica fora de escopo. Alternativa considerada: subir para 16px — descartada por risco maior de reflow/quebra nos grids e tabelas atuais.

**4. Remover `portfolio-stats`.**
Remover o bloco `.portfolio-stats` de `dashboard.html`; remover as regras `.portfolio-stats`, `.stat-pill`, `.sp-label`, `.sp-value` (e variantes `.accent/.green/.neg`), `.sp-sub` de `dashboard.scss`; remover os computeds `maxChange`, `topChangeStock`, `minChange`, `maxNota`, `topNotaStock` de `dashboard.ts` (sem outros usos). Verificar imports/`computed` que fiquem sem uso.

## Risks / Trade-offs

- [Fonte base 15px pode causar pequeno reflow em grids/tabelas] → Validar no build e visualmente; manter 15px (não 16px) reduz o risco.
- [Toast maior pode sobrepor conteúdo no canto] → Mantém `position: fixed` e responsivo; impacto mínimo.
- [Remover computeds pode deixar `computed` importado sem uso no `dashboard.ts`] → Conferir e remover imports órfãos se houver; validar com `ng build`.

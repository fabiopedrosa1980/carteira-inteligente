## Context

Lighthouse 13 (mobile), build de produção servido estaticamente em `localhost`:
Performance 76 · Acessibilidade 96 · Boas Práticas 100 · SEO 90. TBT 0ms, CLS 0.039.

Estado relevante:
- `src/index.html`: `<html lang="en">`, sem `<meta name="description">`.
- `src/app/app.ts`: template **inline** `<router-outlet></router-outlet><app-toast></app-toast><app-confirm-dialog></app-confirm-dialog>` — sem `<main>`.
- `src/app/app.html`: placeholder do starter Angular (~19.7KB), **não referenciado** (o componente usa `template:` inline) → morto.
- Bundle inicial 574KB (> orçamento 500KB); `dashboard.scss` 15.9KB (> 12KB).

Auditoria limitada à **tela de login** (app exige Google Sign-In, indisponível em headless).

## Goals / Non-Goals

**Goals:**
- SEO → ~100 (meta description) e `lang` correto.
- Acessibilidade → ~100 (landmark `<main>`).
- Remover cruft (`app.html`).

**Non-Goals:**
- Reescrever telas ou design.
- Resolver performance agora (lazy-load fica como fase futura/opcional).
- Auditar telas internas (atrás do login).

## Decisions

### Decisão: `<main>` no template raiz (app.ts)

Envolver `<router-outlet>` em `<main>` no template inline de `app.ts`. Um único ponto cobre todas as rotas, sem tocar em cada componente. Toast e diálogo de confirmação ficam **fora** do `<main>` (são utilitários globais, não conteúdo principal).

**Alternativa — `<main>` por componente de tela:** rejeitada; repetitivo e propenso a divergência/duplicação de landmark.

### Decisão: meta description + `lang=pt-BR` no index.html

Adicionar `<meta name="description">` curta e descritiva e corrigir `lang`. Mudança estática, sem efeito colateral.

### Decisão: remover `app.html`

É placeholder morto (template inline em uso). Remover evita confusão futura. Confirmar que nada referencia `app.html` (não há `templateUrl`).

### Decisão: performance como fase futura

LCP/bundle melhoram com **lazy-load** de rotas pesadas (Dividendos/Radar/Importar) e split do `dashboard`. Exige design próprio (fronteiras de rota, estados de carregamento) e medição em CDN real. Fora do escopo desta entrega; documentado para um próximo change.

## Risks / Trade-offs

- [Posição do `<main>` afetar algum CSS que assume a hierarquia atual] → `<main>` sem estilo próprio (display: block) não deve alterar layout; verificar no build.
- [Remover `app.html` por engano] → verificado: `app.ts` usa `template:` inline; `app.html` não é referenciado.
- [Auditoria só na tela de login] → as correções (meta/lang/main) são globais (index.html + root), valem para todas as telas.

## Open Questions

- Texto exato da meta description (sugestão: algo como "Carteira inteligente de dividendos para ativos da B3: acompanhe proventos, preço-teto e alocação.").
- Performance: fazer o lazy-load agora num change separado ou adiar?

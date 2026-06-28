## Why

Auditoria do **Lighthouse** (mobile, build de produção servido estaticamente) mostrou o site bem aderente, mas com correções de baixo esforço e alto valor:

- **SEO 90** — falta `<meta name="description">` no `index.html`. Além disso, `<html lang="en">` está incorreto (o app é em **PT-BR**), o que prejudica leitores de tela e SEO.
- **Acessibilidade 96** — `landmark-one-main`: o documento não tem um landmark `<main>`. O template raiz (`app.ts`, inline) tem apenas `<router-outlet>` + toast + diálogo, sem `<main>` envolvendo o conteúdo.
- **Performance 76** — limitada pelo bundle inicial (**574KB > orçamento de 500KB**); `dashboard.scss` também excede o orçamento. TBT/CLS estão ótimos; o gargalo é tamanho/LCP.

Resolver os dois primeiros leva SEO e Acessibilidade para ~100 com mudanças mínimas e seguras. A performance entra como melhoria maior e opcional (lazy-load), documentada para um próximo passo.

## What Changes

- **SEO/metadados**: adicionar `<meta name="description">` descritiva em `index.html`; corrigir `lang="en"` → `lang="pt-BR"`.
- **Acessibilidade**: envolver o conteúdo roteado em um landmark `<main>` no template raiz (`app.ts`).
- **Limpeza** (oportunística): remover o `app.html` placeholder do starter do Angular (morto — o componente usa template inline) para evitar confusão.
- **Performance (opcional / fase futura)**: lazy-load das telas mais pesadas e ajuste de orçamento, para baixar o bundle inicial abaixo de 500KB e melhorar LCP. Não bloqueia esta entrega.

## Capabilities

### New Capabilities
- `metadados-documento-seo`: metadados do documento (meta description, `lang` correto) para aderência de SEO/idioma.
- `landmark-main-acessibilidade`: landmark `<main>` envolvendo o conteúdo principal da aplicação.

### Modified Capabilities
<!-- nenhuma -->

## Impact

- `src/index.html` — `lang` e `<meta name="description">`.
- `src/app/app.ts` — template inline ganha `<main>` em torno do `<router-outlet>`.
- `src/app/app.html` — removido (placeholder morto).
- (Opcional) `src/app/app.routes.ts` e telas pesadas — lazy-load, em fase futura.
- Apenas frontend; sem mudança de API ou modelo de dados.

## Context

- Frontend: `StockDetailsModalComponent` é hoje um overlay (`.overlay` fixo) aberto pelo `DashboardComponent` via `selectedStock` signal e renderizado fora do `<main>`. A aba `portfolio` mostra `.section-header` + `.stocks-grid`.
- Backend Go (`carteira-inteligente-api`): `transaction_handler.respondPositions` chama `scraper.FetchIndicators` (Status Invest) concorrentemente por ticker. O scraper `investidor10.go` já busca a página `https://investidor10.com.br/acoes/{ticker}/` (e `/fiis/`) e faz parse de HTML com `golang.org/x/net/html`.

## Goals / Non-Goals

**Goals:**
- Detalhe da ação como tela in-page (sem modal), com "Voltar".
- Indicadores fundamentalistas vindos do Investidor10.

**Non-Goals:**
- Introduzir Angular Router (o app usa navegação por abas; a tela in-page é alternância de conteúdo dentro da aba).
- Mudar os campos de indicadores expostos (P/L, P/VP, DY, ROE, Payout).

## Decisions

**1. Detalhe in-page (frontend).** Converter o componente de detalhes de overlay para uma seção comum: remover `.overlay`/posição fixa e `onOverlayClick`; manter `@Input() stock` e `@Output() close` (usado pelo "Voltar"). No `DashboardComponent`, na aba `portfolio`, renderizar condicionalmente: quando `selectedStock()` existe, mostrar a tela de detalhes no lugar de `.section-header` + `.stocks-grid`; caso contrário, a lista. Adicionar botão "← Voltar" que faz `selectedStock.set(null)`. Renomear de `stock-details-modal` para `stock-details` (opcional; pode-se manter o nome e apenas ajustar template/estilos para reduzir o diff).

**2. Indicadores via Investidor10 (backend Go).** Estender `investidor10.go` com `FetchIndicators(ticker string, fii bool) (*domain.StockIndicators, error)`: baixa a página do ticker (acao/fii) e extrai os indicadores fundamentalistas dos blocos de "indicadores" (cards com rótulo + valor), reaproveitando os helpers de HTML (`nodeText`, busca por nós). Mapear: P/L, P/VP, DY, ROE, Payout → `domain.StockIndicators` (parse de número BR). Em `transaction_handler.respondPositions`, trocar `scraper.FetchIndicators(p.Ticker)` por `scraper.FetchIndicators(p.Ticker, fii)` do Investidor10. Remover `statusinvest.go` (sem uso). É best-effort: falha retorna nil e os detalhes seguem sem indicadores.

## Risks / Trade-offs

- [Parsing de indicadores do Investidor10 depende do HTML atual] → best-effort, robusto a falha (nil); validar contra a página real e ajustar seletores se necessário.
- [Renomear o componente gera diff maior] → opcional; manter o nome atual reduz o risco e o esforço.
- [Tela in-page sem rota não tem deep-link/voltar do navegador] → aceitável; consistente com a navegação por abas já existente.

## Why

Vários ajustes de responsividade mobile ficaram pendentes: o menu principal e os menus de Dividendos quebram/rolam, os chips de anos do Histórico quebram em mais de uma linha, os cards de Minhas Ações não têm contagem fixa no mobile, e a tela de Lançamentos não mostra skeleton durante o carregamento.

## What Changes

- **Menu principal (tab-nav):** caber em **1 linha** no mobile, encolhendo padding/fonte/ícones e se adaptando a telas menores e maiores (sem depender de scroll).
- **Minhas Ações:** **2 cards por linha** no mobile (grid fixo de 2 colunas em telas estreitas).
- **Lançamentos:** adicionar **skeleton** nas **3 seções** (Ações/FIIs/ETFs) enquanto a carteira carrega (`TransactionService.loading`).
- **Menus de Dividendos (sub-tabs):** caber em **1 linha** no mobile (sem `flex-wrap`; encolher e/ou rolar horizontalmente).
- **Anos do Histórico (chips):** os **5 anos + Todos** cabem em **1 linha** no mobile (sem `flex-wrap`; chips menores, com rolagem se necessário).

## Capabilities

### Added Capabilities
- `responsivo-mobile-menus-cards`: ajustes de layout mobile (menus em 1 linha, 2 cards/linha, skeleton de Lançamentos, chips de anos em 1 linha).

## Impact

**Frontend (este repo):**
- `dashboard.scss` — `.tab-nav` compacto em 1 linha; `.stocks-grid` 2 colunas no mobile.
- `my-assets.{html,ts,scss}` — skeleton por seção usando `svc.loading()`.
- `dividends.scss` — `.dv-tabs` em 1 linha no mobile.
- `dividend-history.scss` — `.dh-years` em 1 linha no mobile.

Sem backend.

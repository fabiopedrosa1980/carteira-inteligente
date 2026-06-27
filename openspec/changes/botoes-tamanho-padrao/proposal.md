## Why

Os botões só de ícone têm tamanhos diferentes em cada tela: o `.icon-btn` do cabeçalho é 36×36 (raio 9, ícone 18), mas os de ação em linha (editar/excluir em Metas e Meus Ativos) são 30×30 (raio 6, ícone 16), e os de fechar modal são 36×36 — cada um com sua própria escala no mobile. Isso deixa a interface inconsistente entre web e mobile.

## What Changes

- Definir **um único tamanho padrão** para todos os botões de ícone: **34×34 no desktop** e **32×32 no mobile (≤600px)**, com **raio 8** e **ícone 18px**, idênticos em qualquer contexto.
- Centralizar esses valores em **tokens CSS globais** (`--icon-btn-size`, `--icon-btn-radius`, `--icon-btn-icon`) em `styles.scss`, com a redução do mobile definida **uma única vez**.
- Aplicar os tokens aos botões de ícone existentes: cabeçalho (`.icon-btn`), fechar modal (`.close-btn` dos 3 modais), e ações em linha (`.icon-btn` de Metas, `.btn-edit`/`.btn-remove` de Meus Ativos).
- Mantém-se o estilo contextual (com/sem borda e fundo) de cada botão — só o **tamanho/raio/ícone** é padronizado.
- **Fora de escopo:** botões de paginação (`.pag-btn`) e botões com texto (Adicionar/Salvar/etc.).

## Capabilities

### New Capabilities
- `botoes-icone-tamanho-padrao`: tamanho único e consistente dos botões de ícone (web e mobile), via tokens CSS.

### Modified Capabilities
<!-- Nenhuma capability de spec existente trata do tamanho desses botões. -->

## Impact

- **Frontend (SCSS):** `src/styles.scss` (novos tokens + media query única); `dashboard.scss`, `goals.scss`, `my-assets.scss`, e os 3 modais (`add-stock-modal`, `add-transaction-modal`, `confirm-dialog`).
- **Sem** mudança de comportamento, dados ou HTML — apenas tamanhos via CSS.
- Linhas com ações de editar/excluir podem ficar ~2–4px mais altas (botões passam de 30 para 34).

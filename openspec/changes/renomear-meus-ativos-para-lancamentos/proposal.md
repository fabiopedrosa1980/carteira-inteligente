## Why

O menu "Meus Ativos" na verdade lista os lançamentos (compras/vendas) por classe — "Lançamentos" descreve melhor a tela. E nos acordeões os títulos repetem "Lançamentos de …" (redundante com o nome da tela) e ainda têm um ícone antes do rótulo, poluindo o cabeçalho.

## What Changes

- Renomear o **menu/aba "Meus Ativos" para "Lançamentos"** (e, por consistência, o título da própria tela).
- Nos **acordeões**, encurtar os títulos removendo "Lançamentos de ": "Lançamentos de Ações" → **Ações**, FIIs, ETFs.
- **Remover o ícone** antes do rótulo no cabeçalho de cada acordeão.
- Atualizar referências textuais a "aba Meus Ativos" para "aba Lançamentos".

## Capabilities

### New Capabilities
- `lancamentos-screen`: nomenclatura da tela de Lançamentos e dos cabeçalhos de acordeão.

### Modified Capabilities
<!-- Nenhuma capability de requisito existente (não arquivada) é alterada. -->

## Impact

**Frontend (este repo):**
- `src/app/components/dashboard/dashboard.ts` — label da aba `meus-ativos`.
- `src/app/components/dashboard/dashboard.html` — referências "aba Meus Ativos".
- `src/app/components/my-assets/my-assets.{ts,html,scss}` — título da tela, rótulos das seções, remoção do ícone (`sec-icon`/`iconPath`).

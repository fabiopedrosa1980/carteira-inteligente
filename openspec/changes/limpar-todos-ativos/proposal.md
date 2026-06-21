## Why

Hoje, para esvaziar a carteira, o usuário precisa excluir cada lançamento individualmente — tedioso quando há muitos registros (ex.: ao recomeçar um teste ou refazer a carteira). Além disso, a incompatibilidade entre ticker e tipo só aparece ao tentar salvar, e o total por tipo no acordeão de Lançamentos fica deslocado para a direita, prejudicando a leitura na web.

## What Changes

- Novo endpoint na API Go para **remover todos os lançamentos** de uma vez (`DELETE /api/v1/transactions`).
- Novo botão **"Limpar tudo"** no cabeçalho da tela de Lançamentos, que dispara a **mesma confirmação de exclusão** já usada nas remoções individuais (`ConfirmService`) antes de apagar.
- Após a limpeza, a carteira e os dados derivados são recarregados (mesmo fluxo de `forceReload`) e uma notificação de sucesso é exibida.
- O modal de lançamento passa a **sinalizar com texto, em tempo real**, quando o ticker digitado não condiz com o tipo selecionado (ex.: "Ticker é de Ações, não condiz com FIIs"), sem esperar o clique em salvar.
- No acordeão de Lançamentos (web/desktop), o **total do tipo passa a ficar centralizado** no cabeçalho, em vez de encostado à direita junto ao chevron.

## Capabilities

### New Capabilities
- `limpar-lancamentos`: remoção em massa de todos os lançamentos via API Go e botão na tela de Lançamentos, com confirmação de exclusão e recarga dos dados.
- `acordeao-total-centralizado`: centralização do total por tipo no cabeçalho do acordeão de Lançamentos na visão web.

### Modified Capabilities
- `lancamento-ticker-valida-tipo`: além de bloquear o salvamento, a incompatibilidade ticker×tipo MUST ser sinalizada por texto em tempo real enquanto o usuário preenche o formulário.

## Impact

- **API Go (repositório separado, `carteira-inteligente-api.onrender.com`)**: novo handler/rota `DELETE /api/v1/transactions` que apaga todos os lançamentos do usuário.
- **Frontend Angular**:
  - `BackendApiService` — novo método `deleteAllTransactions()`.
  - `TransactionService` — novo método `clearAll()` que chama a API, limpa o signal e notifica.
  - `MyAssetsComponent` (tela de Lançamentos) — botão "Limpar tudo" no header + handler com `ConfirmService` e `forceReload`.
  - `my-assets.html` / `my-assets.scss` — botão no header e layout do total centralizado no acordeão.
  - `AddTransactionModalComponent` + `add-transaction-modal.html` — texto de aviso ticker×tipo em tempo real.

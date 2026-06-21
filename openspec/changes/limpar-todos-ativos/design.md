## Context

A tela de Lançamentos (`MyAssetsComponent`) lista os lançamentos em acordeões por tipo (Ações, FIIs, ETFs), com exclusão individual via `ConfirmService` + `TransactionService.remove()` + `forceReload()`. A persistência fica numa **API Go separada** (`carteira-inteligente-api.onrender.com`), acessada pelo `BackendApiService`. Não há, hoje, forma de esvaziar a carteira de uma vez. Além disso, a validação ticker×tipo (`AddTransactionModalComponent`) só roda no `save()`, e o total por tipo no cabeçalho do acordeão fica encostado à direita junto ao chevron.

## Goals / Non-Goals

**Goals:**
- Permitir remover todos os lançamentos em uma única ação, reutilizando o fluxo de confirmação existente.
- Reaproveitar `forceReload()` para manter carteira e dados derivados consistentes após a limpeza.
- Sinalizar a incompatibilidade ticker×tipo em tempo real no modal, reusando `detectAssetType`/`assetTypeLabel`.
- Centralizar o total por tipo no cabeçalho do acordeão na visão web.

**Non-Goals:**
- Não há limpeza seletiva por tipo (só "tudo"); recurso por seção fica fora de escopo.
- Não muda a heurística de detecção de tipo nem as regras de bloqueio de salvamento já existentes.
- Não altera autenticação/escopo por usuário além do que a API Go já aplica.

## Decisions

- **Endpoint `DELETE /api/v1/transactions` (sem id) para limpar tudo.** Segue o padrão REST já usado (`DELETE /transactions/:id` para item único). Idempotente: retorna sucesso mesmo com carteira vazia. Alternativa considerada: `POST /transactions/clear` — descartada por fugir da convenção REST existente.
- **`TransactionService.clearAll()` espelha `remove()`.** Chama `api.deleteAllTransactions()`, no sucesso faz `this._transactions.set([])` e `notifications.show('Lançamentos removidos com sucesso')`. Mantém o estado em signal coerente com o backend.
- **Botão "Limpar tudo" no header de `MyAssetsComponent`, com `ConfirmService`.** Handler `clearAll()` chama `confirmService.confirm({ title: 'Limpar tudo', message: 'Deseja realmente excluir TODOS os lançamentos?', confirmLabel: 'Limpar tudo' })`; ao confirmar, `svc.clearAll()` + `forceReload()`. Visível apenas quando `svc.transactions().length > 0`. Reaproveita exatamente o mesmo componente de confirmação das exclusões individuais (requisito do usuário).
- **Aviso ticker×tipo em tempo real via getter computado.** Novo getter `tickerTypeMismatch` no modal retorna a mensagem quando `detectAssetType(ticker)` existe e difere de `form.assetType` (tolerando FII×ETF, ignorando sufixo desconhecido) — mesma lógica do `save()`. Exibido como `quote-hint not-found`/`field-warning` abaixo do campo de ticker, sem bloquear digitação. O `save()` mantém o bloqueio atual como rede de segurança.
- **Total centralizado via layout de 3 zonas no cabeçalho.** Em `my-assets.scss`, o `.accordion-header` passa a posicionar `.sec-total` no centro (ex.: grid de 3 colunas ou `position` central), com `ah-left` à esquerda e chevron à direita, aplicado na largura web (consistente com os breakpoints já usados no arquivo).

## Risks / Trade-offs

- **A API Go está em repositório separado** → o endpoint precisa ser implementado e publicado lá; até então o botão chamará uma rota inexistente. Mitigação: tasks separam claramente o trabalho de backend; validar contra o ambiente antes de habilitar.
- **Ação destrutiva e irreversível** → mitigação: confirmação obrigatória com texto explícito de que remove "todos" os lançamentos.
- **Centralizar o total pode conflitar com o layout mobile existente** → mitigação: aplicar a centralização apenas no breakpoint web, preservando o comportamento mobile atual.

## Migration Plan

1. Implementar e publicar o handler `DELETE /api/v1/transactions` na API Go.
2. Adicionar método no `BackendApiService` e `clearAll()` no `TransactionService`.
3. Adicionar botão + handler no `MyAssetsComponent` e ajustar o header.
4. Ajustar o SCSS do acordeão para centralizar o total na web.
5. Adicionar o aviso ticker×tipo em tempo real no modal.
- **Rollback**: remover o botão/handler do frontend desabilita o uso; o endpoint pode permanecer inerte sem impacto.

## Open Questions

- Confirmar o repositório/local da API Go para implementar o handler (assumido: mesmo serviço Render já em uso).

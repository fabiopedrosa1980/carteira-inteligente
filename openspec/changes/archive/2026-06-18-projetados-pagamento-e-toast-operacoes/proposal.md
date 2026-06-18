## Por que

Duas melhorias: (1) os Dividendos Projetados hoje filtram pela data-com (`ex_date`) futura, mas o usuário quer alinhar com os Recebidos usando a **data de pagamento** — assim Recebidos e Projetados se complementam pela mesma régua de data. (2) As mensagens de resultado de operações aparecem como banners fixos dentro de cada tela; o usuário quer um componente único, estilo modal, que **feche automaticamente**.

## O que muda

- **Dividendos Projetados**: passar a considerar proventos do ano corrente cuja **data de pagamento (`pay_date`) ainda não ocorreu** (a partir de hoje), em vez de filtrar pela data-com. Recebidos = `pay_date` anterior a hoje; Projetados = `pay_date` de hoje em diante — sem lacuna nem sobreposição.
- **Mensagens de operação**: substituir os banners inline de feedback (Meus Ativos e Metas) por um **componente toast/modal global** que exibe a mensagem sobre a tela e **fecha sozinho** após alguns segundos (com opção de fechar manualmente).
- Centralizar as notificações em um serviço único, consumido pelos serviços de transações e metas.

## Capabilities

### Novas capabilities
- `notificacoes-operacao`: componente global de notificação (toast/modal) que exibe o resultado de operações e fecha automaticamente.

### Capabilities modificadas
- `dividendos-recebidos-projetados`: Projetados passam a filtrar por data de pagamento futura (em vez de data-com).

## Impacto

- Front-end (Angular), repositório `carteira-inteligente`. Sem alteração de backend.
- `DividendsSummaryComponent` (`.ts`): ajuste de `computeProjected` para `pay_date >= hoje`.
- Novo `NotificationService` + `ToastComponent` global (montado na raiz `App`).
- `TransactionService` e `MetasService`: passam a usar o `NotificationService` (remoção dos signals de feedback próprios).
- `my-assets` e `goals`: remoção dos banners inline de feedback.

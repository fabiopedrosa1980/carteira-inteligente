## Contexto

**Projetados:** `DividendsSummaryComponent.computeProjected` hoje filtra proventos do ano corrente com `ex_date > hoje`. Recebidos usa `pay_date < hoje`. O usuário quer alinhar Projetados à data de pagamento.

**Feedback:** hoje o resultado de operações usa signals `feedback` em `TransactionService` e `MetasService`, exibidos como banners inline em `my-assets.html` e `goals.html`. O `App` raiz renderiza apenas `<router-outlet>`.

Os proventos (`ApiDividend`) têm `amount`, `month`, `year`, `ex_date`, `pay_date` e `type` (Dividendo/JCP). Os cálculos somam todos os tipos (Dividendo e JCP).

## Goals / Non-Goals

**Goals:**
- Projetados por `pay_date` futuro (a partir de hoje), complementando Recebidos sem lacuna.
- Notificação de operação única, global, estilo toast/modal, que fecha sozinha.

**Non-Goals:**
- Alterar Recebidos (continua `pay_date < hoje`) ou o detalhamento mensal.
- Filtrar por tipo de provento (Dividendo/JCP seguem somados).
- Backend.

## Decisões

### 1. Projetados por data de pagamento
Em `computeProjected`, trocar o filtro `ex_date > hoje` por `pay_date >= hoje` (mantendo ano corrente e multiplicação por cotas atuais). Usar `>=` torna Recebidos (`pay_date < hoje`) e Projetados (`pay_date >= hoje`) complementares e sem sobreposição, eliminando o estado "aguardando pagamento" que existia ao misturar data-com e pagamento. Proventos sem `pay_date` não entram.
- *Alternativa*: `pay_date > hoje` (estrito). Rejeitada para não deixar os pagamentos de hoje fora das duas abas.

### 2. Serviço de notificação central
Criar `NotificationService` (`providedIn: 'root'`) com `signal<string | null>` da mensagem atual e `show(message: string)` que define a mensagem e agenda o fechamento automático (ex.: 3,5 s) via `setTimeout`, além de `dismiss()`. Um único timer reiniciado a cada `show`.

### 3. Componente global `ToastComponent`
Criar `ToastComponent` (`app-toast`, standalone) que lê o `NotificationService`, renderiza um cartão sobreposto (estilo toast/modal — posição fixa, animação de entrada/saída) quando há mensagem, com botão de fechar. Montar `<app-toast>` uma única vez no template do `App` raiz, ao lado do `<router-outlet>`, para sobrepor todas as telas. O cartão deve ser **compacto** e o texto da mensagem **pequeno** (fonte ~12px, largura máxima contida), conforme pedido do usuário — menor que os banners inline atuais.
- *Alternativa*: modal central com overlay bloqueante. Rejeitada — feedback de operação não deve bloquear a interação; toast fixo (canto) que some sozinho é mais adequado. Mantém aparência de "modal/cartão" sem overlay modal.

### 4. Refatorar serviços de domínio
`TransactionService` e `MetasService` passam a chamar `notification.show(msg)` no sucesso de criar/editar/excluir, removendo seus próprios signals `feedback`/`setFeedback`/`clearFeedback`. Remover os banners inline e o estado de feedback em `my-assets` e `goals` (incluindo o acesso `feedback`/`clearFeedback` em `goals.ts`).

## Riscos / Trade-offs

- [Mensagens em sequência rápida] → cada `show` reinicia o timer e substitui a mensagem; aceitável para feedback de operação (não há fila).
- [Posição fixa sobre conteúdo] → usar `z-index` alto e margem segura; toast não bloqueia cliques fora dele.

## Plano de Migração

1. Ajustar `computeProjected` e o subtítulo da aba.
2. Criar `NotificationService` e `ToastComponent`; montar no `App`.
3. Refatorar `TransactionService`/`MetasService` e remover banners de `my-assets`/`goals`.
4. `ng build` e validação visual.
5. Rollback: reverter o commit; mudança apenas de front.

## Questões em Aberto

- Nenhuma. Projetados por `pay_date >= hoje`; notificação toast global com auto-fechamento.

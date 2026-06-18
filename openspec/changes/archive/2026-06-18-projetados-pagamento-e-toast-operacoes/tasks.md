## 1. Projetados por data de pagamento

- [x] 1.1 Em `computeProjected`, trocar o filtro de `ex_date > hoje` por `pay_date >= todayStr` (mantendo ano corrente e cotas atuais)
- [x] 1.2 Ignorar proventos sem `pay_date` em Projetados
- [x] 1.3 Atualizar o subtítulo da aba Projetados (proventos a receber por data de pagamento)

## 2. Serviço de notificação

- [x] 2.1 Criar `NotificationService` (`providedIn: 'root'`) com signal de mensagem, `show(message)` com auto-fechamento (~3,5s) e `dismiss()`

## 3. Componente toast global

- [x] 3.1 Criar `ToastComponent` (`app-toast`) que exibe a mensagem do `NotificationService` em cartão sobreposto, com botão de fechar e animação
- [x] 3.1a Manter o cartão compacto e o texto pequeno (~12px, largura contida) — mensagens menores que os banners atuais
- [x] 3.2 Montar `<app-toast>` no template do `App` raiz (ao lado do `<router-outlet>`)

## 4. Refatorar feedback existente

- [x] 4.1 `TransactionService`: usar `NotificationService.show()` em criar/editar/excluir; remover signal `feedback`/`setFeedback`/`clearFeedback`
- [x] 4.2 `MetasService`: idem para criar/editar/excluir meta
- [x] 4.3 Remover o banner inline e referências a `feedback` em `my-assets.html`/(`.scss`)
- [x] 4.4 Remover o banner inline e `feedback`/`clearFeedback` em `goals.html`/`goals.ts`/(`.scss`)

## 5. Verificação

- [x] 5.1 `npx ng build` sem erros
- [x] 5.2 Validar: toast aparece em operações nas duas telas e fecha sozinho; Projetados refletem `pay_date` futuro
- [x] 5.3 `npx prettier --write` nos arquivos alterados
- [x] 5.4 Commit e push seguindo Conventional Commits

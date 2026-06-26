## 1. Estado global de privacidade

- [x] 1.1 Criar `ValueVisibilityService` (`hidden` signal init de `localStorage['ci-hide-values']`, `toggle()`, persistência)
- [x] 1.2 `DashboardComponent`: delegar `valoresOcultos`/`toggleValores` ao serviço (manter a mesma chave de storage)

## 2. Controle no menu superior

- [x] 2.1 Mover o botão de olho do header da seção "Meus Ativos" para `header-actions`, logo após `.user-chip`
- [x] 2.2 Remover o botão de olho antigo do cabeçalho de Meus Ativos
- [x] 2.3 Ícone/título refletem o estado (ocultar ↔ exibir), reusando `.icon-btn`

## 3. Mascarar totais em todas as telas

- [x] 3.1 Meus Ativos: confirmar que patrimônio/saldos/totais por grupo respeitam o estado global
- [x] 3.2 Lançamentos: confirmar total investido + totais por seção
- [x] 3.3 Dividendos: injetar o serviço e mascarar os totais R$ (recebidos/projetados/mensais)
- [x] 3.4 Metas: injetar o serviço e mascarar os valores R$ (mantendo % de progresso visível)
- [x] 3.5 Garantir que percentuais e contagens permanecem visíveis em todas as telas

## 4. Mensagem ao editar a distribuição

- [x] 4.1 `allocation-card`: injetar `NotificationService` e chamar `show('Distribuição alterada com sucesso')` em `saveEdit()`
- [x] 4.2 Confirmar que cancelar a edição não exibe mensagem

## 5. Verificação

- [ ] 5.1 Ligar a privacidade e percorrer as 4 telas: todos os totais R$ ocultos; % e contagens visíveis
- [ ] 5.2 Recarregar o app: estado de privacidade persiste
- [ ] 5.3 Editar a distribuição: toast de sucesso aparece
- [x] 5.4 `npx prettier --write` nos arquivos alterados e `ng build` sem erros

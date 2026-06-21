## 1. Fechar sugestões ao clicar fora

- [x] 1.1 Em `add-transaction-modal.ts`, adicionar `@HostListener('document:click', ['$event'])` que, havendo sugestões abertas, limpa `suggestions` quando o alvo não estiver dentro de `.ticker-wrapper` (via `closest`)
- [x] 1.2 Garantir que selecionar sugestão (`selectSuggestion`) e clicar no campo de ticker continuam funcionando (sem fechar indevidamente)

## 2. Verificação

- [x] 2.1 Abrir o modal, digitar para abrir sugestões e clicar fora → lista fecha, modal segue aberto e ticker preservado
- [x] 2.2 Confirmar que clicar numa sugestão ainda a aplica e que clicar no campo mantém a lista
- [x] 2.3 Rodar `npx prettier --write` no arquivo alterado e `ng build`

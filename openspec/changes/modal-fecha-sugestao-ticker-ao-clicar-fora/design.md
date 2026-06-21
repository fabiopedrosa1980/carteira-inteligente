## Context

`AddTransactionModalComponent` exibe o autocomplete como `<ul class="ticker-suggestions">` dentro de `<div class="ticker-wrapper">`, alimentado pelo signal `suggestions()`. A lista é limpa em `selectSuggestion()` e quando o ticker fica com menos de 3 caracteres em `onTickerChange()`. Não há tratamento para clique fora. O componente já usa `@HostListener('document:keydown.escape')` para fechar o modal.

## Goals / Non-Goals

**Goals:**
- Fechar a lista de sugestões ao clicar fora do campo/lista, mantendo o modal aberto.
- Preservar seleção de sugestão, digitação e o ticker já preenchido.

**Non-Goals:**
- Não alterar o fechamento do modal (Esc / clique na overlay).
- Não mexer no autocomplete do `add-stock-modal` (que não tem lista de sugestões).
- Não introduzir navegação por teclado nas sugestões.

## Decisions

- **`@HostListener('document:click', ['$event'])` com teste de `closest('.ticker-wrapper')`.** O handler só age quando há sugestões abertas; se o alvo do clique não estiver dentro de `.ticker-wrapper`, limpa `suggestions`. Como as `<li>` de sugestão e o input ficam dentro do wrapper, cliques neles não disparam o fechamento por aqui — a seleção segue por `selectSuggestion()`, que já limpa a lista.
  - Alternativa considerada: usar `(blur)` no input — descartada porque o blur dispara antes do `click` da sugestão, exigindo workarounds de timing; e o pedido é "ao clicar em qualquer lugar da tela".
- **Identificar o wrapper pela classe existente `.ticker-wrapper`** via `(event.target as HTMLElement).closest('.ticker-wrapper')`, evitando `ElementRef`/refs adicionais e mantendo a mudança mínima.

## Risks / Trade-offs

- [Ordem entre `document:click` e o `(click)` da sugestão] → Mitigação: o teste por `closest('.ticker-wrapper')` faz o handler ignorar cliques dentro do wrapper (incluindo as sugestões), então a seleção não é perdida.
- [Listener global no documento] → Mitigação: custo desprezível (só limpa um signal) e o componente é efêmero (existe apenas enquanto o modal está aberto); o Angular remove o `@HostListener` ao destruir o componente.

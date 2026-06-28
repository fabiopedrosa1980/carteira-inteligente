## Context

Em `stock-details-modal.html`, o ícone "i" de cada indicador é um `<span class="i-info">` com `[title]="describe(ind.label)"`. O atributo `title` é um tooltip nativo do navegador, exibido apenas no **hover do mouse** — inexistente em touch. Logo, no mobile não há como ver a descrição.

Restrição de layout: `.details-panel { overflow: hidden }` (para o `border-radius`). Um popover posicionado de forma absoluta dentro de `.indicator` seria **cortado** ao ultrapassar a borda do painel. Os cards de indicador ficam em grid de 2 colunas no mobile (`≤600px`), 3 em `≤900px`, 4 acima — portanto pouca largura por card.

O componente hoje usa `@Input`/getters (sem signals), mas o projeto adota a API de signals; é aceitável introduzir um `signal` para o estado de UI.

## Goals / Non-Goals

**Goals:**
- Mostrar a descrição do indicador ao **tocar** no "i" no mobile.
- Não regredir o hover no desktop.
- Controle acessível (foco por teclado, `aria-label`/`aria-expanded`).
- Solução que não seja cortada pelo `overflow: hidden` do painel.

**Non-Goals:**
- Reescrever o mapa de descrições (`DESCRIPTIONS`) — permanece como está.
- Criar um componente de tooltip genérico/reutilizável para o app inteiro.
- Mudar a fonte de dados dos indicadores.

## Decisions

### Decisão: tornar o "i" um botão que alterna uma descrição inline no card

Converter `.i-info` de `<span>` para `<button type="button" class="i-info">` com `(click)="toggleInfo(i, $event)"`, `[attr.aria-label]` e `[attr.aria-expanded]`. Ao ativar, exibir a descrição como um **bloco inline dentro do próprio `.indicator`** (`<p class="i-desc">`), abaixo do valor.

Por que inline (e não popover absoluto): o `.indicator` é um flex column; o bloco inline ocupa a largura total do card e **nunca é cortado** pelo `overflow: hidden` do painel, em qualquer breakpoint. Um popover absoluto exigiria alterar o overflow do painel (quebrando o arredondamento) ou cálculo de posição fixa.

Estado: `openInfo = signal<number | null>(null)` (índice do indicador aberto). `*ngFor` passa a expor `let i = index`. `toggleInfo(i, ev)` faz `ev.stopPropagation()` e alterna `openInfo` (mesmo índice → fecha; outro → troca). Assim só uma descrição fica aberta por vez.

Fechamento: `@HostListener('document:click')` zera `openInfo` (clique fora). O Esc existente passa a fechar a descrição aberta primeiro; se nenhuma estiver aberta, fecha o modal (mantém o comportamento atual).

Hover no desktop: manter o `[title]` no botão como conveniência (tooltip nativo no hover) — o tap inline funciona em todos os tamanhos, e o `title` não conflita.

**Alternativa considerada — popover absoluto ancorado ao "i":** rejeitada. Seria cortado pelo `.details-panel { overflow: hidden }`; corrigir exigiria mexer no overflow/arredondamento ou em posicionamento fixo com cálculo de coordenadas.

**Alternativa considerada — só trocar `title` por uma lib de tooltip:** rejeitada. Adiciona dependência e ainda precisaria de tratamento touch; o inline resolve com CSS/markup mínimos.

### Decisão: estilo do bloco de descrição

`.i-desc`: fonte pequena (~11–12px), `color: var(--text-secondary)`, `line-height` confortável, margem superior pequena, largura total do card, com leve separação visual (ex.: borda-topo sutil). O botão `.i-info` mantém tamanho atual do svg (13px), `cursor: pointer`, foco visível.

## Risks / Trade-offs

- [Abrir uma descrição aumenta a altura da linha do grid (cards da mesma linha acompanham)] → Aceitável; é o comportamento esperado de um "expandir" e some ao fechar.
- [`document:click` fechar antes de abrir] → Mitigado com `stopPropagation()` no toggle; o handler global só fecha cliques fora.
- [Regressão de acessibilidade] → Mitigado com `aria-label`, `aria-expanded` e botão focável por teclado.

## Migration Plan

Mudança apenas de frontend; sem migração de dados. Deploy normal. Rollback = reverter o commit do componente.

## Open Questions

- Manter o `title` nativo no desktop além do inline, ou usar apenas o inline em todos os tamanhos? Decisão atual: manter o `title` (sem custo); ajustável se gerar tooltip duplicado indesejado.

## 1. Botão "+" no cabeçalho da seção (Lançamentos)

- [x] 1.1 Em `my-assets.html`, adicionar no `.ah-right` (antes do `.chevron`) um elemento clicável `<span class="btn-add-sec" role="button" tabindex="0">` com o ícone "+" (`M12 5v14M5 12h14`), `title`/`aria-label` "Adicionar lançamento de {{ sec.label }}".
- [x] 1.2 Ligar o handler: `(click)="openAdd(sec.id); $event.stopPropagation()"` e `(keydown.enter)`/`(keydown.space)` equivalentes, garantindo `$event.stopPropagation()` para não alternar o acordeão.
- [x] 1.3 Em `my-assets.scss`, criar `.btn-add-sec` reaproveitando a linguagem de `.btn-add-inline` (ícone com `--accent` no hover, `focus-visible` visível, alvo ≥30px), alinhado verticalmente no `.ah-right`.
- [x] 1.4 Manter o botão "Adicionar" do rodapé (`.add-row > .btn-add-inline`) inalterado.

## 2. Posicionamento dos botões no mobile (Lançamentos)

- [x] 2.1 Em `my-assets.scss`, no `@media (max-width: 600px)`, reduzir o `gap` do `.ah-right` para acomodar "+" + total + chevron sem rolagem horizontal; validar com ticker/total longos.
- [x] 2.2 Conferir/garantir alvo de toque ≥30px para `.btn-add-sec`, `.btn-edit`, `.btn-remove` e `.pag-btn` no mobile.
- [x] 2.3 Conferir o `.btn-clear-all` no header empilhado (`.page-header` em ≤600px) — largura confortável e centralizado (regra `justify-content: center` já existente).

## 3. Radar — tags de destaque ícone-only no mobile

- [x] 3.1 Em `dividends-radar.html`, envolver o texto das tags `.rc-tag-top` ("Melhor mês") e `.rc-tag-next` ("Oportunidade") em `<span class="rc-tag-text">…</span>`.
- [x] 3.2 Adicionar `title`/`aria-label` com o texto completo em cada tag (`.rc-tag-top` / `.rc-tag-next`) para preservar o rótulo acessível quando ícone-only.
- [x] 3.3 Em `dividends-radar.scss`, no `@media (max-width: 600px)`, aplicar `display: none` em `.rc-tag-text`, mantendo o `svg` visível; ajustar padding/gap da tag para ficar compacta (ícone-only).

## 4. Ocultar valores (botão olho) na aba "Meus Ativos"

- [x] 4.1 Em `dashboard.ts`, adicionar `valoresOcultos = signal<boolean>` inicializado por `localStorage` (chave `ci-hide-values`) e método `toggleValores()` que persiste a preferência (padrão: visível).
- [x] 4.2 Em `dashboard.html`, no `.section-header` da aba portfolio, adicionar um botão olho (`.icon-btn`) à direita do título "Meus Ativos", alternando ícone "olho cortado" (ocultar) / "olho" (exibir) por `*ngIf="valoresOcultos()"`, com `title`/`aria-label` coerentes.
- [x] 4.3 Em `dashboard.html`, aplicar `[class.values-hidden]="valoresOcultos()"` no contêiner `.portfolio-summary`.
- [x] 4.4 Em `dashboard.scss`, estilizar `.values-hidden .ps-card-value { filter: blur(8px); user-select: none; }` (mantendo rótulos/ícones visíveis) e ajustar o `.section-header` para alinhar o botão olho à direita (space-between).

## 5. Validação

- [x] 5.1 `npx prettier --write` nos arquivos alterados.
- [x] 5.2 `ng build` sem erros.
- [x] 5.3 Verificar manualmente em ≤600px: botão "+" funciona com a seção recolhida (sem alternar), tipo pré-selecionado correto, sem rolagem horizontal; tags do Radar exibem só o ícone.
- [x] 5.4 Verificar em > 600px: cabeçalho com "+" alinhado, rodapé "Adicionar" presente, tags do Radar com ícone + texto.
- [x] 5.5 Verificar o botão olho: oculta/exibe os valores dos cards de resumo, ícone alterna corretamente, layout preservado, e a preferência persiste após recarregar.

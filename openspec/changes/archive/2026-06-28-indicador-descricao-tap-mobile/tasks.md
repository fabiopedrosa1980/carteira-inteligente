## 1. Estado e lógica (TS)

- [x] 1.1 Em `stock-details-modal.ts`, importar `signal` e adicionar `openInfo = signal<number | null>(null)`.
- [x] 1.2 Adicionar `toggleInfo(index: number, ev: Event)`: `ev.stopPropagation()`, alterna `openInfo` (mesmo índice → `null`; outro → `index`).
- [x] 1.3 Adicionar `@HostListener('document:click')` para fechar a descrição aberta (`openInfo.set(null)`).
- [x] 1.4 Ajustar `onEscape()`: se `openInfo()` não for `null`, fechar a descrição; caso contrário, emitir `close`.

## 2. Markup (HTML)

- [x] 2.1 No `*ngFor` dos indicadores, expor o índice: `let ind of stock.indicators; let i = index`.
- [x] 2.2 Trocar `<span class="i-info">` por `<button type="button" class="i-info">` com `(click)="toggleInfo(i, $event)"`, `[attr.aria-label]="'Descrição: ' + ind.label"`, `[attr.aria-expanded]="openInfo() === i"` e mantendo `[title]="describe(ind.label)"`.
- [x] 2.3 Adicionar, dentro do `.indicator`, abaixo do valor, `<p class="i-desc" *ngIf="describe(ind.label) && openInfo() === i">{{ describe(ind.label) }}</p>`.

## 3. Estilo (SCSS)

- [x] 3.1 Garantir que `.i-info` como `<button>` zere estilos de botão (background/border/padding) e mantenha o svg 13px, `cursor: pointer`, cor e hover atuais, com `:focus-visible` (outline accent).
- [x] 3.2 Adicionar `.i-desc`: fonte ~11–12px, `color: var(--text-secondary)`, `line-height` confortável, `margin-top`, largura total e leve separação (ex.: `border-top: 1px solid var(--border)` + padding-top).

## 4. Verificação

- [x] 4.1 Build: `npx ng build` compila sem erros.
- [ ] 4.2 Mobile (≤600px): tocar no "i" abre a descrição; tocar de novo/fora ou Esc fecha; abrir outro troca a aberta.
- [ ] 4.3 Desktop: hover mostra a descrição (sem regressão) e o tap também funciona.
- [ ] 4.4 Confirmar que a descrição não é cortada pelos limites do painel em nenhum breakpoint.

<!-- NOTA: validação visual (4.2–4.4) requer login no app (Google Sign-In, indisponível
     em headless), então não pôde ser executada automaticamente. Build compila e a
     lógica é correta por inspeção. Recomenda-se conferência manual no navegador. -->

## 5. Entrega

- [x] 5.1 `npx prettier --write` nos arquivos alterados.
- [x] 5.2 Commit com prefixo `fix:` e push para `main` (stage apenas dos arquivos alterados).

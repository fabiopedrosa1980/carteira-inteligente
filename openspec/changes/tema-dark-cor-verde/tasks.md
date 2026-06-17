## 1. Variáveis de tema

- [x] 1.1 Em `src/styles.scss` (`:root`), alterar `--accent` para `#1a7f4b`
- [x] 1.2 Alterar `--btn-accent-hover` para `#1f9d5e` e `--shadow-hover` para `rgba(26,127,75,0.15)`
- [x] 1.3 Alterar `--btn-accent-text` para `#ffffff` (legibilidade do texto sobre o verde)

## 2. Remover azul fixo dos componentes

- [x] 2.1 `dashboard.scss`: trocar `#63b3ed` e `rgba(99,179,237,…)` por `var(--accent)` / realce verde equivalente
- [x] 2.2 `my-assets.scss`: trocar `rgba(99,179,237,…)` por realce verde equivalente
- [x] 2.3 `dividend-calendar.scss`: trocar `#63b3ed` e `rgba(99,179,237,…)` por variáveis/realce verde
- [x] 2.4 `add-transaction-modal.scss`: trocar `rgba(99,179,237,…)` por realce verde equivalente
- [x] 2.5 Buscar por `#63b3ed`/`99,179,237` em `src/` e garantir que não restou azul fixo

## 3. Remover texto descritivo das seções de Meus Ativos

- [x] 3.1 Remover o campo `hint` do array `sections` em `my-assets.ts`
- [x] 3.2 Remover o elemento `.sec-hint` de `my-assets.html`
- [x] 3.3 Remover a regra `.sec-hint` (e ajustes órfãos) de `my-assets.scss`

## 4. Verificação

- [x] 4.1 `npx ng build` sem erros
- [x] 4.2 Inspeção visual: tema escuro com destaque verde; tema claro inalterado; seções de Meus Ativos sem o texto descritivo
- [x] 4.3 `npx prettier --write` nos arquivos alterados
- [x] 4.4 Commit e push seguindo Conventional Commits

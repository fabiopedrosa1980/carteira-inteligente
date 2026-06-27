## 1. Título e valor

- [x] 1.1 `allocation-card.scss`: `.alloc-title h3` → 15px / peso 700 / `--text-primary` (igual `.sec-label`)
- [x] 1.2 `allocation-card.scss`: `.alloc-total` → 14px / peso 700 / `--accent` / `tabular-nums` (igual `.sec-total`)

## 2. Botões

- [x] 2.1 `.alloc-btn` base → botão verde padrão (fundo `--accent`, texto `--btn-accent-text`, sem borda, 13px/700, raio 9px), com hover `--btn-accent-hover` (Editar e Salvar)
- [x] 2.2 `.alloc-btn.ghost` (Cancelar) → contorno discreto (fundo transparente, borda `--border`, texto `--text-secondary`, hover realça)
- [x] 2.3 Ajustar/limpar o `.solid` (redundante) sem quebrar o Salvar

## 3. Verificação

- [x] 3.1 `npx prettier --write` no SCSS e `ng build` sem erros
- [ ] 3.2 Validar no card de Alocação: título e valor iguais aos da seção; Editar/Salvar verdes; Cancelar secundário; cabeçalho ok em desktop e mobile
- [x] 3.3 Commit e push em `carteira-inteligente`

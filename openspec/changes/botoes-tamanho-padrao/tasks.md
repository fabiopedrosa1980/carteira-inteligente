## 1. Tokens globais

- [x] 1.1 `src/styles.scss`: adicionar `--icon-btn-size: 34px`, `--icon-btn-radius: 8px`, `--icon-btn-icon: 18px` e `@media (max-width: 600px) { :root { --icon-btn-size: 32px } }`

## 2. Aplicar nos botões de ícone

- [x] 2.1 `dashboard.scss` `.icon-btn`: usar tokens; remover width/height/raio fixos e as media queries de tamanho (600/480)
- [x] 2.2 `goals.scss` `.icon-btn`: usar tokens; remover width/height/raio/ícone fixos e o override ≤480
- [x] 2.3 `my-assets.scss` `.btn-edit`/`.btn-remove`: usar tokens (tamanho/raio/ícone)
- [x] 2.4 `add-stock-modal`, `add-transaction-modal`, `confirm-dialog` `.close-btn`: usar tokens (tamanho/raio/ícone), preservando o posicionamento

## 3. Botões de texto (altura única 36/34)

- [x] 3.1 Token de altura ajustado para 36px (web) / 34px (mobile)
- [x] 3.2 Botões primários verdes à altura padrão: `.btn-add-inline` (dashboard, my-assets), `.btn-save` (modais, goals), `.btn-nova`, `.alloc-btn`, `.import-btn`
- [x] 3.3 Botões secundários (contorno) à altura padrão: `.btn-cancel` (modais, goals)
- [x] 3.4 `.btn-clear-all` → destrutivo (vermelho) com a altura padrão
- [x] 3.5 `.import-btn` ganha ícone (igual ao menu Importar) e altura padrão

## 4. Verificação

- [x] 4.1 `npx prettier --write` nos SCSS e `ng build` sem erros
- [ ] 4.2 Validar em desktop e ≤600px: todos os botões (ícone e texto) com a mesma altura; Limpar tudo vermelho; Importar com ícone; nada quebrado
- [x] 4.3 Commit e push em `carteira-inteligente`

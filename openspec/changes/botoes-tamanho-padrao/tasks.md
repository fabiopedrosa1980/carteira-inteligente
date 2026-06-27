## 1. Tokens globais

- [x] 1.1 `src/styles.scss`: adicionar `--icon-btn-size: 34px`, `--icon-btn-radius: 8px`, `--icon-btn-icon: 18px` e `@media (max-width: 600px) { :root { --icon-btn-size: 32px } }`

## 2. Aplicar nos botões de ícone

- [x] 2.1 `dashboard.scss` `.icon-btn`: usar tokens; remover width/height/raio fixos e as media queries de tamanho (600/480)
- [x] 2.2 `goals.scss` `.icon-btn`: usar tokens; remover width/height/raio/ícone fixos e o override ≤480
- [x] 2.3 `my-assets.scss` `.btn-edit`/`.btn-remove`: usar tokens (tamanho/raio/ícone)
- [x] 2.4 `add-stock-modal`, `add-transaction-modal`, `confirm-dialog` `.close-btn`: usar tokens (tamanho/raio/ícone), preservando o posicionamento

## 3. Verificação

- [x] 3.1 `npx prettier --write` nos SCSS e `ng build` sem erros
- [ ] 3.2 Validar em desktop e ≤600px: cabeçalho, fechar modal e editar/excluir com o mesmo tamanho; ícones centralizados; nada quebrado
- [x] 3.3 Commit e push em `carteira-inteligente`

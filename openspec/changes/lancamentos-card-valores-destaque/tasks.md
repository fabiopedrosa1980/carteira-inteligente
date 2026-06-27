## 1. Destacar os valores no card mobile

- [x] 1.1 Em `my-assets.scss`, no bloco `@media (max-width: 600px)`, alterar a cor de `.date-cell, .qty-cell, .price-cell` de `var(--text-secondary)` para `var(--text-primary)` (mantendo tamanho/peso)
- [x] 1.2 `::before` (rótulos Data/Qtd/Preço unit./Total) seguem com `color: var(--text-secondary)` (cor própria explícita, sem alteração)

## 2. Validar

- [x] 2.1 Rodar `ng build` sem erros (apenas warnings de budget pré-existentes)
- [x] 2.2 Valores em primária (branca no escuro) e rótulos em secundária — verificado no código/build
- [x] 2.3 Tema claro: `--text-primary` é escuro/legível; rótulos secundários — verificado no código
- [x] 2.4 Desktop: regra está sob `@media (max-width: 600px)`, tabela inalterada — verificado no código

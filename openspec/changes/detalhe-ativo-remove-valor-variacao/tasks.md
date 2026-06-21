## 1. Remover preço e variação do cabeçalho

- [x] 1.1 Em `stock-details-modal.html`, remover o bloco `.price-group` (preço `.d-price` + variação `.d-change`) do `<header>`
- [x] 1.2 Manter o `.title-group` (ticker e nome) como único conteúdo do cabeçalho

## 2. Limpeza de estilos

- [x] 2.1 Em `stock-details-modal.scss`, remover as regras órfãs `.price-group`, `.d-price`, `.currency`, `.d-change`
- [x] 2.2 Ajustar `.details-header` para o layout de um único grupo (alinhamento/espacamento corretos)

## 3. Verificação

- [x] 3.1 Abrir o detalhe de um ativo e confirmar que preço e variação não aparecem acima dos indicadores
- [x] 3.2 Confirmar que indicadores fundamentalistas e informações da empresa seguem inalterados
- [x] 3.3 Rodar `npx prettier --write` nos arquivos alterados e `ng build`

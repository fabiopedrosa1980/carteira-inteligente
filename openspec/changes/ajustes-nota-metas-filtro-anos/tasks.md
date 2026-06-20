## 1. Card de ação — Nota ao lado do ticker

- [x] 1.1 Em `stock-card.html`, adicionar a Nota dentro de `.card-top`, após `.identity`, exibindo só o valor (sem rótulo "Nota") e apenas quando `stock.nota > 0`, aplicando `notaClass`.
- [x] 1.2 Em `stock-card.html`, remover o bloco `.stat` da Nota e o `.stat-sep` correspondente do `stat-strip`.
- [x] 1.3 Em `stock-card.scss`, estilizar a Nota no topo: alinhada à direita (`margin-left: auto`, `flex-shrink: 0`), garantindo `min-width: 0` em `.identity` para o nome truncar com ellipsis sem estourar.
- [x] 1.4 Validar em desktop e mobile: ticker à esquerda, Nota à direita na mesma linha, sem corte; card sem Nota quando `nota = 0`.

## 2. Tela de Metas — sem corte de texto no mobile

- [x] 2.1 Em `goals.scss`, no breakpoint ≤480px, permitir quebra de texto nas células (nome/valores/progresso) e revisar larguras do `colgroup` para caberem sem corte, mantendo `overflow-x: hidden` (sem scroll horizontal).
- [x] 2.2 Validar no mobile (≤480px) que nome da meta, valor atual, progresso e operação ficam legíveis sem corte e sem rolagem horizontal.

## 3. Filtro de anos do Histórico — combo no mobile

- [x] 3.1 Em `dividend-history.html`, adicionar bloco combo de ano (rótulo "Ano" + `select`) reusando o padrão `.dh-selector`/`.dh-label`/`.dh-select`, com opção "Todos" (`null`) e cada ano de `availableYears()`, chamando `selectYear(...)`.
- [x] 3.2 Em `dividend-history.scss`, exibir o combo de ano apenas no mobile (≤480px) e os chips `.dh-years` apenas no desktop (alternância por `display` na media query).
- [x] 3.3 Validar: mobile mostra combo "Ano" com "Todos" + anos e filtra corretamente; desktop mantém os chips.

## 4. Verificação e entrega

- [x] 4.1 Rodar `npx prettier --write` nos arquivos alterados e `ng build` para garantir que compila.
- [x] 4.2 Commit e push por área (prefixos `feat:`/`style:`), staged por arquivo específico.

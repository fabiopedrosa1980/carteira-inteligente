## 1. Navegação — renomear e reposicionar aba

- [x] 1.1 Em `dashboard.ts`, mover o item `portfolio` para a posição 0 no array `tabs` e alterar `label` de `'Minhas Ações'` para `'Meus Ativos'`
- [x] 1.2 Em `dashboard.html`, atualizar o texto da mensagem de portfólio vazio que cita "Ações" para mencionar "Meus Ativos" ou "ativos"

## 2. Listagem — FIIs e ETFs

- [x] 2.1 Em `dashboard.ts` → `loadAcoes()`, remover o hardcode `sector: 'Ações'` e usar o valor retornado pelo backend (ou derivar do tipo de ativo se disponível)
- [x] 2.2 Verificar se `BackendApiService.getAcoes()` já retorna FIIs e ETFs; se retornar, confirmar que os tickers aparecem na listagem sem alteração adicional no backend

## 3. Ordenação — remover controles globais e adicionar por coluna

- [x] 3.1 Em `dashboard.html`, remover o bloco `<div class="sort-controls">` (chips desktop com `<app-scroll-bar>`)
- [x] 3.2 Em `dashboard.html`, remover o bloco `<div class="sort-mobile">` (combo + botão de direção mobile)
- [x] 3.3 Em `dashboard.html`, remover o import e uso de `ScrollBarComponent` no template (se não usado em outro lugar)
- [x] 3.4 Em `dashboard.ts`, remover `sortOptions` de `dy` e `nota` (não há mais UI para esses campos); manter `sortField` e `sortAsc` para uso pelos cabeçalhos de coluna
- [x] 3.5 Em `dashboard.html` → `<thead>`, transformar os `<th>` das colunas ordenáveis em botões clicáveis: `(click)="setSort('name')"`, `(click)="setSort('price')"` etc., com seta indicativa `{{ sortField() === 'name' ? (sortAsc() ? '↑' : '↓') : '' }}`
- [x] 3.6 Ajustar estilo dos `<th>` clicáveis (cursor pointer, hover visual) em `dashboard.scss`

## 4. Cards — remover Hoje, DY e Nota

- [x] 4.1 Em `stock-card.html`, remover o bloco `<div class="stat">` referente a "Hoje" e o `<span class="stat-sep">` adjacente
- [x] 4.2 Em `stock-card.html`, remover o bloco `<div class="stat">` referente a "DY"
- [x] 4.3 Em `stock-card.html`, remover o elemento `<span class="card-nota" *ngIf="stock.nota > 0">`
- [x] 4.4 Em `stock-card.ts`, remover as propriedades/getters `notaClass` e `yieldClass` se não forem mais usados
- [x] 4.5 Em `stock-card.scss`, remover estilos de `.card-nota`, `.stat-sep` e quaisquer regras órfãs de DY/Hoje
- [x] 4.6 Verificar se `div.stat-strip` fica vazia para a maioria dos ativos e ajustar espaçamento (remover padding/margin quando sem conteúdo)

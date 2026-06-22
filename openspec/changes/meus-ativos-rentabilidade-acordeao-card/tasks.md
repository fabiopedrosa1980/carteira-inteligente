## 1. Cabeçalho do acordeão — remover rentabilidade

- [x] 1.1 Em `dashboard.html`, remover o bloco `<span class="sec-metric" *ngIf="groupRentabilidade(group) !== null">` (Rent. / `sec-rent`) do `ah-right` do acordeão de "Meus Ativos", mantendo o `sec-metric` do Total e o chevron.

## 2. Card mobile — rentabilidade no topo, variação hoje junto da variação

- [x] 2.1 Em `dashboard.scss` (`@media (max-width: 640px)` da `.acoes-list`), alterar o `grid-template-areas` da `.acoes-row` para `'ticker rent' / 'saldo qtd' / 'preco patual' / 'hoje var'`, trocando `hoje` ↔ `rent`.
- [x] 2.2 Ajustar `rent` (`td:nth-child(8)`) para o topo direito: `justify-self: end`, `text-align: right`, `align-self: center`.
- [x] 2.3 Ajustar `hoje` (`td:nth-child(5)`) para o rodapé esquerdo: `justify-self: start`, `text-align: left`, removendo `align-self: center`.

## 3. Verificação

- [x] 3.1 Rodar `ng build` e validar: cabeçalho do acordeão sem rentabilidade (Total mantido) e card mobile com rentabilidade no topo e "Variação hoje" na linha da "Variação".
- [x] 3.2 Commit e push seguindo o fluxo do projeto (stage de arquivos específicos).

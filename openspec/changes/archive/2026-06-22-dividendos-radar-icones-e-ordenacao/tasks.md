## 1. Radar — ocultar alternador no estado vazio

- [x] 1.1 Em `dividends-radar.html`, envolver `.radar-view-toggle` com `*ngIf="loading() || rows().length > 0"`, ocultando os ícones cards/matriz apenas no estado vazio pós-carregamento.

## 2. Estados vazios — ícone por tela

- [x] 2.1 Em `dividends-radar.html`, trocar o SVG de calendário do `.radar-no-data-icon` pelo `iconPath` da aba Radar (single-path com stroke).
- [x] 2.2 Em `dividend-history.html`, trocar o SVG de calendário do `.dh-no-data-icon` pelo `iconPath` da aba Histórico.
- [x] 2.3 Em `dividends-summary.ts`, adicionar um getter/computed `iconPath` que retorna o path da aba Recebidos (`mode === 'received'`) ou Projetados (`mode === 'projected'`).
- [x] 2.4 Em `dividends-summary.html`, usar `[attr.d]="iconPath"` no `path` do `.ds-no-data-icon` (com `stroke`, `stroke-width: 1.8`, `stroke-linecap/linejoin: round`).

## 3. Histórico — ordenar por todas as colunas

- [x] 3.1 Em `dividend-history.ts`, adicionar sinais `sortField` (padrão `'pay_date'`) e `sortAsc` (padrão `false`) e o método `setSort(field)` (inverte direção se já ativa; senão define coluna + padrão e `page.set(0)`).
- [x] 3.2 Em `dividend-history.ts`, criar o computed `sortedDividends` (ordena `filteredDividends()` por `sortField`/`sortAsc`, tratando datas vazias de forma consistente) e fazer `pageItems`/`totalPages`/`showPagination` operarem sobre ele; remover a ordenação fixa em `selectStock`.
- [x] 3.3 Em `dividend-history.html`, tornar os `<th>` (Tipo, Data Com, Data de Pagamento, Valor) clicáveis (`setSort(...)`) com indicador de coluna/direção ativos.
- [x] 3.4 Em `dividend-history.scss`, adicionar o estilo de cabeçalho ordenável (cursor, hover, seta), reaproveitando o padrão existente.

## 4. Verificação

- [x] 4.1 Rodar `ng build` e validar: Radar sem alternador no vazio; ícones dos estados vazios conforme a aba; Histórico ordenável por todas as colunas com indicador e alternância asc/desc.
- [x] 4.2 Commit e push seguindo o fluxo do projeto (stage de arquivos específicos).

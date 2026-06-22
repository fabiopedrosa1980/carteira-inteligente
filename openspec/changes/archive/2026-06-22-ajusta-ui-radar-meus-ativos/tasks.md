## 1. Estado vazio do Radar

- [x] 1.1 Em `dividends-radar.html`, substituir `<p class="radar-empty">…</p>` por um bloco de estado vazio com ícone (calendário, reaproveitando o glifo das telas de dividendos), título e texto descritivo, condicionado a `rows().length === 0`.
- [x] 1.2 Em `dividends-radar.scss`, adicionar as regras `.radar-no-data` / `.radar-no-data-icon` / `.radar-no-data-title` / `.radar-no-data-text` espelhando o padrão `.ds-no-data` (flex centralizado, ícone accent, título primário, texto secundário); remover a regra `.radar-empty` que ficou sem uso.

## 2. Card Meus Ativos no mobile

- [x] 2.1 Em `dashboard.scss` (`@media (max-width: 640px)` da `.acoes-list`), remover o `background` da "Variação hoje" (`td:nth-child(5)`), incluindo os estados `.pos` e `.neg`, mantendo apenas a cor do texto por sinal.
- [x] 2.2 Reorganizar `grid-template-areas` da `.acoes-row` para `'ticker hoje' / 'saldo saldo' / 'preco qtd' / 'rent var'`, posicionando a quantidade acima da variação e eliminando a linha isolada `'qtd qtd'`.
- [x] 2.3 Ajustar os seletores de área (`td:nth-child(...)`) para casar com o novo mapa, garantindo que cada campo caia na área correta e que não reste espaço em branco ocioso.

## 3. Ícone do Patrimônio Total

- [x] 3.1 Em `dashboard.scss`, remover o override `.ps-card-hero .ps-card-icon` para o ícone herdar o tamanho padrão de `.ps-card-icon` (30×30 / svg 16×16), mantendo `.ps-card-hero .ps-card-value` inalterado.

## 4. Verificação

- [x] 4.1 Rodar `ng build` e validar visualmente em ≤640px (card de ativo) e desktop (resumo e Radar) que os três ajustes estão corretos e sem rolagem horizontal.
- [x] 4.2 Commit e push seguindo o fluxo do projeto (stage de arquivos específicos).

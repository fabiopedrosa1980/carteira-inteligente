## Why

Hoje a tela de Dividendos abre filtrada apenas no ano atual, escondendo o histórico dos anos anteriores que já foi importado. O usuário quer ver, por padrão, todos os 5 anos e poder clicar em um ano para filtrar. Além disso, as colunas da tabela têm larguras desiguais.

## What Changes

- Por padrão, a tabela exibe os dividendos de **todos os 5 anos** (sem filtro de ano)
- Os anos são exibidos como botões clicáveis (chips), incluindo a opção "Todos"; clicar em um ano filtra a tabela para aquele ano e clicar em "Todos" volta a exibir os 5 anos
- Remoção do limite de mês corrente no ano atual — todos os registros importados (janela de 5 anos do backend) são exibidos
- As 4 colunas da tabela (Tipo, Data Com, Data de Pagamento, Valor) passam a ter **25% de largura cada** (iguais)

## Capabilities

### New Capabilities
- `dividend-year-filter`: Filtro de ano por chips clicáveis na tela de dividendos, com "Todos os anos" como padrão
- `dividend-table-equal-columns`: Colunas da tabela de dividendos com largura igual (25% cada)

## Impact

- **Frontend** (`carteira-inteligente`):
  - `dividend-history.ts`: `selectedYear` passa a aceitar `number | null` (null = todos); `filteredDividends` sem o cap de mês corrente
  - `dividend-history.html`: troca o `<select>` de ano por chips clicáveis com opção "Todos"
  - `dividend-history.scss`: colunas a 25% cada; estilos dos chips de ano
- **Sem mudança no backend** — os dados já vêm na janela de 5 anos

## Why

O Radar atual (12 cards de mês, cada um listando os tickers) é bom para "quem paga em cada mês", mas dificulta ler o **padrão de um ativo ao longo do ano**. Uma matriz estilo **batalha naval** — tickers em linhas, meses em colunas — deixa visível de relance a sazonalidade de cada ativo e os meses "cheios" da carteira, marcando a célula onde o ticker teve data-com.

## What Changes

- Substituir o grid de 12 cards por uma **matriz**: a primeira coluna lista os **tickers** (uma linha por ativo da classe selecionada); as **12 colunas seguintes** são os meses (Jan→Dez na horizontal).
- **Marcar a célula** (ticker × mês) quando aquele ativo teve **data-com (ex_date) naquele mês no ano anterior**.
- **Coluna do próximo mês** ao atual destacada ("Oportunidade de compra", com ícone de atenção); **coluna do mês com mais ativos** destacada ("Melhor mês").
- Coluna de tickers **fixa** (sticky) e **rolagem horizontal** em telas estreitas. Título sem o ano.

## Capabilities

### Modified Capabilities
- `dividends-radar`: a visualização passa de 12 cards para uma matriz ticker × mês (batalha naval), marcando os meses de data-com por ativo; destaques nas colunas do próximo mês e do mês com mais ativos.

## Impact

**Frontend (este repo):**
- `src/app/components/dividends-radar/dividends-radar.ts` — pivotar os dados de `byMonth` para **linhas por ticker** com marcas por mês; manter `topMonth`/`nextMonth` como destaques de coluna.
- `src/app/components/dividends-radar/dividends-radar.html` — matriz (cabeçalho de meses + linhas de tickers com células marcadas), em container com rolagem horizontal.
- `src/app/components/dividends-radar/dividends-radar.scss` — grid da matriz, coluna de ticker fixa, células marcadas, destaques de coluna.

## Por que

Nas abas Dividendos Recebidos e Dividendos Projetados, cada ativo mostra apenas um total. O usuário quer entender como esse total se forma ao longo do ano, vendo o detalhamento por mês de cada ativo. Hoje essa informação não está disponível na tela.

## O que muda

- Tornar cada linha de ativo das abas "Dividendos Recebidos" e "Dividendos Projetados" **colapsável** (acordeão).
- Ao expandir um ativo, exibir o detalhamento por **mês** com o respectivo **valor**, somando para o total daquele ativo.
- Recebidos: a quebra mensal usa os proventos do ano atual (valor do mês = `Σ amount × cotas elegíveis` dos proventos daquele mês, respeitando a data-com).
- Projetados: a quebra mensal usa os proventos do ano anterior (valor do mês = `Σ amount × total de cotas atuais` dos proventos daquele mês).
- A linha do ativo continua mostrando o total; os meses aparecem apenas quando expandido.

## Capabilities

### Novas capabilities
<!-- Nenhuma capability nova; é um refinamento de apresentação da capability existente. -->

### Capabilities modificadas
- `dividendos-recebidos-projetados`: adiciona o detalhamento mensal colapsável por ativo nas abas Recebidos e Projetados.

## Impacto

- Front-end (Angular), repositório `carteira-inteligente`. Sem alteração de backend.
- `DividendsSummaryComponent` (`.ts`/`.html`/`.scss`): cálculo passa a produzir também a quebra mensal por ativo; template ganha linhas expansíveis e estado de expandido/colapsado.

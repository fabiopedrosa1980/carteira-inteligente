## Por que

Hoje a tela de Dividendos mostra apenas o histórico de proventos por ativo. O usuário quer também acompanhar quanto efetivamente recebeu no ano atual (considerando quando comprou) e uma projeção para o próximo período, com totais consolidados — informação que hoje não existe.

## O que muda

- Dividir a tela de Dividendos em três abas: **Histórico de Dividendos**, **Dividendos Recebidos** e **Dividendos Projetados**.
- **Histórico de Dividendos**: mantém a visão atual (proventos por ativo, filtro por ano).
- **Dividendos Recebidos** (ano-calendário atual): para cada provento do ano atual de cada ativo, somar `valor_por_cota × cotas elegíveis`, onde uma cota é elegível quando a data do lançamento que a originou é menor ou igual à data-com (`ex_date`) do provento. Exibir o total recebido e o detalhamento por ativo.
- **Dividendos Projetados**: para cada ativo, projetar `total_por_cota_do_ano_anterior × total de cotas atuais` e somar. Exibir o total projetado e o detalhamento por ativo.
- Em ambas as novas abas, somar os valores conforme as regras acima e mostrar o total geral.

## Capabilities

### Novas capabilities
- `dividendos-recebidos-projetados`: abas de Dividendos Recebidos (ano atual, elegibilidade por data-com) e Dividendos Projetados (base no ano anterior), com totais consolidados.

### Capabilities modificadas
<!-- Nenhuma capability existente tem requisitos alterados; o histórico atual é preservado dentro de uma aba. -->

## Impacto

- Front-end (Angular), repositório `carteira-inteligente`. Sem alteração de backend — os dados necessários (`amount`, `ex_date`, `year` dos dividendos; `date`, `quantity`, `ticker` das transações) já são expostos pela API.
- Componente da tela de Dividendos (`dividend-history`) passa a hospedar as abas, ou um novo componente container de Dividendos é criado.
- Consumo de `BackendApiService.getStockDividends` (por ativo) e das transações do usuário (`TransactionService`) para os cálculos.

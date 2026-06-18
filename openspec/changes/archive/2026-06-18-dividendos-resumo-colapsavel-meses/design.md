## Contexto

O `DividendsSummaryComponent` calcula, por ativo, uma linha `SummaryRow { ticker, shares, value }` e soma o total. Os dados vêm de `getAcoes()` + `getStockDividends()` (por ativo) + transações. Os proventos (`ApiDividend`) têm `amount` (por cota), `month`, `year`, `ex_date` (data-com), `pay_date`. A apresentação atual é uma tabela simples (Ativo / Cotas / Valor).

## Goals / Non-Goals

**Goals:**
- Linha de ativo colapsável com quebra mensal (mês + valor) nas abas Recebidos e Projetados.
- Soma das linhas mensais igual ao total do ativo.

**Non-Goals:**
- Alterar as regras de cálculo dos totais (apenas detalhá-las por mês).
- Backend ou aba Histórico.

## Decisões

### 1. Estender `SummaryRow` com a quebra mensal
`SummaryRow` passa a ter `months: { month: number; label: string; value: number }[]`. O cálculo agrega os proventos por mês durante o `compute`, em vez de só somar. O `value` da linha continua sendo a soma dos meses (mantém consistência).

### 2. Cálculo por mês
- **Recebidos:** para cada provento com `year === anoAtual`, acumular em `months[provento.month] += amount × cotasElegiveis` (mesma regra de elegibilidade por data-com já existente).
- **Projetados:** para cada provento com `year === anoAtual - 1`, acumular em `months[provento.month] += amount × cotasAtuais`.
- Ao final, converter o mapa de meses em lista ordenada por mês (1→12), descartando meses com valor 0 (não exibir mês sem provento). `label` = nome do mês em português.

### 3. Estado de expansão na UI
Manter um `Set<string>` de tickers expandidos (signal) no componente, com `toggle(ticker)` e `isExpanded(ticker)`. Estado inicial: vazio (todos colapsados). A linha do ativo vira um botão clicável com um chevron indicando expandido/colapsado.

### 4. Apresentação
Transformar a tabela em um acordeão: cada ativo é uma linha-cabeçalho (Ativo, Cotas, Total, chevron). Quando expandido, renderizar abaixo as linhas de meses (Mês / Valor) com leve recuo e fundo sutil. Reaproveitar variáveis de tema e o estilo já existente.

### 5. Nome dos meses
Adicionar um array constante de nomes de meses em português (`['Jan', … 'Dez']` ou nomes completos). Usar abreviação para caber bem na linha.

## Riscos / Trade-offs

- [Provento sem `month`] → derivar o mês de `pay_date` (ou `ex_date`) quando `month` ausente; se indeterminado, agrupar em um rótulo genérico ou ignorar. Mitigação: usar `month` e cair para `new Date(pay_date).getMonth()+1`.
- [Acordeão recriado a cada troca de aba] → como o componente já recarrega ao trocar de aba (via `*ngIf`), o estado de expansão reinicia colapsado, o que é o comportamento desejado.

## Plano de Migração

1. Estender o cálculo e o `SummaryRow` no `.ts`.
2. Atualizar o template para acordeão e adicionar o estado de expansão.
3. Ajustar o `.scss`.
4. `ng build` e validação visual.
5. Rollback: reverter o commit; mudança apenas de UI.

## Questões em Aberto

- Nenhuma. As regras de soma já foram confirmadas; este change apenas detalha por mês.

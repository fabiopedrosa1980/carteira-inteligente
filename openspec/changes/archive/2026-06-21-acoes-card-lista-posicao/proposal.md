## Why

No card de "Minhas Ações" o usuário vê preço e variação do dia, mas não vê **quanto tem**, **quanto vale** a posição hoje, nem **quanto ganhou/rendeu**. Mostrar quantidade, preço atual (cotação do dia), saldo, variação da posição (R$) e rentabilidade (%) dá a visão de patrimônio e desempenho por ativo sem abrir o detalhe. Além disso, uma **visão em lista** facilita comparar muitos ativos lado a lado.

## What Changes

- **Card de Minhas Ações** passa a exibir, por ativo:
  - **Quantidade** de cotas (`stock.quantity`).
  - **Preço atual** com a cotação do dia (preço-herói; a variação do dia continua como "Hoje").
  - **Saldo atual** = `quantidade × preço atual`.
  - **Variação** da posição em **R$** = `saldo − custo`, onde `custo = quantidade × preço médio`.
  - **Rentabilidade** em **%** = `(preço atual − preço médio) / preço médio × 100`.
  - Sinal/cor positiva/negativa para variação e rentabilidade.
- **Visão em lista** para Minhas Ações:
  - Alternância **Cards ⇄ Lista** por ícones, **cards como padrão**, posicionados **à direita do cabeçalho junto aos controles de "Ordenar por"** (mesmo padrão visual do Radar).
  - A lista exibe os mesmos campos em colunas (Ativo, Qtd, Preço, Hoje, Saldo, Variação R$, Rentabilidade %).
  - A ordenação atual continua valendo para as duas visões.
- Campos de posição só aparecem quando há quantidade (> 0) e preço médio (> 0) para os cálculos derivados.

## Capabilities

### New Capabilities
- `acoes-card-position`: o card de Minhas Ações exibe quantidade, preço atual (cotação do dia), saldo, variação da posição (R$) e rentabilidade (%).
- `acoes-list-view`: alternância Cards/Lista (cards padrão), com a lista exibindo os mesmos campos em colunas e respeitando a ordenação atual.

## API Go — precisa ajustar?

**Não.** Os cards de "Minhas Ações" já são alimentados pelo endpoint `getAcoes()` (`ApiAcaoItem`), que **já retorna** `total_quantity`, `avg_price`, `current_price` e `change_percent`. O `dashboard.ts` já mapeia `quantity`/`avgPrice`/`price` para o modelo `Stock`. **Saldo**, **variação (R$)** e **rentabilidade (%)** são derivados no frontend a partir de `quantity`, `avg_price` e `current_price`. Portanto, nenhuma alteração na API Go é necessária.

- Ressalva (fora de escopo): se o `current_price` de `getAcoes()` não estiver fresco o suficiente (intraday), existe `getBulkQuotes()` para cotação ao vivo — mas hoje `current_price` + `change_percent` já representam a cotação do dia.

## Impact

- `src/app/components/dashboard/dashboard.html`, `.scss`, `.ts` — toggle Cards/Lista no cabeçalho; renderização da lista; estado da visão.
- `src/app/components/stock-card/stock-card.html`, `.scss`, `.ts` — quantidade, saldo, variação (R$) e rentabilidade (%) no card.
- `src/app/models/` — helpers puros de posição (saldo, custo, variação, rentabilidade), reusados por card e lista.
- Sem mudanças de serviços ou API Go (`Stock` já tem `quantity`/`avgPrice`).

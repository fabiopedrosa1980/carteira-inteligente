## Why

Dois ajustes visuais de padronização nas telas de Dividendos e no card de ativos:

1. No card de ativo (mobile) da aba "Meus Ativos", o **Preço médio** e o **Preço atual** ficam em linhas separadas, dificultando comparar custo × mercado. A quantidade fica entre eles. Colocar os dois preços na mesma linha facilita a leitura.
2. A tela de **Histórico** (aba de Dividendos) usa um card com **borda** ao redor do conteúdo que está fora do padrão visual desejado para essa tela.

## What Changes

- **Trocar a posição da quantidade com o Preço atual** no card de ativo (mobile), de modo que **Preço médio** e **Preço atual** fiquem **na mesma linha** e a quantidade ocupe a posição que era do Preço atual (ao lado do Saldo).
- **Remover a borda** do contêiner da tela de Histórico (`.dh-section`), mantendo o restante (fundo, espaçamento) inalterado.

## Capabilities

### New Capabilities
- `historico-sem-borda`: contêiner da tela de Histórico de dividendos exibido sem borda.

### Modified Capabilities
- `meus-ativos-card-mobile-layout`: ajustar o posicionamento dos campos do card no mobile para que Preço médio e Preço atual fiquem na mesma linha, trocando a quantidade de lugar com o Preço atual.

## Impact

- `src/app/components/dashboard/dashboard.scss` — `grid-template-areas` da `.acoes-row` no breakpoint `@media (max-width: 640px)`.
- `src/app/components/dividend-history/dividend-history.scss` — remoção da `border` de `.dh-section`.
- Sem mudanças de API, modelos, DOM/HTML ou lógica de dados — apenas estilos.

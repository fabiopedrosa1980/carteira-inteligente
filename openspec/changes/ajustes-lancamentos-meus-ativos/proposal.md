## Why

Refinamentos de UX e mobile após a entrega anterior (`meus-lancamentos-card-mobile`): no card de lançamento em mobile as ações Editar/Excluir e o Total ficam em linhas separadas, gerando leitura quebrada; o botão "+" no cabeçalho da seção ficou redundante com o "Adicionar" do rodapé; ao ocultar valores em "Meus Ativos", o valor da Alocação continua visível; a fonte dos valores dos cards de resumo está grande demais; e na tela de Histórico de Dividendos os valores são cortados (ellipsis) no mobile.

## What Changes

- **Lançamentos (card mobile):** as ações **Editar/Excluir** passam a ficar na **mesma linha do Total**; o Total deixa de ficar isolado. No desktop a tabela permanece igual.
- **Lançamentos:** **remover o botão "+"** do cabeçalho da seção (adicionado na mudança anterior), mantendo apenas o botão **"Adicionar"** no rodapé do corpo do card como único ponto de acesso.
- **Meus Ativos (ocultar valores):** o botão olho passa a ocultar **também o valor da Alocação** (o patrimônio exibido no card de Alocação e os montantes em R$ do ledger), além dos cards de resumo.
- **Meus Ativos:** **reduzir a fonte** do valor dos cards de resumo (`.ps-card-value`) para um equilíbrio visual melhor.
- **Histórico de Dividendos (mobile):** ajustar a tabela para **não cortar os valores** em telas estreitas (sem ellipsis no valor), rebalanceando as colunas e o alinhamento.

## Capabilities

### New Capabilities
- `historico-valores-mobile-sem-corte`: na tela Histórico de Dividendos, os valores não são truncados no mobile.

### Modified Capabilities
- `lancamentos-mobile-grid`: no card mobile, as ações Editar/Excluir ficam na mesma linha do Total.
- `lancamentos-botao-adicionar-secao`: o botão de adicionar passa a existir apenas no rodapé do card (sem botão no cabeçalho da seção).
- `meus-ativos-ocultar-valores`: o botão olho também oculta o valor da Alocação.
- `portfolio-resumo-cards`: o valor dos cards de resumo usa fonte reduzida.

## Impact

- `src/app/components/my-assets/my-assets.html` / `.scss` — grid do card mobile (ações na linha do Total); remoção do botão "+" do cabeçalho.
- `src/app/components/allocation-card/allocation-card.ts` / `.html` / `.scss` — novo input para ocultar valores (Alocação) e máscara dos valores em R$.
- `src/app/components/dashboard/dashboard.html` — passar `valoresOcultos()` ao `app-allocation-card`.
- `src/app/components/dashboard/dashboard.scss` — fonte reduzida em `.ps-card-value`.
- `src/app/components/dividend-history/dividend-history.scss` — colunas/alinhamento da tabela no mobile para não cortar o valor.
- Sem mudanças de API, modelos de dados ou dependências.

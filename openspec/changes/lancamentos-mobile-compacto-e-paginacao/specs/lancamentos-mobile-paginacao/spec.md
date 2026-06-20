## ADDED Requirements

### Requirement: Paginação dos lançamentos por seção

Em cada seção (Ações/FIIs/ETFs) da tela de Lançamentos, a lista SHALL ser paginada em **10 itens por página**, com controles para ir à página anterior/próxima e um indicador de página atual/total. Quando a seção tem 10 itens ou menos, os controles de paginação NÃO SHALL ser exibidos. A paginação SHALL valer tanto para a visão detalhada quanto para a agrupada.

#### Scenario: Mais de 10 itens
- **WHEN** uma seção tem mais de 10 lançamentos (ou ativos agrupados)
- **THEN** são exibidos 10 por página com controles de navegação e indicador "página X / Y"

#### Scenario: 10 ou menos
- **WHEN** uma seção tem 10 itens ou menos
- **THEN** todos são exibidos sem controles de paginação

#### Scenario: Navegação entre páginas
- **WHEN** o usuário usa Anterior/Próxima
- **THEN** a lista mostra a página correspondente; os botões ficam desabilitados nos limites

### Requirement: Versão mobile compacta da tabela detalhada

Em telas estreitas (mobile), a tabela detalhada de Lançamentos SHALL exibir apenas as colunas **Ativo, Quantidade e Total** (além das ações de editar/excluir), omitindo **Data** e **Preço unitário**, com **fonte maior** para melhor leitura. No desktop, todas as colunas permanecem.

#### Scenario: Colunas no mobile
- **WHEN** a tabela detalhada é exibida em tela estreita
- **THEN** mostra Ativo, Quantidade, Total e as ações, omitindo Data e Preço unitário, com fonte maior

#### Scenario: Desktop completo
- **WHEN** a tabela detalhada é exibida em tela larga
- **THEN** todas as colunas (Ativo, Data, Qtd, Preço, Total, Ações) são exibidas

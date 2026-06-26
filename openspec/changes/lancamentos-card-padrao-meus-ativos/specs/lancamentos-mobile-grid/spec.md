## ADDED Requirements

### Requirement: Arranjo padronizado do card de Lançamentos no mobile

No mobile (largura ≤600px), o card de lançamento SHALL organizar seus campos no seguinte arranjo: o **ticker** ocupa sozinho a **primeira linha** (largura inteira); os demais campos ficam **2 por linha** — **Data e Quantidade** na segunda linha, **Preço Unit. e Total** na terceira linha; e as **ações** (Editar/Excluir e o "+") permanecem num rodapé do card. Os campos de texto (Data, Preço) SHALL ser alinhados à esquerda e os números-chave (Quantidade, Total) à direita, sem rolagem horizontal.

#### Scenario: Ticker sozinho na primeira linha
- **WHEN** um card de lançamento é exibido em largura ≤600px
- **THEN** o ticker aparece sozinho na primeira linha, ocupando a largura inteira do card

#### Scenario: Demais campos 2 por linha
- **WHEN** um card de lançamento é exibido em largura ≤600px
- **THEN** Data e Quantidade aparecem na mesma linha (Data à esquerda, Quantidade à direita)
- **AND** Preço Unit. e Total aparecem na linha seguinte (Preço à esquerda, Total à direita)
- **AND** as ações (Editar/Excluir e "+") ficam num rodapé do card

#### Scenario: Card contido
- **WHEN** um card de lançamento é exibido em largura ≤600px
- **THEN** o card permanece contido, sem rolagem horizontal da página

### Requirement: Paridade visual do card de Lançamentos com o de Meus Ativos

No mobile, o card de Lançamentos SHALL seguir o mesmo idioma visual do card de Meus Ativos: mesmo raio de card e a mesma tipografia para os valores (fonte sans, como em Meus Ativos), preservando os micro-rótulos em caixa-alta de cada campo. O **Total** SHALL ser o valor de destaque do card.

#### Scenario: Idioma visual consistente
- **WHEN** o card de Lançamentos e o card de Meus Ativos são exibidos em mobile
- **THEN** ambos usam o mesmo raio de card e a mesma tipografia para os valores
- **AND** o card de Lançamentos mantém os micro-rótulos em caixa-alta em cada campo
- **AND** o Total é apresentado como valor de destaque do card

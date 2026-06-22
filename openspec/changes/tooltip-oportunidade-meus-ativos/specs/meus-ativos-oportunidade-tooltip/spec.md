## ADDED Requirements

### Requirement: Tooltip de oportunidade no hover

Na tabela de Meus Ativos, ao passar o mouse sobre o indicador da coluna "Oportunidade" de uma linha, o sistema SHALL exibir uma "alt janela" (tooltip/popover) com o detalhamento de preço-teto do ativo daquela linha. O tooltip SHALL desaparecer quando o ponteiro sair do indicador.

#### Scenario: Mostrar tooltip ao passar o mouse

- **WHEN** o usuário posiciona o mouse sobre o badge de oportunidade de uma linha
- **THEN** o sistema exibe o tooltip com os dados de preço-teto do ativo daquela linha

#### Scenario: Esconder tooltip ao retirar o mouse

- **WHEN** o ponteiro sai do badge de oportunidade
- **THEN** o tooltip é removido da tela

### Requirement: Conteúdo do tooltip espelha a tela de detalhe

Quando o ativo possui veredito de preço-teto (zona `compra`, `justo` ou `caro`), o tooltip SHALL apresentar exatamente cinco campos, cada um com seu rótulo de texto ao lado do valor, com os mesmos rótulos, valores e formatação da seção "Preço-teto" da tela de detalhe do ativo:

- "Yield-alvo"
- "Preço-teto"
- "Preço justo"
- "DPA (12m)" (rotulado "Rendimento (12m)" para FIIs)
- "Preço atual vs teto"

Os valores SHALL usar a mesma formatação da tela de detalhe (moeda em R$, percentuais e sinal de desconto/ágio). O tooltip NÃO SHALL incluir o veredito da zona nem o P/VP.

#### Scenario: Ativo com veredito numérico

- **WHEN** o tooltip é exibido para uma ação na zona de compra
- **THEN** ele mostra os cinco campos, cada um com o rótulo de texto ("Yield-alvo", "Preço-teto", "Preço justo", "DPA (12m)", "Preço atual vs teto") seguido do valor formatado como na tela de detalhe, e não exibe veredito de zona nem P/VP

#### Scenario: FII reusa o rótulo de rendimento

- **WHEN** o tooltip é exibido para um FII com veredito numérico
- **THEN** o campo de DPA(12m) aparece com o rótulo "Rendimento (12m)" e os demais quatro rótulos/valores são exibidos normalmente

### Requirement: Estados sem veredito

O tooltip SHALL respeitar os estados sem veredito numérico. Para a zona `sem-dados`, ele SHALL exibir a mensagem de histórico de proventos insuficiente. Para a zona `na` (ETF), ele SHALL indicar que o preço-teto não se aplica.

#### Scenario: Histórico insuficiente

- **WHEN** o tooltip é exibido para um ativo na zona "sem-dados"
- **THEN** ele mostra a mensagem de que o histórico de proventos é insuficiente para calcular o preço-teto e não exibe a grade de indicadores

#### Scenario: ETF

- **WHEN** o tooltip é exibido para um ETF (zona "na")
- **THEN** ele indica que o preço-teto não se aplica a este ativo

### Requirement: Não alterar a navegação existente

A introdução do tooltip SHALL ser somente de leitura e não SHALL alterar o comportamento de clique existente da linha.

#### Scenario: Clique continua abrindo o detalhe

- **WHEN** o usuário clica na linha (ou no indicador de oportunidade)
- **THEN** a tela de detalhe do ativo é aberta como antes, independentemente do tooltip

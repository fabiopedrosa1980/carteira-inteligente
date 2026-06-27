## ADDED Requirements

### Requirement: Menu Importar na navegação principal

O dashboard SHALL exibir um item de menu **Importar** na barra de navegação principal, junto aos demais itens (Meus Ativos, Lançamentos, Dividendos, Metas). Ao selecioná-lo, a área de conteúdo MUST exibir a tela de importação e nenhuma outra tela.

#### Scenario: Item Importar visível e selecionável

- **WHEN** o usuário autenticado abre o dashboard
- **THEN** o item **Importar** aparece na barra de navegação principal
- **AND** ao clicar nele, a tela de importação é exibida e o item fica marcado como ativo

#### Scenario: Apenas a tela de importação é exibida quando ativa

- **WHEN** o menu Importar está ativo
- **THEN** somente o conteúdo da tela de importação é renderizado
- **AND** as telas de Meus Ativos, Lançamentos, Dividendos e Metas não são renderizadas

### Requirement: Seleção do arquivo de Posição da B3

A tela de importação SHALL permitir que o usuário selecione um arquivo `.xlsx` exportado da área do investidor da B3 (relatório de Posição). O controle de seleção MUST aceitar apenas arquivos `.xlsx` e exibir o nome do arquivo escolhido antes do envio.

#### Scenario: Usuário escolhe um arquivo .xlsx

- **WHEN** o usuário seleciona um arquivo com extensão `.xlsx`
- **THEN** o nome do arquivo é exibido na tela
- **AND** o botão de importar fica habilitado

#### Scenario: Nenhum arquivo selecionado

- **WHEN** nenhum arquivo foi selecionado
- **THEN** o botão de importar permanece desabilitado

### Requirement: Confirmação explícita de sobreposição

Como a importação apaga e substitui todos os lançamentos existentes, a tela SHALL exigir uma confirmação explícita do usuário antes de enviar o arquivo, deixando claro que os lançamentos manuais atuais serão perdidos.

#### Scenario: Confirmação antes de enviar

- **WHEN** o usuário aciona a importação com um arquivo selecionado
- **THEN** o app apresenta um aviso de que todos os lançamentos atuais serão sobrepostos
- **AND** o envio só ocorre após o usuário confirmar
- **AND** se o usuário cancelar, nenhum dado é enviado e a base permanece inalterada

### Requirement: Estados de envio e resultado da importação

A tela SHALL refletir os estados de envio (carregando), sucesso e erro. Em caso de sucesso, MUST exibir um resumo com a quantidade de posições importadas por classe e os tickers ignorados; em caso de erro, MUST exibir uma mensagem amigável sem alterar o estado visível dos lançamentos.

#### Scenario: Envio em andamento

- **WHEN** o arquivo está sendo enviado para a API
- **THEN** a tela exibe um indicador de carregamento
- **AND** o botão de importar fica desabilitado durante o envio

#### Scenario: Importação concluída com sucesso

- **WHEN** a API responde com sucesso
- **THEN** a tela exibe o total de posições importadas por classe (Ações/ETFs) e os tickers ignorados
- **AND** os lançamentos exibidos no app passam a refletir as posições importadas

#### Scenario: Falha na importação

- **WHEN** a API responde com erro ou está indisponível
- **THEN** a tela exibe uma mensagem de erro amigável
- **AND** os lançamentos atuais permanecem inalterados na visualização

## ADDED Requirements

### Requirement: Notificação de operação em componente que fecha automaticamente
O sistema SHALL exibir o resultado de operações (criar/editar/excluir lançamentos e metas) em um componente de notificação único, estilo toast/modal, sobreposto à tela, que **fecha automaticamente** após alguns segundos.

#### Scenario: Operação bem-sucedida mostra notificação
- **WHEN** o usuário cria, edita ou exclui um lançamento ou uma meta com sucesso
- **THEN** o sistema SHALL exibir a mensagem de resultado em um componente de notificação sobreposto

#### Scenario: Fecha automaticamente
- **WHEN** uma notificação é exibida
- **THEN** o sistema SHALL ocultá-la automaticamente após um tempo (poucos segundos), sem ação do usuário

#### Scenario: Fechar manualmente
- **WHEN** a notificação está visível e o usuário aciona o botão de fechar
- **THEN** o sistema SHALL ocultá-la imediatamente

#### Scenario: Notificação única e global
- **WHEN** uma operação ocorre em qualquer tela (Meus Ativos, Metas)
- **THEN** a notificação SHALL ser apresentada pelo mesmo componente global, e não por banners embutidos em cada tela

#### Scenario: Mensagem compacta
- **WHEN** uma notificação é exibida
- **THEN** o cartão SHALL ser compacto e o texto da mensagem SHALL usar fonte pequena (menor que os banners inline anteriores)

### Requirement: Remoção dos banners de feedback embutidos
As telas Meus Ativos e Metas SHALL NOT exibir mais os banners de feedback inline; o resultado das operações é apresentado apenas pelo componente de notificação global.

#### Scenario: Sem banner inline em Meus Ativos
- **WHEN** uma operação de lançamento é concluída na tela Meus Ativos
- **THEN** o resultado SHALL ser exibido pelo componente global, sem banner fixo dentro da tela

## ADDED Requirements

### Requirement: Skeleton de carregamento nas telas com API

Enquanto uma tela busca dados na API, ela SHALL exibir um **skeleton screen** com placeholders no formato do conteúdo que será carregado (com animação shimmer), em vez de apenas um texto de carregamento. Ao concluir o carregamento, o conteúdo real SHALL aparecer com uma transição suave (fade-in).

#### Scenario: Skeleton durante o carregamento
- **WHEN** uma tela que consome a API está carregando dados
- **THEN** ela mostra placeholders animados no formato do conteúdo (skeleton), e não apenas texto

#### Scenario: Conteúdo entra com transição
- **WHEN** o carregamento termina e os dados chegam
- **THEN** o conteúdo real é exibido com uma transição de fade-in

#### Scenario: Telas cobertas
- **WHEN** o Radar, Recebidos, Projetados, Histórico, Metas ou a lista de ativos estão carregando
- **THEN** cada um exibe um skeleton no formato da sua própria tela

### Requirement: Skeleton acessível

A animação de skeleton SHALL respeitar a preferência de redução de movimento do usuário.

#### Scenario: Movimento reduzido
- **WHEN** o usuário tem `prefers-reduced-motion: reduce` ativo
- **THEN** o skeleton não anima o shimmer (usa um estado estático/atenuado)

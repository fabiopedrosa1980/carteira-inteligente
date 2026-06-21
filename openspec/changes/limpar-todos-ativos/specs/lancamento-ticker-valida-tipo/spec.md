## ADDED Requirements

### Requirement: Sinalização em tempo real de ticker incompatível com o tipo

Além de impedir o salvamento, o modal de lançamento MUST **sinalizar por texto, em tempo real**, quando o ticker digitado não condiz com o tipo de ativo selecionado, sem exigir a tentativa de salvar. A mensagem MUST identificar o tipo detectado pelo ticker e o tipo selecionado (ex.: "Ticker é de Ações, não condiz com FIIs"), usando a mesma heurística por sufixo da B3 já adotada na validação de salvamento. A sinalização MUST desaparecer quando a incompatibilidade for resolvida, e MUST respeitar a tolerância FII × ETF (não sinalizar entre essas duas classes) e os sufixos não reconhecidos (não sinalizar).

#### Scenario: Aviso aparece ao digitar ticker incompatível

- **WHEN** o usuário seleciona um tipo e digita um ticker cujo sufixo indica outro tipo (ex.: tipo "FIIs" e ticker terminado em 3)
- **THEN** uma mensagem de incompatibilidade é exibida em tempo real abaixo do campo de ticker
- **AND** a mensagem indica o tipo detectado e o tipo selecionado

#### Scenario: Aviso some ao corrigir

- **WHEN** o usuário ajusta o ticker ou o tipo de modo que passem a condizer
- **THEN** a mensagem de incompatibilidade deixa de ser exibida

#### Scenario: Sem aviso entre FII e ETF

- **WHEN** o ticker termina em 11 e o tipo selecionado é "FIIs" ou "ETFs"
- **THEN** nenhuma mensagem de incompatibilidade é exibida (ambiguidade tolerada)

#### Scenario: Sem aviso para sufixo não reconhecido

- **WHEN** o ticker não casa com nenhum sufixo conhecido
- **THEN** nenhuma mensagem de incompatibilidade é exibida

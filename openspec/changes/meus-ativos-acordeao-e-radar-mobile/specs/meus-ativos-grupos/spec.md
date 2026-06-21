## ADDED Requirements

### Requirement: Botão de adicionar no rodapé do acordeão

Em "Meus Ativos", o acordeão de cada seção SHALL seguir o mesmo padrão da aba "Lançamentos": o botão de **adicionar lançamento** MUST ficar no **rodapé do corpo do acordeão** (uma linha "Adicionar" ao final do conteúdo da seção), e NÃO no cabeçalho da seção. O botão MUST pré-selecionar o tipo de ativo da seção (Ações, FIIs ou ETFs) ao abrir o modal de lançamento.

#### Scenario: Botão de adicionar ao final da seção

- **WHEN** a seção Ações está expandida
- **THEN** uma linha com o botão "Adicionar" aparece ao final do corpo do acordeão, após a tabela e a paginação
- **AND** o cabeçalho da seção não contém botão de adicionar

#### Scenario: Tipo pré-selecionado pela seção

- **WHEN** o usuário clica em "Adicionar" no rodapé da seção FIIs
- **THEN** o modal de lançamento abre com o tipo de ativo "FIIs" pré-selecionado

#### Scenario: Cabeçalho sem botão de adicionar

- **WHEN** qualquer seção de Meus Ativos é exibida
- **THEN** o cabeçalho mostra apenas o nome do tipo, a contagem e o chevron
- **AND** nenhum botão de adicionar é exibido no cabeçalho

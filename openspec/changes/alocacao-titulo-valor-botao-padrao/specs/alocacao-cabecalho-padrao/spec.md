## ADDED Requirements

### Requirement: Título e valor do card de Alocação no padrão de Meus Ativos

O **título** do card de Alocação SHALL usar a mesma tipografia dos títulos de seção de Meus Ativos (15px, peso 700, cor `--text-primary`). O **valor** (patrimônio) SHALL usar a mesma tipografia dos valores de seção (14px, peso 700, cor `--accent`, `tabular-nums`).

#### Scenario: Título alinhado ao padrão

- **WHEN** o card de Alocação é exibido
- **THEN** o título "Alocação" tem tamanho 15px, peso 700 e cor primária, igual aos títulos de seção (ex.: "Ações")

#### Scenario: Valor alinhado ao padrão

- **WHEN** o card de Alocação é exibido
- **THEN** o valor do patrimônio tem tamanho 14px, peso 700 e cor de destaque (`--accent`), igual aos totais de seção

### Requirement: Botões de ação do card de Alocação no padrão do app

Os botões de ação **primários** do card de Alocação (**Editar** quando ocioso e **Salvar** em edição) SHALL usar o botão verde padrão do app (fundo `--accent`, texto `--btn-accent-text`, sem borda, 13px peso 700, raio 9px), igual ao botão "Adicionar". O botão **Cancelar** SHALL usar um estilo de contorno discreto (secundário), preservando a hierarquia.

#### Scenario: Editar no padrão verde

- **WHEN** o card de Alocação está ocioso (não editando)
- **THEN** o botão "Editar" usa o estilo verde padrão do app

#### Scenario: Salvar e Cancelar em edição

- **WHEN** o card de Alocação está em modo de edição
- **THEN** o botão "Salvar" usa o estilo verde padrão
- **AND** o botão "Cancelar" usa o estilo de contorno secundário

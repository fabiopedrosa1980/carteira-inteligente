## ADDED Requirements

### Requirement: Ocultar valores também mascara os totais dos acordeões por grupo

Na aba "Meus Ativos" (portfolio), quando os valores estão ocultos (botão olho), os **totais por grupo** exibidos nos cabeçalhos dos acordeões da visão em lista (Ações/FIIs/ETFs) SHALL ser mascarados visualmente com o mesmo tratamento dos demais valores (blur), sem revelar os números e preservando o layout do acordeão (rótulo do grupo, contagem e chevron permanecem visíveis).

#### Scenario: Ocultar mascara os totais dos acordeões
- **WHEN** os valores estão visíveis e o usuário aciona o botão olho na aba Meus Ativos
- **THEN** o total ("Total: R$ …") no cabeçalho de cada acordeão por grupo passa a ficar mascarado
- **AND** o rótulo do grupo, a contagem e o chevron continuam visíveis

#### Scenario: Exibir revela os totais dos acordeões
- **WHEN** os valores estão ocultos e o usuário aciona o botão olho
- **THEN** os totais dos acordeões por grupo voltam a ser exibidos normalmente

#### Scenario: Layout do acordeão preservado ao ocultar
- **WHEN** os valores estão ocultos
- **THEN** o cabeçalho do acordeão mantém o mesmo tamanho e posição
- **AND** não há rolagem horizontal

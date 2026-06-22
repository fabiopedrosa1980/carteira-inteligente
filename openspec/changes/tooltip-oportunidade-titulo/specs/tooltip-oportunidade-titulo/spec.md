## ADDED Requirements

### Requirement: Título do tooltip de oportunidade

O tooltip de oportunidade da tabela Meus Ativos SHALL exibir, no topo, o título "Oportunidade". O título NÃO SHALL repetir o termo "Preço-teto", que já figura como um dos campos de dados do tooltip.

#### Scenario: Título exibido

- **WHEN** o tooltip de oportunidade é aberto para qualquer ativo
- **THEN** o texto do título no topo é "Oportunidade"

#### Scenario: Sem duplicação de "Preço-teto"

- **WHEN** o tooltip é exibido para um ativo com veredito numérico
- **THEN** o termo "Preço-teto" aparece apenas como rótulo de um dos campos, não como título do tooltip

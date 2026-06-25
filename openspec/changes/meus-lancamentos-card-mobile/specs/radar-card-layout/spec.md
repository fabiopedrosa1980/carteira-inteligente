## MODIFIED Requirements

### Requirement: Tag de destaque ao lado do mês no card do Radar

No card de mês do Radar de proventos (visão em cards), a tag de destaque ("Melhor mês" ou "Oportunidade") SHALL ser exibida **na mesma linha do nome do mês** (no cabeçalho do card), com a contagem de ativos alinhada à direita. A tag MUST quebrar de linha graciosamente em cards estreitos, permanecendo legível e contida, sem rolagem horizontal. A tag de oportunidade MUST exibir o texto curto "Oportunidade".

Em **mobile (largura ≤600px)**, a tag de destaque SHALL exibir **somente o ícone** (estrela para "Melhor mês"; triângulo de atenção para "Oportunidade"), **ocultando o texto**, para economizar espaço no cabeçalho estreito. O ícone MUST permanecer acessível (com rótulo textual disponível via `title`/`aria-label`). No desktop o texto da tag permanece visível ao lado do ícone.

#### Scenario: Tag ao lado do mês

- **WHEN** um card de mês do Radar com tag de destaque é exibido
- **THEN** a tag aparece na mesma linha do nome do mês, no cabeçalho do card
- **AND** a contagem de ativos fica alinhada à direita
- **AND** o conteúdo permanece contido no card, sem estourar

#### Scenario: Somente ícone no mobile

- **WHEN** um card de mês com destaque é exibido em largura ≤600px
- **THEN** a tag exibe apenas o ícone (estrela ou triângulo de atenção)
- **AND** o texto ("Melhor mês" / "Oportunidade") não é exibido
- **AND** o rótulo textual permanece disponível por acessibilidade (title/aria-label)

#### Scenario: Texto visível no desktop

- **WHEN** um card de mês com destaque é exibido em largura > 600px
- **THEN** a tag exibe o ícone seguido do texto ("Melhor mês" ou "Oportunidade")

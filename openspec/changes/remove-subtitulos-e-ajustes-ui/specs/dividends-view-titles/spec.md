## MODIFIED Requirements

### Requirement: Títulos curtos nas telas de Dividendos

As telas de Dividendos SHALL usar títulos curtos — **Histórico**, **Recebidos** e **Projetados** — nas sub-tabs e nos títulos internos das seções, exibindo apenas o texto, sem ícone. Os títulos internos de Recebidos e Projetados NÃO SHALL exibir um subtítulo descritivo abaixo do título.

#### Scenario: Rótulos das sub-tabs
- **WHEN** a aba Dividendos é exibida
- **THEN** as sub-tabs aparecem rotuladas como Histórico, Recebidos e Projetados

#### Scenario: Seções sem subtítulo descritivo
- **WHEN** o usuário abre Recebidos ou Projetados
- **THEN** apenas o título curto é exibido, sem o texto descritivo abaixo

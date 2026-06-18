## MODIFIED Requirements

### Requirement: Títulos curtos nas telas de Dividendos

As telas de Dividendos SHALL usar títulos curtos — **Histórico**, **Recebidos** e **Projetados** — tanto nos rótulos das sub-tabs quanto nos títulos internos das seções. Os títulos internos das seções SHALL exibir apenas o texto, sem ícone.

#### Scenario: Rótulos das sub-tabs
- **WHEN** a aba Dividendos é exibida
- **THEN** as sub-tabs aparecem rotuladas como Histórico, Recebidos e Projetados

#### Scenario: Título interno sem ícone
- **WHEN** o usuário abre Histórico, Recebidos ou Projetados
- **THEN** o título da seção exibe apenas o nome curto correspondente, sem ícone à esquerda

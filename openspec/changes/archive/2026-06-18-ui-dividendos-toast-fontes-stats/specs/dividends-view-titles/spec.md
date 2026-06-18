## ADDED Requirements

### Requirement: Títulos curtos nas telas de Dividendos

As telas de Dividendos SHALL usar títulos curtos — **Histórico**, **Recebidos** e **Projetados** — tanto nos rótulos das sub-tabs quanto nos títulos internos das seções, evitando repetir a palavra "Dividendos" (já presente no header da página).

#### Scenario: Rótulos das sub-tabs
- **WHEN** a aba Dividendos é exibida
- **THEN** as sub-tabs aparecem rotuladas como Histórico, Recebidos e Projetados

#### Scenario: Título interno de cada seção
- **WHEN** o usuário abre Histórico, Recebidos ou Projetados
- **THEN** o título da seção exibe o nome curto correspondente (Histórico / Recebidos / Projetados), preservando o ícone

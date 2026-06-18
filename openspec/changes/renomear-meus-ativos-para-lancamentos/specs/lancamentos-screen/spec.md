## ADDED Requirements

### Requirement: Tela de Lançamentos

A aba/menu que lista os lançamentos por classe de ativo SHALL se chamar "Lançamentos" (na navegação e no título da tela). Os cabeçalhos dos acordeões SHALL usar apenas o nome da classe (Ações, FIIs, ETFs), sem o prefixo "Lançamentos de " e sem ícone antes do rótulo.

#### Scenario: Aba e título "Lançamentos"
- **WHEN** o usuário vê a navegação e abre a tela
- **THEN** o menu e o título exibem "Lançamentos"

#### Scenario: Cabeçalhos de acordeão sem prefixo nem ícone
- **WHEN** os acordeões são exibidos
- **THEN** cada cabeçalho mostra apenas "Ações", "FIIs" ou "ETFs", sem "Lançamentos de " e sem ícone à esquerda

#### Scenario: Referências textuais atualizadas
- **WHEN** uma mensagem menciona a aba de lançamentos
- **THEN** ela se refere a "aba Lançamentos" (não "aba Meus Ativos")

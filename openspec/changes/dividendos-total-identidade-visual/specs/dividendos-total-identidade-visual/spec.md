## ADDED Requirements

### Requirement: Card de total segue a linguagem dos cards de métrica

Nas telas Recebidos e Projetados, o card de total ("Total recebido" / "Total projetado") SHALL seguir a mesma linguagem visual dos cards de métrica do resumo do app: superfície neutra com `var(--card-bg)` e borda `var(--border)`, rótulo em maiúsculas na cor `--text-secondary`, e valor-herói na cor `--text-primary` com numerais tabulares. O card NÃO SHALL usar fundo tingido de verde nem o número na cor de accent.

#### Scenario: Superfície e cores neutras

- **WHEN** a tela Recebidos ou Projetados exibe o card de total
- **THEN** o fundo e a borda do card usam os tokens neutros do app (`--card-bg` / `--border`), o rótulo está em maiúsculas e em `--text-secondary`, e o valor está em `--text-primary`

#### Scenario: Accent apenas no tile de ícone

- **WHEN** o card de total é exibido
- **THEN** a cor de accent aparece apenas no tile de ícone do card, e não no fundo nem no valor

### Requirement: Conteúdo do total preservado

O card SHALL continuar exibindo o rótulo "Total recebido" no modo recebidos e "Total projetado" no modo projetados, com o valor monetário formatado em R$.

#### Scenario: Rótulo por modo

- **WHEN** o card é exibido no modo recebidos
- **THEN** o rótulo é "Total recebido" e o valor é o total formatado em R$

#### Scenario: Rótulo no modo projetados

- **WHEN** o card é exibido no modo projetados
- **THEN** o rótulo é "Total projetado" e o valor é o total formatado em R$

## ADDED Requirements

### Requirement: Conteúdo principal em landmark `<main>`

A aplicação SHALL envolver o conteúdo principal roteado em um landmark `<main>`, de modo que exista exatamente um `<main>` na página. Elementos utilitários globais (toast, diálogo de confirmação) MAY ficar fora do `<main>`.

#### Scenario: Existe um landmark main

- **WHEN** a aplicação é renderizada (qualquer rota)
- **THEN** o conteúdo roteado (`<router-outlet>`) está dentro de um elemento `<main>`

#### Scenario: Lighthouse landmark-one-main passa

- **WHEN** o Lighthouse audita a página
- **THEN** a auditoria `landmark-one-main` passa (documento tem um landmark main)

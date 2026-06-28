## ADDED Requirements

### Requirement: Metadados de documento para SEO e idioma

O documento HTML raiz (`index.html`) SHALL declarar uma `<meta name="description">` descritiva do app e SHALL declarar o idioma correto do conteúdo em `<html lang>`. Como o app é em português do Brasil, `lang` MUST ser `pt-BR`.

#### Scenario: Meta description presente

- **WHEN** o `index.html` é carregado
- **THEN** existe uma tag `<meta name="description" content="...">` não vazia, descrevendo o app

#### Scenario: Idioma correto

- **WHEN** o `index.html` é carregado
- **THEN** `<html lang="pt-BR">` reflete o idioma real do conteúdo

#### Scenario: Lighthouse SEO sem falha de meta description

- **WHEN** o Lighthouse audita a página
- **THEN** a auditoria `meta-description` passa

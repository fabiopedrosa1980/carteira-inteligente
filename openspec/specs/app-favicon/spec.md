# app-favicon Specification

## Purpose
TBD - created by archiving change favicon-marca-carteira. Update Purpose after archive.
## Requirements
### Requirement: Favicon reflete a marca do projeto

A aplicação SHALL exibir, na aba do navegador, um favicon baseado na marca do produto (barras douradas ascendentes na cor `#C9A84C`), e NÃO SHALL usar o favicon padrão do Angular.

#### Scenario: Favicon de marca carregado

- **WHEN** a aplicação é aberta no navegador
- **THEN** o ícone exibido na aba é o das barras douradas da marca, não o logo padrão do Angular

#### Scenario: Ausência do ícone padrão do Angular

- **WHEN** o `public/favicon.ico` do projeto é inspecionado
- **THEN** ele não é mais o arquivo padrão gerado pelo scaffold do Angular

### Requirement: Ícone vetorial primário (SVG)

A aplicação SHALL fornecer um `favicon.svg` vetorial referenciado em `index.html` via `<link rel="icon" type="image/svg+xml">`, garantindo nitidez em qualquer densidade de tela.

#### Scenario: SVG referenciado e acessível

- **WHEN** `index.html` é carregado
- **THEN** existe um `<link rel="icon" type="image/svg+xml" href="favicon.svg">` e o arquivo `public/favicon.svg` existe

### Requirement: Fallback ICO multi-resolução

A aplicação SHALL fornecer um `favicon.ico` contendo ao menos as resoluções 16x16, 32x32 e 48x48, referenciado em `index.html` como fallback para clientes que não suportam SVG.

#### Scenario: ICO de fallback presente

- **WHEN** um navegador que não suporta favicon SVG abre a aplicação
- **THEN** ele carrega o `favicon.ico` de marca a partir da referência em `index.html`


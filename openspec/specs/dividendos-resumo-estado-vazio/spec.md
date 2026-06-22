# dividendos-resumo-estado-vazio Specification

## Purpose
TBD - created by archiving change resumo-cards-mobile-e-dividendos-vazio. Update Purpose after archive.
## Requirements
### Requirement: Estado vazio padronizado no resumo de dividendos

O resumo de dividendos (abas Recebidos e Projetados) SHALL exibir o estado "sem registros" no **mesmo padrão visual** do estado vazio da tela de Histórico de dividendos: um bloco **centralizado** com **ícone** (tinta do accent), **título** em destaque e **texto de apoio** secundário, em vez de um texto solto. A mensagem MUST permanecer adequada ao contexto de proventos (nenhum ativo com proventos para exibir).

#### Scenario: Estado vazio do resumo de dividendos

- **WHEN** o resumo de dividendos é exibido sem nenhum ativo com proventos
- **THEN** é exibido um bloco vazio centralizado com ícone, título e texto de apoio
- **AND** o estilo segue o mesmo padrão usado no estado vazio da tela de Histórico de dividendos

#### Scenario: Conteúdo presente não mostra o estado vazio

- **WHEN** há ao menos um ativo com proventos no resumo
- **THEN** o bloco de estado vazio não é exibido
- **AND** a lista de proventos por ativo é exibida normalmente


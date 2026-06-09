## ADDED Requirements

### Requirement: Componentes Angular com arquivos de template e estilo separados
Cada componente standalone SHALL ter seu template em um arquivo `.html` dedicado referenciado via `templateUrl` e seus estilos em um arquivo `.scss` dedicado referenciado via `styleUrls`, na mesma pasta do arquivo `.ts`.

#### Scenario: Template extraído para arquivo dedicado
- **WHEN** o decorator `@Component` de um componente é inspecionado
- **THEN** a propriedade `template` não existe e `templateUrl` aponta para `./<component-name>.html` na mesma pasta

#### Scenario: Estilos extraídos para arquivo dedicado
- **WHEN** o decorator `@Component` de um componente é inspecionado
- **THEN** a propriedade `styles` não existe e `styleUrls` aponta para `./<component-name>.scss` na mesma pasta

#### Scenario: Comportamento visual idêntico após separação
- **WHEN** a aplicação é executada após a refatoração
- **THEN** a aparência e funcionalidade de todos os componentes são idênticas ao estado anterior

#### Scenario: Arquivos criados para todos os componentes
- **WHEN** os arquivos do diretório `src/app/components/` são listados
- **THEN** existem arquivos `.html` e `.scss` para cada um dos 5 componentes: `dashboard`, `stock-card`, `dividend-calendar`, `best-month`, `add-stock-modal`

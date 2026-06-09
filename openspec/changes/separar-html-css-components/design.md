## Context

O projeto usa Angular standalone components. Atualmente todos os 5 componentes têm template e estilos definidos inline no decorator `@Component` usando as propriedades `template` e `styles`. Isso concentra três responsabilidades distintas em um único arquivo `.ts`, dificultando a leitura e edição isolada de HTML ou CSS.

## Goals / Non-Goals

**Goals:**
- Extrair o conteúdo de `template` para um arquivo `.html` e referenciar via `templateUrl`.
- Extrair o conteúdo de `styles` para um arquivo `.scss` e referenciar via `styleUrls`.
- Manter o comportamento e aparência da aplicação 100% idênticos.
- Aplicar a separação nos 5 componentes: `dashboard`, `stock-card`, `dividend-calendar`, `best-month`, `add-stock-modal`.

**Non-Goals:**
- Refatorar a lógica TypeScript dos componentes.
- Alterar estilos ou templates existentes.
- Converter arquivos `.css` para `.scss` com variáveis ou mixins — apenas renomear a extensão para `.scss`.
- Adicionar testes ou modificar configuração do build.

## Decisions

**Decisão: usar `.scss` como extensão dos arquivos de estilo**
Angular suporta `.scss` nativamente no projeto (o `angular.json` define `schematics.@schematics/angular:component.style: scss`). Manter consistência com o padrão do projeto.

**Decisão: um par de arquivos por componente na mesma pasta**
Cada componente fica em `src/app/components/<nome>/` com três arquivos: `<nome>.ts`, `<nome>.html`, `<nome>.scss`. Não criar subpastas adicionais.

**Decisão: `styleUrls` como array de um elemento**
A convenção Angular é `styleUrls: ['./dashboard.scss']`. Mantém compatibilidade com ferramentas de linting e schematics.

## Risks / Trade-offs

- [Risco: regressão visual] → Mitigação: nenhuma alteração de conteúdo CSS/HTML; apenas mover texto entre arquivos. Verificar visualmente no browser após cada componente extraído.
- [Risco: caminho errado em `templateUrl`/`styleUrls`] → Mitigação: usar sempre caminho relativo (`./`) na mesma pasta do `.ts`.

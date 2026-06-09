## Why

Os 5 componentes Angular do projeto (`dashboard`, `stock-card`, `dividend-calendar`, `best-month`, `add-stock-modal`) têm template HTML e estilos CSS embutidos diretamente no arquivo `.ts`, tornando os arquivos longos e difíceis de manter. Separar esses artefatos em arquivos dedicados (`.html` e `.scss`) segue as convenções Angular e melhora a legibilidade e manutenibilidade.

## What Changes

- Cada componente ganhará um arquivo `<component>.html` com o template extraído do decorator.
- Cada componente ganhará um arquivo `<component>.scss` com os estilos extraídos do decorator.
- Nos decorators `@Component`, `template:` será substituído por `templateUrl:` e `styles:` por `styleUrls:` apontando para os novos arquivos.
- Nenhuma alteração funcional ou de comportamento será feita — é refatoração pura.

Componentes afetados:
- `src/app/components/dashboard/dashboard.ts`
- `src/app/components/stock-card/stock-card.ts`
- `src/app/components/dividend-calendar/dividend-calendar.ts`
- `src/app/components/best-month/best-month.ts`
- `src/app/components/add-stock-modal/add-stock-modal.ts`

## Capabilities

### New Capabilities

- `component-file-separation`: Separação de templates e estilos dos componentes Angular em arquivos `.html` e `.scss` dedicados.

### Modified Capabilities

## Impact

- Apenas arquivos dentro de `src/app/components/` são afetados.
- Sem mudanças de API, serviços, modelos ou dependências externas.
- O build Angular continuará funcionando normalmente com `templateUrl` e `styleUrls`.

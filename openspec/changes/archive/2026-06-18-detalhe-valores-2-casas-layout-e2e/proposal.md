## Why

Os indicadores fundamentalistas vêm do Investidor10 como strings (ex.: "12,3456", "8,5%"), com casas decimais inconsistentes, poluindo a tela de detalhes. Além disso, o posicionamento de alguns elementos pode ser refinado para um acabamento mais profissional. Por fim, não há nenhuma rede de segurança automatizada: um teste valida que o layout da tela de detalhes não quebra.

## What Changes

- **Formatação:** os valores dos **indicadores** na tela de detalhes passam a exibir **no máximo 2 casas decimais**, preservando sufixos/unidades (ex.: `%`).
- **Layout:** revisar o posicionamento/alinhamento dos elementos da tela de detalhes aplicando a skill de frontend-design (mantendo a identidade do app: figuras em fonte monoespaçada, números tabulares, tokens de tema). Os **indicadores** ficam dispostos em **4 cards por linha** (responsivo: reduz a 2 colunas em telas estreitas).
- **Teste:** adicionar um teste de componente (Playwright component testing) para o `StockDetailsModalComponent` que valida o layout — elementos presentes, grid de indicadores, valores com ≤2 casas e ausência de overflow horizontal.

## Capabilities

### New Capabilities
<!-- Nenhuma capability nova. -->

### Modified Capabilities
- `stock-details-view`: valores dos indicadores com ≤2 casas, posicionamento refinado e cobertura por teste de layout.

## Impact

**Frontend (este repo):**
- `src/app/components/stock-details-modal/*` — helper de formatação (≤2 casas) e ajustes de HTML/SCSS de posicionamento.
- Nova infraestrutura de teste de componente: `@playwright/experimental-ct-angular` + `@playwright/test`, `playwright-ct.config.ts`, `playwright/index.{html,ts}`, e o spec do componente.
- `package.json` — devDependencies de teste + script `test:ct`.

## Why

No card de ativo da aba **Meus Ativos** em mobile, o **Saldo** é renderizado como "número-herói" com fonte de 23px, bem maior que o ticker (16px). Esse contraste deixa o Saldo desproporcional dentro do card. O usuário quer reduzir a fonte do Saldo para o **mesmo tamanho da fonte do ticker**, equilibrando a hierarquia do card.

## What Changes

- Reduzir a fonte do **Saldo** no card mobile de Meus Ativos de 23px para **16px**, igualando-a à fonte do ticker (`.cell-ativo`). Peso e demais propriedades permanecem.
- Sem mudança de comportamento, dados ou layout de grid — apenas o tamanho da fonte do Saldo.

## Capabilities

### New Capabilities
<!-- Nenhuma. -->

### Modified Capabilities
- `meus-ativos-card-mobile-layout`: passa a especificar que a fonte do Saldo no card mobile tem o mesmo tamanho da fonte do ticker (antes o tamanho do Saldo não era normatizado e era maior, como número-herói).

## Impact

- **Componente**: `src/app/components/dashboard/dashboard.scss` (regra do Saldo no card mobile, `td:nth-child(6)`).
- **Sem impacto** em HTML, serviços, modelos, rotas, API ou estado. Nenhuma dependência nova.
- Afeta somente a largura ≤640px (card mobile); o desktop não muda.

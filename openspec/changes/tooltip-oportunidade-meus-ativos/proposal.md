## Why

Na tabela de **Meus Ativos** (Dashboard), a coluna "Oportunidade" mostra apenas um badge resumido (ex.: `🟢 −18%`). Para entender o que esse número significa, o usuário precisa clicar na linha e abrir a tela de detalhe (seção "Preço-teto"). Um tooltip/popover ao passar o mouse sobre o indicador entrega esse contexto na hora, sem tirar o usuário da lista.

## What Changes

- Ao passar o mouse (hover) sobre o badge da coluna "Oportunidade" em Meus Ativos, exibir uma "alt janela" (tooltip/popover) com os dados de preço-teto do ativo — os mesmos já apresentados na seção "Preço-teto" da tela de detalhe.
- Conteúdo do tooltip (reaproveitando `precoTetoOf(stock)`): cinco campos, cada um com rótulo de texto + valor — Yield-alvo, Preço-teto, Preço justo, DPA (12m) (rotulado "Rendimento (12m)" para FIIs) e Preço atual vs teto. Sem veredito de zona e sem P/VP.
- Estados sem veredito numérico são respeitados: `sem-dados` (⚪) mostra a mensagem de histórico insuficiente; `na` (ETF) indica que não se aplica.
- Comportamento somente de leitura, sem alterar o cálculo de preço-teto nem a navegação por clique existente (clicar continua abrindo o detalhe).

## Capabilities

### New Capabilities
- `meus-ativos-oportunidade-tooltip`: tooltip/popover exibido no hover do indicador de oportunidade da tabela Meus Ativos, com o detalhamento de preço-teto do ativo.

### Modified Capabilities
<!-- Nenhuma alteração de requisitos em specs existentes. O cálculo (preco-teto-calculo) e a exibição no detalhe (preco-teto-exibicao) permanecem inalterados. -->

## Impact

- `src/app/components/dashboard/dashboard.html` — célula `cell-oportunidade` ganha o gatilho de hover e o markup do tooltip.
- `src/app/components/dashboard/dashboard.ts` — reaproveita `precoTetoOf`/`zonaOf`; pode expor helpers de rótulo (veredito, desconto) para o tooltip.
- `src/app/components/dashboard/dashboard.scss` — estilos do tooltip/popover.
- Sem mudanças de backend, modelos de dados ou dependências. Sem breaking changes.

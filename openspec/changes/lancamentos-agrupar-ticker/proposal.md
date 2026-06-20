## Why

A tela de Lançamentos lista cada operação separadamente. Quando há vários lançamentos do mesmo ativo, fica difícil ver a **posição consolidada** (quantas cotas no total e qual o **preço médio**). Uma opção de **agrupar por ticker** resolve isso: soma as quantidades e calcula o preço médio ponderado por ativo.

## What Changes

- Adicionar um **alternador "Agrupar por ticker"** no topo da tela de Lançamentos.
- Quando ativado, cada seção (Ações/FIIs/ETFs) exibe **uma linha por ticker**: quantidade somada, **preço médio ponderado** (custo total ÷ quantidade total), valor total e o número de lançamentos do ticker.
- Quando desativado, mantém a lista detalhada atual (uma linha por lançamento, com editar/remover).
- No modo agrupado, sem editar/remover por linha (é um agregado) e sem coluna de data. A escolha é **lembrada** entre sessões.

## Capabilities

### Added Capabilities
- `lancamentos-agrupar-ticker`: consolidação opcional dos lançamentos por ativo (soma de quantidade + preço médio ponderado) na tela de Lançamentos.

## Impact

**Frontend (este repo):**
- `src/app/components/my-assets/my-assets.ts` — estado `grouped` (persistido) e `groupedData` (computed) por seção.
- `src/app/components/my-assets/my-assets.html` — alternador + tabela agrupada (condicional).
- `src/app/components/my-assets/my-assets.scss` — estilo do alternador e da tabela agrupada.

Sem backend (cálculo no cliente a partir dos lançamentos já carregados).

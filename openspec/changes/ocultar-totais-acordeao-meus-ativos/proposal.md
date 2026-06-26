## Why

O botão "olho" de **ocultar valores** já mascara os cards de resumo, o card de alocação e (recentemente) os totais da tela de Lançamentos. Porém, na aba **Meus Ativos** (portfolio), os **totais por grupo nos acordeões da visão em lista** (Ações/FIIs/ETFs) continuam visíveis ao ocultar — eles ficam fora do bloco `.portfolio-summary` e não recebem a máscara. Isso vaza justamente os subtotais que o usuário quer esconder ao usar o recurso.

## What Changes

- Ao acionar "ocultar valores" na aba Meus Ativos, os **totais dos acordeões por grupo** (`groupSaldo`, exibidos como "Total" no cabeçalho de cada acordeão da visão em lista) SHALL também ser mascarados (mesmo tratamento de blur já usado nos cards de resumo, alocação e Lançamentos).
- Ao exibir novamente, os totais dos acordeões voltam a aparecer normalmente.
- Sem mudança de comportamento, dados ou cálculo — apenas a máscara visual passa a cobrir esses totais.

## Capabilities

### New Capabilities
<!-- Nenhuma. -->

### Modified Capabilities
- `meus-ativos-ocultar-valores`: o recurso de ocultar valores passa a cobrir também os totais por grupo dos acordeões da visão em lista na aba Meus Ativos (antes só cobria os cards de resumo).

## Impact

- **Componente**: `src/app/components/dashboard/dashboard.html` (binding `values-hidden` na lista de acordeões da aba Meus Ativos) e `src/app/components/dashboard/dashboard.scss` (regra de blur para o total do acordeão).
- **Sem impacto** em serviços, modelos, rotas, API ou no estado `valoresOcultos` (que já existe e é compartilhado). Nenhuma dependência nova.
- A tela de Lançamentos já cobre seus próprios totais e não muda.

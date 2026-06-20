## Why

Na tela de Lançamentos, a tabela **agrupada por ticker** se transforma em cards empilhados (rótulo: valor) no mobile, divergindo da web, que mostra uma tabela em colunas. O usuário quer o **mesmo comportamento da web** — tabela em colunas — também no mobile, **sem rolagem horizontal**.

## What Changes

- **Tabela agrupada vira tabela (não cards) no mobile**: remover a transformação em cards empilhados (`display:block` + rótulos `::before`) da visão agrupada.
- **Colunas compactas para caber sem scroll**: no mobile, a tabela agrupada exibe **Ativo · Qtd · Total**, ocultando **Preço médio** e **Lançamentos** (mesma estratégia da tabela detalhada, que já oculta Data e Preço unitário no mobile).
- Cabeçalho de colunas visível no mobile (como na web), com os rótulos das colunas ocultas também escondidos.

## Capabilities

### New Capabilities
- `lancamentos-agrupados-mobile`: comportamento da tabela agrupada por ticker no mobile — tabela em colunas (igual à web), compacta e sem rolagem horizontal.

### Modified Capabilities
<!-- Nenhuma capability já versionada em openspec/specs/ cobre esta tabela. -->

## Impact

- `src/app/components/my-assets/my-assets.scss` — remover o bloco mobile que transforma `.transactions-table.grouped` em cards empilhados; adicionar regra mobile que mantém a grade em colunas (Ativo · Qtd · Total) e oculta Preço médio e Lançamentos no cabeçalho e nas linhas.
- `src/app/components/my-assets/my-assets.html` — sem mudança estrutural esperada (mesma marcação de tabela); ajustes só se necessário para alinhar cabeçalho/colunas.
- Apenas estilos; sem mudança em serviços, modelos ou API. A tabela detalhada (não agrupada) permanece como está.

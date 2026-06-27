## Why

Duas lacunas de UX:

1. O "ocultar valores" (olho do menu superior) hoje mascara apenas os totais de seção e o total do cabeçalho, mas deixa visíveis o **Saldo** por ativo (Dashboard "Meus Ativos") e o **Total da operação** por lançamento (Lançamentos). Isso vaza justamente os valores monetários mais sensíveis quando o usuário quer privacidade na tela.
2. No mobile (visão em cards), a tela de **Lançamentos** usa um botão "+" minúsculo no rodapé de cada card para adicionar, enquanto o botão "Adicionar" da seção fica oculto. Isso é inconsistente com o resto do app e pouco descobrível.

## What Changes

- Estender o mascaramento de "ocultar valores" para cobrir, por linha:
  - **Saldo** de cada ativo na tabela "Meus Ativos" do Dashboard (incluindo o card mobile).
  - **Total** (total da operação = qtd × preço) de cada lançamento na tela Lançamentos (incluindo o card mobile).
- Na tela **Lançamentos** no mobile (cards):
  - **Exibir** o botão "Adicionar" no final da seção de cada tipo (Ações/FIIs/ETFs), igual ao desktop.
  - **Remover** o botão "+" (`btn-add-card`) do rodapé de cada card.

## Capabilities

### New Capabilities
<!-- Nenhuma capability nova. -->

### Modified Capabilities
- `ocultar-valores-global`: torna explícito e efetivo o mascaramento do **Saldo por ativo** (Meus Ativos) e do **Total da operação por lançamento** (Lançamentos), que hoje vazam apesar da intenção do spec de ocultar saldos/totais.
- `lancamentos-botao-adicionar-secao`: no **mobile**, o ponto de adição passa a ser o botão **"Adicionar"** no rodapé da seção (antes oculto no mobile); o botão **"+"** por card é removido.

## Impact

- **Arquivos**:
  - `src/app/components/dashboard/dashboard.html` + `dashboard.scss` (classe no `td` de Saldo e regra de blur sob `.values-hidden`).
  - `src/app/components/my-assets/my-assets.scss` (blur do `.total-cell`; exibir `.add-row` no mobile; remover/ocultar `.btn-add-card`).
  - `src/app/components/my-assets/my-assets.html` (remover o botão `btn-add-card`).
- **Sem** mudança de lógica/serviços; alterações são de template/estilo.
- **Sem** impacto em API, estado ou modelos.

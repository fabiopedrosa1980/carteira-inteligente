## Why

No mobile, todas as ações de tela viram **blocos full-width empilhados** (`goals.scss:356`, `allocation-card.scss:53`, `add-transaction-modal.scss:304`, `add-stock-modal.scss`). Quatro papéis muito diferentes — Incluir, Cancelar, Salvar e Editar — recebem o **mesmo peso visual**, o que quebra a hierarquia (a regra é: uma ação primária por tela, obviamente mais forte que o resto).

Os dois casos que mais incomodam:

- O **"Editar" do card de Alocação** é um botão verde do tamanho de um CTA só para **alternar** o modo de edição — quando o app já tem o idioma certo para isso (o botão-ícone de lápis das linhas das listas).
- O **"Cancelar"** aparece empilhado com o mesmo tamanho do primário (Salvar/Criar), dobrando a altura da barra de ações sem necessidade.

## What Changes

- **Editar (card de Alocação) → botão-ícone no cabeçalho** (`.alloc-head`, à direita do título/patrimônio), em **todas as larguras**. Reusa `--icon-btn-size` (36px) e o tint azul suave `--btn-edit-fg`, ficando idêntico ao lápis das linhas de lista. Some o botão de texto "Editar" do rodapé.
- **Cancelar/Salvar lado a lado com hierarquia no mobile** (≤600px; modais ≤480px): em vez de empilhar full-width, os dois ficam na mesma linha — `Cancelar` como **ghost** de largura mínima (`flex: 0 0 auto`) e o **primário** (Salvar/Criar/Adicionar) dominando a linha (`flex: 1`), à direita. Ambos com `min-height: 44px`.
- **Incluir/Adicionar (empty state e rodapé de seção) permanecem full-width** — é genuinamente a ação primária da seção, então o peso é correto.
- Aplica em: card de Alocação (edição), formulário de Metas, modal de Lançamento e modal de Adicionar Lançamentos.
- **Sem mudança de comportamento, dados ou API** — apenas arranjo/estilo e a posição do gatilho de edição.

## Capabilities

### New Capabilities
- `acoes-form-hierarquia-mobile`: define o arranjo dos pares Cancelar/primário nos formulários e modais no mobile (lado a lado, com hierarquia, em vez de empilhados com peso igual).

### Modified Capabilities
- `alocacao-acoes-no-rodape`: o gatilho **Editar** passa a ser um botão-ícone no **cabeçalho** do card (não mais um botão de texto no rodapé). Salvar/Cancelar continuam no rodapé durante a edição, agora no idioma de hierarquia lado a lado no mobile.

## Impact

- **Componentes**:
  - `src/app/components/allocation-card/allocation-card.html` — move o gatilho de edição para `.alloc-head`; `.alloc-actions` passa a conter só Cancelar/Salvar (visível na edição).
  - `src/app/components/allocation-card/allocation-card.scss` — estilo do ícone no header; `.alloc-actions` mobile deixa de empilhar (row com hierarquia).
  - `src/app/components/goals/goals.scss` — `.form-actions` mobile: row com hierarquia em vez de `column-reverse` full-width.
  - `src/app/components/add-transaction-modal/add-transaction-modal.scss` e `src/app/components/add-stock-modal/add-stock-modal.scss` — `.modal-footer` mobile: row com hierarquia.
- **Sem impacto** em serviços, modelos, rotas, API ou estado. Nenhuma dependência nova.
- Parte A (Editar → ícone) afeta todas as larguras; parte B1 (hierarquia Cancelar/Salvar) afeta só mobile — o desktop dos formulários/modais não muda.

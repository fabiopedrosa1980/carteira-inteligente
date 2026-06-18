## Why

No modal de lançamento, é possível salvar mesmo quando o ticker informado não foi encontrado (inválido), gerando lançamentos com ativos inexistentes. O botão Salvar deve ficar desabilitado até o ticker ser válido. Além disso, o botão "Adicionar" dos acordeões está centralizado; o usuário prefere alinhado à esquerda.

## What Changes

- No modal "Adicionar/Editar Lançamento", **desabilitar o botão Salvar quando o ticker for inválido** (não encontrado, ainda carregando ou vazio). Em modo edição, o ticker é fixo e não bloqueia.
- Alinhar o **botão "Adicionar" dos acordeões à direita**.

## Capabilities

### New Capabilities
- `lancamento-modal-validation`: Salvar habilitado apenas com ticker válido.

### Modified Capabilities
<!-- Nenhuma capability de requisito existente (não arquivada) é alterada. -->

## Impact

**Frontend (este repo):**
- `src/app/components/add-transaction-modal/add-transaction-modal.{ts,html}` — getter de validade do ticker e `[disabled]` do Salvar.
- `src/app/components/my-assets/my-assets.scss` — `.add-row` alinhado à esquerda.

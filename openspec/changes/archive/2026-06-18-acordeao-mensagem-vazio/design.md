## Context

`my-assets.html` no `accordion-inner` hoje tem: `transactions-table` (`*ngIf="length > 0"`) e `.add-row` (botão "Adicionar" à direita). Não há mais estado vazio (foi removido anteriormente). `sectionData()[sec.id].length === 0` indica seção vazia.

## Decisions

**1. Mensagem de vazio.** Adicionar, no `accordion-inner`, um `<p class="empty-msg" *ngIf="sectionData()[sec.id].length === 0">Nenhum lançamento cadastrado</p>` antes do `.add-row`. O botão "Adicionar" permanece (à direita) em ambos os casos.

**2. Estilo.** `.empty-msg` discreto: `font-size: 13px; color: var(--text-secondary); padding: 16px 20px`.

## Risks / Trade-offs

- [Mensagem + botão no vazio] → é o pedido; layout simples (mensagem acima, botão à direita).
- [Texto] → "Nenhum lançamento cadastrado" (genérico). Poderia incluir a classe, mas o título do acordeão já indica.

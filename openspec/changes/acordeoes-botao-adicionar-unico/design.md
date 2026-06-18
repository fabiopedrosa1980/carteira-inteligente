## Context

`my-assets.html` hoje tem três botões de adicionar:
- Cabeçalho: `.btn-add-transaction` "Adicionar Lançamento" → `openAdd()`.
- Estado vazio: `.empty-state` (ícone + "Nenhum lançamento em {short}") com `.btn-add-inline` "Adicionar" → `openAdd(sec.id)`.
- Rodapé da tabela: `.table-footer` com `.btn-add-inline` "Adicionar em {short}" → `openAdd(sec.id)`.

`openAdd(sec.id)` abre o modal já com a classe pré-selecionada; `openAdd()` abre sem classe.

## Decisions

**1. Botão único por acordeão.** Reestruturar o `accordion-inner` para sempre terminar com uma linha de adicionar centralizada:
```html
<div class="accordion-inner">
  <div class="transactions-table" *ngIf="length > 0"> … linhas … </div>
  <div class="add-row">
    <button class="btn-add-inline" (click)="openAdd(sec.id)">
      <svg plus/> Adicionar
    </button>
  </div>
</div>
```
O botão usa `openAdd(sec.id)` (mantém a classe pré-selecionada). Remove-se o `.empty-state` (ícone + mensagem) e o `.table-footer` antigo.

**2. Remover o botão do topo.** Excluir `.btn-add-transaction` do `.page-header`; o header fica só com título + subtítulo.

**3. Centralização.** `.add-row { display: flex; justify-content: center; padding: 12px }`. O `.btn-add-inline` mantém o estilo atual (com ícone "+").

**4. Limpeza de SCSS.** Remover `.btn-add-transaction` e `.empty-state`/`.empty-icon`/`.empty-text` se não houver outros usos; manter `.btn-add-inline`.

## Risks / Trade-offs

- [Perda da mensagem de estado vazio] → decisão do usuário (só o botão). O contexto (qual classe) está no título do acordeão.
- [Remover o CTA do topo] → adicionar passa a ser feito pelo botão de cada acordeão (classe já pré-selecionada), o que é até mais direto.
- [SCSS órfão] → verificar e remover regras sem uso para não deixar lixo.

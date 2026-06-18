## Context

Inspeção da página real do Investidor10:
- A seção "Informações sobre a empresa" usa `.cell` com `<span class="title">` + `<span class="value">` contendo `.simple-value`/`.detail-value` — é o que o scraper atual captura (errado).
- Os indicadores fundamentalistas ficam em `#table-indicators`, com estrutura distinta:
  ```html
  <div id="table-indicators" ...>
    <div class="cell">
      <span class="d-flex ...">P/L <i class="popover-trigger" data-content="..."></i></span>
      <div class="value d-flex ..."><span> 4,60 </span><div class="text-right"><i .../></div></div>
      <div><span class="sector-medias sector">Setor: <span class="destaque">3,22</span></span> ...</div>
    </div>
    ...
  </div>
  ```
  O rótulo é o **primeiro `<span>`** da `.cell` (sem classe "title"); o valor é o **primeiro `<span>` dentro de `.value`** ("4,60"); as médias de Setor/Subsetor ficam num `<div>` separado e devem ser ignoradas.

O scraper atual exige `findFirstByClass(cell, "title")`, que não existe nessa seção — por isso a captura cai na seção de informações da empresa.

## Goals / Non-Goals

**Goals:**
- Capturar os indicadores fundamentalistas de `#table-indicators`.
- Ignorar médias de Setor/Subsetor (usar o valor do ativo).
- Organizar a tela para rótulos fundamentalistas (alguns longos).

**Non-Goals:**
- Capturar dados de "Informações sobre a empresa" (deixa de ser exibido nos indicadores).
- Adicionar a comparação Setor/Subsetor (fora do escopo).

## Decisions

**1. Escopar e adaptar o scraper (backend).**
Reescrever `extractIndicators(doc)` para:
- Localizar o nó com `id="table-indicators"` via novo helper `findFirstByID`.
- Para cada `.cell` dentro dele: rótulo = texto do **primeiro `<span>`** da cell (novo helper `firstSpanText`), com `collapseSpaces`; valor = texto do **primeiro `<span>` dentro do nó `.value`** (fallback para `nodeText(.value)`).
- Dedup por rótulo; ignorar entradas vazias. As médias de Setor/Subsetor não entram porque só lemos o `<span>` do `.value`.
Remover a lógica de `.title`/`.simple-value` (era da seção errada). Manter `hasClass`, `findFirstByClass`, `collapseSpaces`, `nodeText`.

**2. Organização da tela (frontend).**
No `.i-label`, permitir quebra em até 2 linhas (`white-space: normal; line-clamp` 2 com `-webkit-line-clamp`) em vez de `nowrap + ellipsis` que cortava rótulos longos; manter `.i-value` em nowrap/tabular. Manter grid de 4 colunas e alinhamento.

**3. Re-scrape.**
Após o deploy, o boot/sync recaptura e re-persiste os indicadores corretos.

## Risks / Trade-offs

- [Estrutura do Investidor10 muda] → Best-effort; se `#table-indicators` não existir/mudar, retorna vazio e a tela não quebra. Validar contra a página real.
- [Primeiro `<span>` não ser o rótulo em algum card atípico] → Aceitável; cobre o padrão observado. Itens sem valor numérico são ignorados se vazios.
- [Dados antigos no banco] → Recapturados no próximo boot/sync.

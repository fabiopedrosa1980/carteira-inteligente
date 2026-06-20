## Why

No Radar em **cards**, a estrela do "mês com mais ativos" fica hoje ao lado do **nome do mês**, e a tag **"Melhor mês"** aparece sem estrela. Faz mais sentido a estrela acompanhar o texto que ela qualifica: **"★ Melhor mês"**. Assim o nome do mês fica limpo e o destaque vira um conjunto coeso.

## What Changes

- Mover o ícone de **estrela** do `.rc-month` (ao lado do label do mês) para **dentro da tag "Melhor mês"** (`.rc-tag-top`), **antes do texto**.
- O nome do mês passa a ser exibido sem a estrela.
- Vale apenas para a **visualização em cards**; a matriz não muda.

## Capabilities

### Modified Capabilities
- `dividends-radar`: na visão em cards, a estrela do melhor mês passa a anteceder o texto "Melhor mês" (em vez de ficar junto ao nome do mês).

## Impact

**Frontend (este repo):**
- `src/app/components/dividends-radar/dividends-radar.html` — remover o `<svg class="ic-star">` do `.rc-month`; adicioná-lo no início da tag `.rc-tag-top`.

Sem mudança de TS/SCSS (a estrela herda a cor da tag) nem backend.

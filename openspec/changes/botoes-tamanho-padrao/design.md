## Context

Os botões de ícone hoje têm tamanhos próprios por componente:

- `dashboard.scss` `.icon-btn` (cabeçalho): 36×36, raio 9, ícone 18; mobile 32 (≤600) e 30 (≤480).
- `goals.scss` `.icon-btn` (editar/excluir meta): 30×30, raio 6, ícone 16; mobile 28 (≤480).
- `my-assets.scss` `.btn-edit`/`.btn-remove`: 30×30, raio 6, ícone 16.
- 3 modais `.close-btn` (add-stock, add-transaction, confirm-dialog): 36×36.

Não há tokens compartilhados; cada componente repete medidas e breakpoints.

## Goals / Non-Goals

**Goals:**
- Um tamanho único (34px desktop / 32px mobile), raio 8, ícone 18, para todos os botões de ícone.
- Centralizar em tokens CSS, com a redução mobile num único lugar.

**Non-Goals:**
- Botões de paginação (`.pag-btn`) e botões com texto.
- Mudar fundo/borda contextual (chip do cabeçalho vs. botão sem fundo em linha) — só tamanho/raio/ícone.
- Refatorar nomes de classe ou HTML.

## Decisions

### D1: Tokens CSS globais em `styles.scss`
```
:root {
  --icon-btn-size: 34px;
  --icon-btn-radius: 8px;
  --icon-btn-icon: 18px;
}
@media (max-width: 600px) {
  :root { --icon-btn-size: 32px; }
}
```
Os botões usam `width/height: var(--icon-btn-size)`, `border-radius: var(--icon-btn-radius)` e `svg { width/height: var(--icon-btn-icon) }`.
- **Por quê:** a redução mobile fica num único ponto; novos botões herdam o padrão; evita drift.
- **Alternativa descartada:** classe global única `.icon-btn` aplicada via HTML. Rejeitada por exigir alterar templates e por conflitar com `.icon-btn` já existentes nos componentes.

### D2: Remover overrides de tamanho por componente
Tirar as medidas fixas e as media queries de tamanho dos botões de ícone (ex.: 36/32/30 do dashboard; 30/28 do goals), substituindo pelos tokens. Mantém-se cor, fundo e borda de cada um.
- **Por quê:** a fonte da verdade passa a ser o token.

## Risks / Trade-offs

- **Linhas mais altas** → editar/excluir passam de 30 para 34px; pode aumentar levemente a altura das linhas em Metas/Meus Ativos. Aceito pela consistência; validar visualmente.
- **Ícone 18 em botão 32 (mobile)** → continua confortável (área de toque ~32px atende o mínimo recomendado).
- **`.icon-btn` existe em 2 componentes** → ambos passam a referenciar o token; sem colisão pois são escopados por componente.
- **Modais** → garantir que o `.close-btn` aceite os tokens sem quebrar o posicionamento absoluto no canto.

## Migration Plan

1. Adicionar tokens em `styles.scss` (+ media query).
2. Atualizar cada botão de ícone para usar os tokens e remover medidas/overrides próprios.
3. `prettier` + `ng build`; validar visual em desktop e ≤600px (cabeçalho, fechar modal, editar/excluir).
4. Rollback: reverter o commit (mudança isolada em CSS).

## Open Questions

- Nenhuma. Tamanho (34/32), raio (8) e ícone (18) definidos.

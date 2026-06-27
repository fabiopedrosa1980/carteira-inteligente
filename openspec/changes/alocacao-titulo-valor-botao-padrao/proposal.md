## Why

No card de Alocação (exibido em Meus Ativos), o **título**, o **valor** e o **botão Editar** usam estilos próprios que destoam dos demais elementos da tela: o título "Alocação" é maior e mais leve que os títulos de seção, o valor aparece em cinza menor, e o botão Editar é um contorno discreto, diferente do botão verde padrão do app. Isso quebra a consistência visual.

## What Changes

- **Título "Alocação":** passa a usar o padrão dos títulos de seção de Meus Ativos — **15px / peso 700 / `--text-primary`** (igual a `.sec-label`).
- **Valor (patrimônio):** passa a usar o padrão dos valores de seção — **14px / peso 700 / `--accent`** com `tabular-nums` (igual a `.sec-total`).
- **Botão Editar (e Salvar):** passam a usar o **botão verde padrão do app** (`--accent`, texto branco, sem borda, 13px/700, raio 9px), igual ao "Adicionar".
- **Botão Cancelar:** mantém um estilo de **contorno discreto** (secundário), coerente com a hierarquia.

## Capabilities

### New Capabilities
- `alocacao-cabecalho-padrao`: padronização do título, valor e botões do cabeçalho do card de Alocação com os demais elementos de Meus Ativos.

### Modified Capabilities
<!-- Nenhuma capability de spec existente trata desses estilos. -->

## Impact

- **Frontend (SCSS):** `allocation-card.scss` — `.alloc-title h3`, `.alloc-total`, `.alloc-btn` (+ variantes `.ghost`/`.solid`).
- **Sem** mudança de comportamento, dados ou estrutura HTML — apenas estilos.
- Respeita os dois temas (tokens `--accent`, `--text-primary`, `--btn-accent-text`).

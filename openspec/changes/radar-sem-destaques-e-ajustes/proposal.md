## Why

A matriz do Radar ficou poluída com os destaques de coluna (melhor mês / próximo mês + ícone de atenção) — para uma leitura limpa de "quem pagou em cada mês", os destaques distraem. Em telas pequenas, os rótulos de mês ("Jan", "Fev"…) apertam as colunas; a inicial do mês basta. E na aba Histórico, o rótulo curto da coluna de data-com ("Com") é ambíguo — "Dt Com" comunica melhor.

## What Changes

- **Remover os destaques** de coluna da matriz do Radar: sem tint de "melhor mês"/"próximo mês" e sem o ícone de atenção. A matriz fica neutra (só marcas de data-com).
- **Mobile no Radar:** o cabeçalho de meses mostra apenas a **primeira letra** do mês (J, F, M, A, M, J, J, A, S, O, N, D); em telas maiores mantém a abreviação de 3 letras.
- **Histórico:** trocar o rótulo curto (mobile) da coluna de data-com de **"Com"** para **"Dt Com"**.

## Capabilities

### Modified Capabilities
- `dividends-radar`: matriz sem destaques de coluna; no mobile, meses como inicial única.
- `dividend-history`: rótulo curto da coluna de data-com passa de "Com" para "Dt Com".

## Impact

**Frontend (este repo):**
- `src/app/components/dividends-radar/dividends-radar.html` — remover bindings de destaque (`top`/`next`) e o ícone de atenção; cabeçalho com label completa + inicial.
- `src/app/components/dividends-radar/dividends-radar.scss` — remover estilos `.top`/`.next`/`.rm-warn`; media query para mostrar a inicial no mobile.
- `src/app/components/dividends-radar/dividends-radar.ts` — remover `topMonth`/`nextMonth`/`isTopCol`/`isNextCol` (não mais usados); expor as iniciais.
- `src/app/components/dividend-history/dividend-history.html` — `th-short` de "Com" para "Dt Com".

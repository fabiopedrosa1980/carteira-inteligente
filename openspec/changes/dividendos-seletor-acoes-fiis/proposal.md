## Why

Hoje a tela de Dividendos combina Ações e FIIs nas três visões (Histórico, Recebidos, Projetados), misturando classes de ativos com naturezas diferentes (dividendos/JCP vs. rendimentos). O usuário deveria escolher qual classe quer ver — Ações ou FIIs — e a tela carrega apenas os proventos daquele tipo.

## What Changes

- Adicionar um seletor de classe de ativo (**Ações** / **FIIs**) na tela de Dividendos, acima das sub-tabs (Histórico, Recebidos, Projetados).
- Ao escolher a classe, as visões carregam apenas os proventos daquele tipo (Ações via `/transactions/acoes`, FIIs via `/transactions/fiis`).
- Trocar de classe recarrega a visão atual; o padrão inicial é **Ações**.

## Capabilities

### New Capabilities
- `dividends-asset-type-selector`: seleção de classe de ativo (Ações/FIIs) que filtra e recarrega as telas de Dividendos.

### Modified Capabilities
<!-- A capability fii-dividends (não arquivada) tinha comportamento combinado; aqui passa a ser por seleção. Tratado pela nova capability. -->

## Impact

- `src/app/components/dividends/dividends.{ts,html,scss}` — seletor de classe + propaga `assetType` para os filhos.
- `src/app/components/dividend-history/dividend-history.ts` — `@Input() assetType`; carrega só Ações ou só FIIs e recarrega ao trocar.
- `src/app/components/dividends-summary/dividends-summary.ts` — idem para Recebidos/Projetados.

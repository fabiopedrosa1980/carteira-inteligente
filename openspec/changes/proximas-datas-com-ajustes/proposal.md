## Why

Depois de separar Radar em duas abas, a faixa "Próximas datas-com" ficou antes do "Radar de proventos" e com horizonte de 45 dias. Dois problemas:

- **Ordem:** o Radar de proventos (sazonalidade, visão mais usada) deveria vir primeiro; "Próximas datas-com" é complementar e pode ficar **no final**.
- **Horizonte curto:** com 45 dias, só pagadores mensais (FIIs) aparecem; ações trimestrais/semestrais (ex.: BBSE3 com data-com estimada ~56 dias) ficam de fora. A **carteira fica vazia ou quase**. Ampliar para **90 dias** faz a faixa trazer ativos de cadência mais espaçada.

Também queremos **validar que a carteira de fato traz itens** na faixa — confirmar que ativos possuídos aparecem (🟢), não só os do universo.

## What Changes

- Mover a sub-tab **"Próximas datas-com"** para o **final** da lista (depois de "Radar de proventos").
- Aumentar o horizonte da faixa de **45 → 90 dias**.
- Validar que ativos da carteira aparecem na faixa dentro do novo horizonte (marcados como 🟢 possuído).

## Capabilities

### Modified Capabilities
- `proximas-datas-com`: horizonte padrão passa de 45 para 90 dias; a faixa vive na última sub-tab de Dividendos; confirmação de que a carteira contribui com itens.

## Impact

**Frontend (este repo):**
- `src/app/components/dividends/dividends.ts` — reordenar a lista `tabs` (proximas por último).
- `src/app/components/proximas-datas-com/proximas-datas-com.ts` — `HORIZON_DAYS` de 45 para 90.
- Validação: conferir, com os dados reais, que ativos da carteira aparecem na faixa de 90 dias.

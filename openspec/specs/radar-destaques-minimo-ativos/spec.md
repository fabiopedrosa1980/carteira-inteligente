# radar-destaques-minimo-ativos Specification

## Purpose
TBD - created by archiving change lancamento-tipo-por-ticker. Update Purpose after archive.
## Requirements
### Requirement: Destaque de "Próximo mês" exige ao menos 1 ativo

No Radar, o destaque de **"Próximo mês — oportunidade"** SHALL ser exibido apenas quando o mês seguinte tiver **no mínimo 1 ativo** do tipo do usuário marcado naquele mês. Se o próximo mês não tiver nenhum ativo, o destaque MUST NOT ser exibido.

#### Scenario: Próximo mês com ativos

- **WHEN** o mês seguinte tem ao menos 1 ativo do tipo marcado
- **THEN** o destaque de "Próximo mês — oportunidade" é exibido para aquele mês

#### Scenario: Próximo mês sem ativos

- **WHEN** o mês seguinte não tem nenhum ativo marcado
- **THEN** o destaque de "Próximo mês" não é exibido

### Requirement: Destaque de "Melhor mês" exige mais de 1 ativo

No Radar, o destaque de **"Melhor mês"** SHALL ser exibido apenas quando o mês com mais ativos do tipo tiver **mais de 1 ativo** (≥ 2). Com 0 ou 1 ativo no mês de maior contagem, o destaque MUST NOT ser exibido.

#### Scenario: Melhor mês com 2+ ativos

- **WHEN** o mês de maior contagem tem 2 ou mais ativos do tipo
- **THEN** o destaque de "Melhor mês" é exibido naquele mês

#### Scenario: Melhor mês com 1 ativo

- **WHEN** o mês de maior contagem tem apenas 1 ativo
- **THEN** o destaque de "Melhor mês" não é exibido

#### Scenario: Sem ativos no período

- **WHEN** nenhum mês tem ativos marcados
- **THEN** o destaque de "Melhor mês" não é exibido


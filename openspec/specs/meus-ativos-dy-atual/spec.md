# meus-ativos-dy-atual Specification

## Purpose
TBD - created by archiving change preco-teto-zona-de-compra. Update Purpose after archive.
## Requirements
### Requirement: DY atual na lista de Meus Ativos (inline)

A lista de ativos da aba "Meus Ativos" SHALL exibir o **Dividend Yield (DY) atual** de cada ativo **inline, sob o ticker** (não em coluna dedicada), usando o `dividend_yield` já disponível para a posição. O valor MUST ser formatado como percentual. Quando o DY não estiver disponível ou for zero, a exibição MUST usar um indicador neutro (ex.: "—") em vez de um valor enganoso. Por ser inline (e não coluna), o DY aparece tanto no desktop quanto no card mobile sem aumentar a largura da tabela nem causar rolagem horizontal.

#### Scenario: DY exibido sob o ticker

- **WHEN** a lista de Meus Ativos é exibida com ativos que possuem DY
- **THEN** o DY atual aparece inline sob o ticker, formatado como percentual

#### Scenario: DY indisponível

- **WHEN** um ativo não tem DY disponível (ou é zero)
- **THEN** o DY inline exibe um indicador neutro, sem percentual enganoso


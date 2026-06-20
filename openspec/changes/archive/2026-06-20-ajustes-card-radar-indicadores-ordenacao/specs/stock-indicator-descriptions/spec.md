## ADDED Requirements

### Requirement: Ícone "i" com descrição para todos os indicadores fundamentalistas

No detalhe da ação, cada indicador fundamentalista exibido SHALL apresentar um ícone "i" com uma descrição (tooltip) explicando o indicador. O mapa de descrições MUST cobrir os indicadores fundamentalistas comuns fornecidos pela fonte (ex.: P/L, P/VP, P/EBIT, P/Ativo, PSR, EV/EBITDA, EV/EBIT, DY, Payout, ROE, ROA, ROIC, Margem Bruta/EBIT/EBITDA/Líquida, Dívida Líquida/EBITDA, Dívida Líquida/EBIT, Dívida Líquida/Patrimônio, Patrimônio/Ativos, Passivos/Ativos, Liquidez Corrente, Giro de Ativos, LPA, VPA, CAGR de Receitas e Lucros), de modo que indicadores conhecidos não fiquem sem descrição.

#### Scenario: Indicador com descrição

- **WHEN** o detalhe de uma ação com indicadores fundamentalistas é exibido
- **THEN** cada indicador conhecido mostra o ícone "i" com a descrição correspondente no tooltip

#### Scenario: Cobertura ampla

- **WHEN** os indicadores comuns da fonte (Investidor10) são exibidos
- **THEN** todos eles possuem descrição associada (nenhum indicador comum fica sem o ícone "i")

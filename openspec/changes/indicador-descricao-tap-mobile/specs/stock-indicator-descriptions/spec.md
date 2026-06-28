## MODIFIED Requirements

### Requirement: Ícone "i" com descrição para todos os indicadores fundamentalistas

No detalhe da ação, cada indicador fundamentalista exibido SHALL apresentar um ícone "i" com uma descrição explicando o indicador. A descrição MUST ser acessível tanto no **desktop** (via hover do mouse) quanto em **dispositivos touch/mobile** (via toque no ícone "i"). Em touch, tocar no ícone "i" MUST abrir a descrição e tocar novamente, tocar fora ou pressionar Esc MUST fechá-la; abrir uma nova descrição MUST fechar a anterior. O ícone "i" MUST ser um controle acessível (foco por teclado e rótulo acessível). O mapa de descrições MUST cobrir os indicadores fundamentalistas comuns fornecidos pela fonte (ex.: P/L, P/VP, P/EBIT, P/Ativo, PSR, EV/EBITDA, EV/EBIT, DY, Payout, ROE, ROA, ROIC, Margem Bruta/EBIT/EBITDA/Líquida, Dívida Líquida/EBITDA, Dívida Líquida/EBIT, Dívida Líquida/Patrimônio, Patrimônio/Ativos, Passivos/Ativos, Liquidez Corrente, Giro de Ativos, LPA, VPA, CAGR de Receitas e Lucros), de modo que indicadores conhecidos não fiquem sem descrição.

#### Scenario: Indicador com descrição

- **WHEN** o detalhe de uma ação com indicadores fundamentalistas é exibido
- **THEN** cada indicador conhecido mostra o ícone "i" com a descrição correspondente disponível

#### Scenario: Descrição acessível por toque no mobile

- **WHEN** o usuário toca no ícone "i" de um indicador em um dispositivo touch/mobile
- **THEN** a descrição do indicador é exibida (visível e não cortada pelos limites do painel)

#### Scenario: Fechar a descrição no mobile

- **WHEN** uma descrição está aberta no mobile e o usuário toca novamente no mesmo "i", toca fora dela ou pressiona Esc
- **THEN** a descrição é fechada

#### Scenario: Apenas uma descrição aberta por vez

- **WHEN** uma descrição está aberta e o usuário toca no "i" de outro indicador
- **THEN** a descrição anterior fecha e a nova é exibida

#### Scenario: Cobertura ampla

- **WHEN** os indicadores comuns da fonte (Investidor10) são exibidos
- **THEN** todos eles possuem descrição associada (nenhum indicador comum fica sem o ícone "i")

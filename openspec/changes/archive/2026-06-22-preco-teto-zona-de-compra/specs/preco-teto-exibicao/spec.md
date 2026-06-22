## ADDED Requirements

### Requirement: Veredito de zona na lista/card de ativos

O sistema SHALL indicar o **veredito de zona** (🟢 Compra · 🟡 Justo/Perto · 🔴 Caro · ⚪ Sem dados) em cada linha/card da **lista de Meus Ativos** por meio de uma **faixa colorida** (a borda lateral que hoje sinaliza variação do dia passa a refletir a zona) acompanhada de um **caption** com o percentual de desconto/ágio vs teto sob o ticker, sem adicionar coluna nova. A lista MUST permitir **ordenar por desconto vs teto** (ativos mais "baratos" frente ao teto primeiro) a partir de um handle de ordenação existente. Ativos sem dados ou ETFs MUST exibir o estado correspondente sem número enganoso.

#### Scenario: Faixa e caption no ativo

- **WHEN** um ativo com teto calculável é exibido na lista (desktop ou card mobile)
- **THEN** a faixa lateral assume a cor da zona e o caption mostra o percentual vs teto

#### Scenario: Ordenar a lista por desconto vs teto

- **WHEN** o investidor ordena a lista por desconto vs teto
- **THEN** os ativos mais abaixo do teto aparecem primeiro

#### Scenario: ETF e sem dados na lista

- **WHEN** o ativo é ETF ou não tem histórico suficiente
- **THEN** a faixa fica neutra e o caption mostra "n/a" (ETF) ou "teto n/d" (⚪), sem teto numérico

### Requirement: Seção de preço-teto no detalhe do ativo

O detalhe do ativo (`stock-details-modal`) SHALL exibir uma **seção "Preço-teto"** ao lado dos indicadores, mostrando: **DPA(12m)** (para ações) ou **rendimento/P-VP** (para FIIs), **yield-alvo** aplicado, **preço-teto**, **preço justo** (com margem) e o **veredito de zona** com o percentual vs preço atual.

#### Scenario: Seção de teto para ação

- **WHEN** o detalhe de uma ação com teto calculável é aberto
- **THEN** a seção mostra DPA(12m), yield-alvo, teto, preço justo e a zona

#### Scenario: Seção de teto para FII

- **WHEN** o detalhe de um FII é aberto
- **THEN** a seção mostra o teto por yield e o sinal de P/VP (quando disponível)

### Requirement: Aviso de que não é recomendação de investimento

A exibição do preço-teto SHALL incluir um **aviso visível** de que o cálculo é informativo e **não constitui recomendação de investimento**.

#### Scenario: Disclaimer presente

- **WHEN** a seção ou o caption de preço-teto é exibido
- **THEN** há um aviso de que não é recomendação de investimento

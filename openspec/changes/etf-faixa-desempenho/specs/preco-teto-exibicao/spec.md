## MODIFIED Requirements

### Requirement: Veredito de zona na lista/card de ativos

O sistema SHALL indicar o **veredito de zona** (🟢 Compra · 🟡 Justo/Perto · 🔴 Caro · ⚪ Sem dados) em cada linha/card da **lista de Meus Ativos** por meio de uma **faixa colorida** (a borda lateral que hoje sinaliza variação do dia passa a refletir a zona) acompanhada de um **caption** com o percentual de desconto/ágio vs teto sob o ticker, sem adicionar coluna nova. A lista MUST permitir **ordenar por desconto vs teto** (ativos mais "baratos" frente ao teto primeiro) a partir de um handle de ordenação existente.

Para **ETFs** — que não têm preço-teto — a faixa lateral MUST refletir a **oportunidade de compra de mercado** pela **posição do preço atual na faixa de 52 semanas**: seja `pos = (preço atual − mínima 52 sem) / (máxima 52 sem − mínima 52 sem)`; `pos < 0,30` (perto do fundo do ano) → faixa **verde** (oportunidade); `0,30 ≤ pos ≤ 0,70` → faixa **amarela** (justo); `pos > 0,70` (perto do topo) → faixa **vermelha** (caro). Para ETF o caption permanece oculto.

Quando os dados de 52 semanas estiverem **indisponíveis ou inválidos** para o ETF (máxima/mínima ausentes, `máxima == mínima`, ou preço atual ausente/`≤ 0`), a faixa do ETF MUST ficar **neutra** (sem sinal enganoso). O sistema MUST degradar para o estado neutro do ETF enquanto o backend ainda não fornecer a faixa de 52 semanas.

Ativos **sem dados** (não-ETF sem histórico suficiente) MUST exibir o estado neutro com caption "teto n/d" (⚪), sem teto numérico.

A faixa do estado **neutro** (sem dados / ETF sem faixa de 52 sem válida) MUST usar uma cor que **não coincida** com a borda do card/linha, para não parecer uma borda dupla.

#### Scenario: Faixa e caption no ativo

- **WHEN** um ativo com teto calculável é exibido na lista (desktop ou card mobile)
- **THEN** a faixa lateral assume a cor da zona e o caption mostra o percentual vs teto

#### Scenario: Ordenar a lista por desconto vs teto

- **WHEN** o investidor ordena a lista por desconto vs teto
- **THEN** os ativos mais abaixo do teto aparecem primeiro

#### Scenario: ETF perto do fundo da faixa de 52 semanas

- **WHEN** um ETF tem máxima e mínima de 52 semanas válidas e o preço atual está abaixo de 30% da faixa (`pos < 0,30`)
- **THEN** a faixa lateral fica **verde** (oportunidade de compra)

#### Scenario: ETF no meio da faixa de 52 semanas

- **WHEN** um ETF tem preço atual entre 30% e 70% da faixa de 52 semanas
- **THEN** a faixa lateral fica **amarela** (justo)

#### Scenario: ETF perto do topo da faixa de 52 semanas

- **WHEN** um ETF tem preço atual acima de 70% da faixa de 52 semanas (`pos > 0,70`)
- **THEN** a faixa lateral fica **vermelha** (caro)

#### Scenario: ETF sem faixa de 52 semanas válida

- **WHEN** um ETF é exibido mas faltam máxima/mínima de 52 semanas, `máxima == mínima`, ou o preço atual é ausente/`≤ 0`
- **THEN** a faixa fica neutra (sem cor coincidente com a borda) e nenhum sinal de oportunidade é mostrado

#### Scenario: Não-ETF sem dados na lista

- **WHEN** um ativo não-ETF não tem histórico suficiente para o preço-teto
- **THEN** a faixa fica neutra e o caption mostra "teto n/d" (⚪), sem teto numérico

## MODIFIED Requirements

### Requirement: Veredito de zona na lista/card de ativos

O sistema SHALL indicar o **veredito de zona** (🟢 Compra · 🟡 Justo/Perto · 🔴 Caro · ⚪ Sem dados) em cada linha/card da **lista de Meus Ativos** por meio de uma **faixa colorida** (a borda lateral que hoje sinaliza variação do dia passa a refletir a zona) acompanhada de um **caption** com o percentual de desconto/ágio vs teto sob o ticker. A lista MUST permitir **ordenar por desconto vs teto** (ativos mais "baratos" frente ao teto primeiro) a partir de um handle de ordenação existente.

Para **ETFs** — que não têm preço-teto — o veredito de oportunidade MUST usar a **máxima de 52 semanas como referência de "caro"**, medindo a **distância do preço atual até essa máxima**: seja `desvioTopo = (preço atual − máxima 52 sem) / máxima 52 sem` (negativo quando abaixo do topo); `desvioTopo > −0,07` (colado no topo) → **vermelho** (caro); `−0,15 ≤ desvioTopo ≤ −0,07` → **amarelo** (justo); `desvioTopo < −0,15` (longe do topo) → **verde** (oportunidade).

A coluna **"Oportunidade"** (badge + tooltip), antes oculta para ETF, MUST ser exibida também para ETFs, mantendo o ETF com o mesmo número de colunas de Ações/FIIs. Para ETF o badge MUST mostrar o emoji da zona seguido da **distância do topo** (ex.: `🟢 −22%`), no mesmo formato do badge de Ações. O tooltip do ETF MUST mostrar o **racional**: mínima de 52 semanas, máxima de 52 semanas, preço atual, distância do topo e o veredito por extenso, com o aviso de que não é recomendação.

Quando os dados de 52 semanas estiverem **indisponíveis ou inválidos** para o ETF (máxima ausente/`≤ 0`, ou preço atual ausente/`≤ 0`), a faixa do ETF MUST ficar **neutra** e o badge MUST mostrar `n/a` com tooltip "Sem dados de 52 semanas", sem número enganoso.

Ativos **sem dados** (não-ETF sem histórico suficiente) MUST exibir o estado neutro com caption "teto n/d" (⚪), sem teto numérico. A faixa do estado **neutro** MUST usar uma cor que **não coincida** com a borda do card/linha.

#### Scenario: Faixa e caption no ativo

- **WHEN** um ativo com teto calculável é exibido na lista (desktop ou card mobile)
- **THEN** a faixa lateral assume a cor da zona e o caption mostra o percentual vs teto

#### Scenario: Ordenar a lista por desconto vs teto

- **WHEN** o investidor ordena a lista por desconto vs teto
- **THEN** os ativos mais abaixo do teto aparecem primeiro

#### Scenario: ETF longe do topo de 52 semanas

- **WHEN** um ETF tem máxima de 52 semanas válida e o preço atual está mais de 15% abaixo dela (`desvioTopo < −0,15`)
- **THEN** a faixa fica **verde** e o badge mostra `🟢` com a distância do topo (ex.: `−22%`)

#### Scenario: ETF a meio caminho do topo

- **WHEN** um ETF tem preço atual entre 7% e 15% abaixo da máxima de 52 semanas
- **THEN** a faixa fica **amarela** (justo) e o badge mostra a distância do topo

#### Scenario: ETF colado no topo de 52 semanas

- **WHEN** um ETF tem preço atual a menos de 7% abaixo da máxima de 52 semanas (`desvioTopo > −0,07`)
- **THEN** a faixa fica **vermelha** (caro) e o badge mostra a distância do topo

#### Scenario: Tooltip de oportunidade do ETF

- **WHEN** o investidor passa o mouse sobre o badge de oportunidade de um ETF com 52 semanas válidas
- **THEN** o tooltip mostra mínima, máxima, preço atual, distância do topo, o veredito e o aviso de que não é recomendação

#### Scenario: ETF sem máxima de 52 semanas

- **WHEN** um ETF é exibido mas falta a máxima de 52 semanas ou o preço atual é ausente/`≤ 0`
- **THEN** a faixa fica neutra e o badge mostra `n/a` com tooltip "Sem dados de 52 semanas"

#### Scenario: Não-ETF sem dados na lista

- **WHEN** um ativo não-ETF não tem histórico suficiente para o preço-teto
- **THEN** a faixa fica neutra e o caption mostra "teto n/d" (⚪), sem teto numérico

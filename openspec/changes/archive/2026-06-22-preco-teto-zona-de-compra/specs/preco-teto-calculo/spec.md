## ADDED Requirements

### Requirement: Cálculo do dividendo por cota dos últimos 12 meses (DPA)

O sistema SHALL calcular o **DPA(12m)** de um ativo como a soma dos proventos **por cota** (`amount`) cujos pagamentos (`pay_date`) ocorreram nos **últimos 12 meses** a partir da data atual. O cálculo MUST ser independente da quantidade de cotas do investidor. Quando não houver `pay_date`, o provento MUST ser desconsiderado do DPA.

#### Scenario: DPA soma proventos por cota dos últimos 12 meses

- **WHEN** um ativo tem proventos pagos nos últimos 12 meses
- **THEN** o DPA(12m) é a soma dos valores por cota desses proventos
- **AND** o resultado não depende da quantidade de cotas em carteira

#### Scenario: Proventos fora da janela são ignorados

- **WHEN** um provento foi pago há mais de 12 meses
- **THEN** ele não entra no DPA(12m)

### Requirement: Preço-teto por classe de ativo

O sistema SHALL calcular o **preço-teto** conforme a classe do ativo:

- **Ações** (método Bazin): `teto = DPA(12m) / yield-alvo`.
- **FIIs**: `teto = rendimento anualizado / yield-alvo` (yield), e ADICIONALMENTE um sinal de **P/VP** (preço sobre valor patrimonial) quando disponível nos indicadores; ambos MUST ser expostos.
- **ETFs**: o preço-teto NÃO se aplica e MUST ser sinalizado como **"n/a"**.

O yield-alvo usado MUST vir da configuração (ver `preco-teto-configuracao`).

#### Scenario: Teto de ação por Bazin

- **WHEN** uma ação tem DPA(12m) válido e um yield-alvo definido
- **THEN** o teto é `DPA(12m) / yield-alvo`

#### Scenario: FII expõe yield e P/VP

- **WHEN** um FII tem rendimento e yield-alvo definidos
- **THEN** o teto por yield é calculado
- **AND** o sinal de P/VP é exibido quando o indicador P/VP está disponível
- **AND** quando o P/VP não está disponível, apenas o sinal por yield é usado

#### Scenario: ETF não recebe preço-teto

- **WHEN** o ativo é um ETF
- **THEN** o preço-teto é marcado como "n/a", sem número calculado

### Requirement: Classificação em zonas de decisão

O sistema SHALL classificar o ativo em uma **zona** comparando o **preço atual** ao preço-teto, aplicando a **margem de segurança** configurada:

- **🟢 Compra**: preço ≤ `teto × (1 − margem)`.
- **🟡 Justo/Perto**: preço entre o justo (`teto × (1 − margem)`) e o teto.
- **🔴 Caro**: preço > teto.
- **⚪ Sem dados**: histórico de proventos insuficiente para calcular o teto (ou ETF).

O sistema MUST expor também o **percentual do preço atual em relação ao teto** (desconto/ágio).

#### Scenario: Abaixo do justo é zona de compra

- **WHEN** o preço atual é menor ou igual ao teto descontado pela margem
- **THEN** a zona é 🟢 Compra
- **AND** o percentual de desconto vs teto é informado

#### Scenario: Acima do teto é caro

- **WHEN** o preço atual é maior que o teto
- **THEN** a zona é 🔴 Caro

#### Scenario: Sem histórico não opina

- **WHEN** não há proventos suficientes para calcular o DPA(12m)
- **THEN** a zona é ⚪ Sem dados
- **AND** nenhum número de teto chutado é exibido

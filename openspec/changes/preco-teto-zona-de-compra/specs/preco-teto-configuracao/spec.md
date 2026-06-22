## ADDED Requirements

### Requirement: Yield-alvo configurável por classe com override por ativo

O sistema SHALL permitir configurar o **yield-alvo** que determina o preço-teto, com **padrão por classe** (ex.: Ações 6%, FIIs 8%) e a possibilidade de **override por ativo** (um ativo específico usa um yield-alvo próprio). Na ausência de override, o ativo MUST usar o padrão da sua classe.

#### Scenario: Padrão por classe

- **WHEN** um ativo não tem yield-alvo próprio definido
- **THEN** o cálculo usa o yield-alvo padrão da classe do ativo

#### Scenario: Override por ativo

- **WHEN** um ativo tem um yield-alvo próprio definido
- **THEN** o cálculo do teto desse ativo usa o yield-alvo próprio, ignorando o padrão da classe

### Requirement: Margem de segurança configurável

O sistema SHALL usar uma **margem de segurança** (default 10%) que separa a zona 🟢 Compra da 🟡 Justo/Perto, e MUST permitir ajustá-la. A margem MUST ser aplicada igualmente ao cálculo do "preço justo de compra" (`teto × (1 − margem)`).

#### Scenario: Margem default

- **WHEN** o investidor não alterou a margem
- **THEN** a margem de 10% é aplicada na classificação das zonas

#### Scenario: Margem ajustada

- **WHEN** o investidor ajusta a margem de segurança
- **THEN** as zonas passam a usar a nova margem

### Requirement: Persistência local da configuração

A configuração de yield-alvo (por classe e overrides por ativo) e da margem SHALL ser **persistida localmente** (localStorage), no mesmo padrão já usado para preferências da UI. Ao recarregar o app, a configuração MUST ser restaurada; na ausência de configuração salva, os padrões MUST ser aplicados.

#### Scenario: Configuração restaurada

- **WHEN** o investidor recarrega o app após ajustar a configuração
- **THEN** os valores ajustados são restaurados

#### Scenario: Padrões na primeira utilização

- **WHEN** não há configuração salva
- **THEN** os padrões por classe e a margem default são aplicados

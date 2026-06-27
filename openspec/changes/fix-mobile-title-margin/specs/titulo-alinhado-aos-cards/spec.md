## MODIFIED Requirements

### Requirement: Título de tela alinhado à margem dos cards

Em todas as telas do app (Meus Ativos, Lançamentos, Dividendos, Radar, Metas e demais que usam `.page-title`), o **início horizontal do título** SHALL coincidir com a **margem esquerda dos cards** exibidos na mesma tela. O ajuste MUST valer tanto em **desktop** quanto em **mobile**, respeitando o padding do container em cada breakpoint. No breakpoint **mobile**, o título MUST manter um recuo horizontal mínimo em relação à borda da tela (não pode ficar colado na borda esquerda), preservando ao mesmo tempo o alinhamento com a margem esquerda dos cards. O alinhamento MUST NOT alterar o tamanho, peso ou tipografia do título — apenas sua margem/recuo horizontal.

#### Scenario: Título encostado na coluna dos cards (desktop)

- **WHEN** uma tela com título e cards é exibida em desktop
- **THEN** a borda esquerda do título está alinhada com a borda esquerda dos cards

#### Scenario: Alinhamento mantido em mobile

- **WHEN** a mesma tela é exibida em mobile
- **THEN** o título permanece alinhado à margem esquerda dos cards no breakpoint mobile

#### Scenario: Título não fica colado na borda esquerda no mobile

- **WHEN** qualquer tela com `.page-title` é exibida no breakpoint mobile (≤ 600px)
- **THEN** existe um recuo horizontal visível entre o título e a borda esquerda da tela
- **AND** esse recuo coincide com o recuo da margem esquerda dos cards da mesma tela

#### Scenario: Consistência entre telas

- **WHEN** o usuário navega entre as telas que usam `.page-title` (incluindo Metas com `.metas-header` e Meus Ativos com `.section-header`)
- **THEN** todas apresentam o mesmo alinhamento e o mesmo recuo horizontal título × cards, em desktop e mobile

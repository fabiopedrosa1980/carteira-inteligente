# titulo-alinhado-aos-cards Specification

## Purpose
TBD - created by archiving change titulos-margem-alinhada-cards. Update Purpose after archive.
## Requirements
### Requirement: Título de tela alinhado à margem dos cards

Em todas as telas do app (Meus Ativos, Lançamentos, Dividendos, Radar, Metas e demais que usam `.page-title`), o **início horizontal do título** SHALL coincidir com a **margem esquerda dos cards** exibidos na mesma tela. O ajuste MUST valer tanto em **desktop** quanto em **mobile**, respeitando o padding do container em cada breakpoint. O alinhamento MUST NOT alterar o tamanho, peso ou tipografia do título — apenas sua margem/recuo horizontal.

#### Scenario: Título encostado na coluna dos cards (desktop)

- **WHEN** uma tela com título e cards é exibida em desktop
- **THEN** a borda esquerda do título está alinhada com a borda esquerda dos cards

#### Scenario: Alinhamento mantido em mobile

- **WHEN** a mesma tela é exibida em mobile
- **THEN** o título permanece alinhado à margem esquerda dos cards no breakpoint mobile

#### Scenario: Consistência entre telas

- **WHEN** o usuário navega entre as telas que usam `.page-title`
- **THEN** todas apresentam o mesmo alinhamento título × cards


## ADDED Requirements

### Requirement: Tamanhos de botão padronizados

A aplicação SHALL usar uma escala consistente de tamanhos de botão entre as telas: botões de ação (primário/secundário) com a mesma altura, padding, raio e peso de fonte; botões-ícone com dimensões fixas consistentes (uma medida média para a barra/modais e uma menor para ações em linhas de tabela). Botões equivalentes em telas diferentes SHALL ter o mesmo tamanho.

#### Scenario: Ações com tamanho consistente
- **WHEN** o usuário vê botões de ação em telas diferentes (Adicionar, Nova Meta, Salvar, etc.)
- **THEN** eles compartilham altura, padding, raio e peso de fonte

#### Scenario: Botões-ícone consistentes
- **WHEN** o usuário vê botões-ícone (tema, sair, fechar, paginação, ações de linha)
- **THEN** os do mesmo papel têm as mesmas dimensões; ações de linha usam a medida menor padronizada

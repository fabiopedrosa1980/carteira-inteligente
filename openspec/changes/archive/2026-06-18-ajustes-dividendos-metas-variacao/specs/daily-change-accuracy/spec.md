## ADDED Requirements

### Requirement: Variação diária alinhada à cotação real-time
A "Variação Hoje" exibida na tela de Minhas Ações DEVE refletir a variação percentual real-time da cotação (mesma base usada pelo endpoint de quote / Yahoo Finance), em vez do campo `change_percent` retornado por `/transactions/acoes`, que está divergente do valor real (Investidor10/Finance).

#### Scenario: Variação enriquecida com cotação real-time
- **WHEN** as Minhas Ações são carregadas
- **THEN** o sistema consulta as cotações real-time dos tickers e sobrescreve a `changePercent` de cada ação com o valor da cotação

#### Scenario: Fallback quando a cotação falha
- **WHEN** a consulta de cotação real-time de um ticker falha ou não retorna dado
- **THEN** o sistema mantém o valor original de `change_percent` daquele ticker, sem quebrar a listagem

#### Scenario: Ordenação por variação usa o valor corrigido
- **WHEN** o usuário ordena as Minhas Ações por "Variação"
- **THEN** a ordenação considera a `changePercent` real-time corrigida

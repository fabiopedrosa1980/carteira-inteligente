## ADDED Requirements

### Requirement: Calendário carregado da API backend
A tela de Calendário de Dividendos SHALL buscar os dados mensais de `GET http://localhost:8080/api/v1/dividends/monthly?year={year}` ao invés de calcular a partir de padrões hardcoded.

#### Scenario: Carregamento inicial do calendário para o ano padrão
- **WHEN** o usuário navega para a aba "Calendário"
- **THEN** o componente SHALL chamar `GET /api/v1/dividends/monthly?year=2025` e exibir os 12 meses com os dados retornados

#### Scenario: Troca de ano no seletor
- **WHEN** o usuário seleciona um ano diferente no seletor de anos
- **THEN** o componente SHALL chamar `GET /api/v1/dividends/monthly?year={anoSelecionado}` e atualizar o grid com os dados do novo ano

#### Scenario: Backend indisponível ao carregar calendário
- **WHEN** a chamada ao endpoint falha
- **THEN** o calendário SHALL exibir todos os meses sem dividendos (estado vazio) sem travar a UI

### Requirement: Dados mensais mapeados para MonthSummary
O `BackendApiService` SHALL mapear a resposta de `GET /api/v1/dividends/monthly?year={year}` para o tipo `MonthSummary[]`.

#### Scenario: Mapeamento de campos mensais
- **WHEN** a API retorna dados para um mês com tickers pagadores, total de dividendos e yield médio
- **THEN** o componente SHALL exibir o mês com o nome correto, chips de tickers, total médio e yield médio

#### Scenario: Mês sem dividendos na resposta
- **WHEN** a API retorna um mês com lista de tickers vazia ou total zero
- **THEN** o card do mês SHALL exibir "Sem pagamentos"

### Requirement: Destaque do top mês baseado em dados reais
O card com maior `totalDividends` no mês SHALL receber a badge "Top mês".

#### Scenario: Identificação do melhor mês
- **WHEN** os dados do calendário são carregados da API
- **THEN** o mês com maior `totalDividends` SHALL exibir a badge "🏆 Top mês"

#### Scenario: Empate no total de dividendos
- **WHEN** dois ou mais meses têm o mesmo `totalDividends` máximo
- **THEN** todos os meses empatados SHALL exibir a badge "🏆 Top mês"

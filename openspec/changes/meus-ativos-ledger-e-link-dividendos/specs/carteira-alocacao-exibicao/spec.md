## MODIFIED Requirements

### Requirement: Ledger por classe sem overflow

O detalhamento por classe SHALL ser apresentado em **colunas alinhadas** (classe, % atual, % alvo, ação de rebalanceamento) com números em `tabular-nums`. As colunas MUST usar **trilhas de largura explícitas e compartilhadas entre o cabeçalho e as linhas**, de modo que Atual e Alvo fiquem perfeitamente alinhados verticalmente em todas as linhas (sem larguras independentes por linha). O montante de rebalanceamento MUST NOT colidir nem transbordar; em telas estreitas a ação MUST reposicionar para a própria linha em vez de espremer o conteúdo.

#### Scenario: Colunas alinhadas no desktop

- **WHEN** o card é exibido em desktop com várias classes
- **THEN** as colunas Atual e Alvo do cabeçalho alinham com as das linhas, sem desalinhamento

#### Scenario: Mobile sem quebra

- **WHEN** o card é exibido em largura estreita (mobile)
- **THEN** a ação de rebalanceamento reposiciona para a própria linha, com Classe/Atual/Alvo ainda alinhados

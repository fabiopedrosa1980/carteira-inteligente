## ADDED Requirements

### Requirement: Toast de confirmação maior e mais legível

O toast de confirmação de operação SHALL usar fonte e dimensões maiores (font-size, padding e largura) do que o tamanho anterior, mantendo o posicionamento fixo e o comportamento responsivo em mobile.

#### Scenario: Toast legível no desktop
- **WHEN** uma operação dispara o toast de confirmação no desktop
- **THEN** o toast aparece com fonte maior e área mais generosa que a versão anterior

#### Scenario: Toast responsivo no mobile
- **WHEN** o toast é exibido em tela estreita
- **THEN** ele continua ocupando a largura disponível com margens laterais, sem estourar a viewport

### Requirement: Fonte base maior para leitura

A aplicação SHALL usar uma fonte base maior (15px) para melhorar a leitura em mobile e web, sem quebrar o layout das telas existentes.

#### Scenario: Fonte base aplicada globalmente
- **WHEN** qualquer tela é exibida
- **THEN** o texto base usa 15px como tamanho padrão, herdado por elementos sem tamanho explícito

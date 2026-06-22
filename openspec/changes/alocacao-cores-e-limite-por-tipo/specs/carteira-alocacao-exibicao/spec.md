## MODIFIED Requirements

### Requirement: Cores e moldura consistentes com o tema

A apresentação do card SHALL usar exclusivamente os **tokens do tema** — sem valores hex hardcoded — e cada classe (Ações / FIIs / ETFs) MUST ter uma **cor distinta e facilmente distinguível das demais**, sem dois tons da mesma família (em especial, sem dois azuis). As cores MUST permanecer legíveis em tema claro e escuro, e a moldura/tipografia MUST seguir o padrão dos cards de resumo.

#### Scenario: Cores distinguíveis por tipo

- **WHEN** a faixa de composição e a legenda são exibidas
- **THEN** Ações, FIIs e ETFs aparecem em cores claramente distintas (sem dois azuis)

#### Scenario: Tema claro e escuro

- **WHEN** o usuário alterna entre tema claro e escuro
- **THEN** as cores das classes derivam dos tokens e continuam distinguíveis

### Requirement: Cores das ações de rebalanceamento

A ação de rebalanceamento exibida por classe SHALL usar cores semânticas: **aportar = verde** (`--color-pos`), **reduzir = vermelho** (`--color-neg`) e **no alvo = neutro** (`--text-secondary`). As cores MUST vir dos tokens do tema.

#### Scenario: Aportar em verde, reduzir em vermelho

- **WHEN** a ação de uma classe é "aportar" ou "reduzir"
- **THEN** "aportar" aparece em verde e "reduzir" em vermelho

#### Scenario: No alvo neutro

- **WHEN** a classe está no alvo
- **THEN** a indicação aparece em cor neutra

### Requirement: Edição do alvo por classe na barra

No modo de edição, o card SHALL apresentar **um controle por classe** (Ações, FIIs, ETFs) — sliders independentes com handle arrastável — para ajustar o alvo de cada classe, operáveis por teclado (setas) e com semântica de slider (ARIA). Cada classe MUST ser **limitada ao máximo disponível** do tipo, igual a `100 − (soma dos alvos das outras classes)`, de modo que a soma dos alvos **nunca ultrapasse 100%**. O ajuste por arraste e por teclado MUST respeitar esse teto. O valor de alvo MUST refletir no ledger e ser persistido ao salvar.

#### Scenario: Cap ao atingir 100%

- **WHEN** o usuário tenta aumentar o alvo de uma classe além do máximo disponível
- **THEN** o valor é limitado a `100 − (soma das outras classes)`
- **AND** a soma dos alvos não ultrapassa 100%

#### Scenario: Sem mensagem de soma

- **WHEN** o usuário ajusta os alvos
- **THEN** não há mensagem de "soma" — o teto por tipo já impede ultrapassar 100%

#### Scenario: Ajuste por teclado respeita o teto

- **WHEN** o handle de uma classe está focado e o usuário pressiona as setas para aumentar
- **THEN** o alvo cresce até no máximo o teto disponível do tipo

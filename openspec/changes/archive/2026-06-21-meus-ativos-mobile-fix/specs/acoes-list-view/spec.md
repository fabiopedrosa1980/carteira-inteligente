# acoes-list-view — Delta Spec (meus-ativos-mobile-fix)

## Changes from Base Spec

Remove o wrapper `.acoes-list-wrap` do template. A tabela passa a ficar diretamente dentro do `.accordion-inner`, alinhado com o padrão de Lançamentos.

## Modified Requirements

### Requirement: Lista sem wrapper de card aninhado

A tabela `.acoes-list` SHALL ser filha direta de `.accordion-inner` sem nenhum div wrapper intermediário com borda ou border-radius próprios. O card frame já é fornecido pelo `.accordion`.

#### Scenario: Lista renderiza sem overflow horizontal em mobile

- **WHEN** a visão em lista é exibida em tela ≤ 640px (375px)
- **THEN** a tabela ocupa exatamente a largura do accordion sem overflow horizontal
- **AND** colunas Ativo (60%) e Saldo (40%) são legíveis sem truncamento excessivo

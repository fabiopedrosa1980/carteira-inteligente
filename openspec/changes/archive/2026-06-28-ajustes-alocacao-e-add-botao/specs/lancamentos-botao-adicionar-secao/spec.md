## ADDED Requirements

### Requirement: Tamanho e alinhamento consistentes do botão "Adicionar"

O botão **"Adicionar"** do rodapé das seções de lançamentos SHALL ter o **mesmo tamanho no mobile e no desktop** (largura automática conforme o conteúdo, sem ocupar a largura total do card no mobile). O botão MUST ficar **no final** da seção/acordeão, **alinhado à esquerda**, de forma **consistente nas duas telas** que o exibem: a visão de tabela em `my-assets` e a visão de acordeão mobile no `dashboard`.

#### Scenario: Botão "Adicionar" com tamanho de desktop no mobile

- **WHEN** a aba "Lançamentos" é exibida em mobile (≤600px)
- **THEN** o botão "Adicionar" do rodapé tem largura automática (mesmo tamanho do desktop), não ocupando 100% da largura

#### Scenario: Alinhado à esquerda no final, nas duas telas

- **WHEN** o botão "Adicionar" é exibido na visão de tabela (`my-assets`) ou na visão de acordeão mobile (`dashboard`)
- **THEN** ele aparece no final da seção/acordeão, alinhado à esquerda, com o mesmo posicionamento em ambas

# alocacao-acoes-no-rodape Specification

## Purpose
TBD - created by archiving change ajustes-alocacao-e-add-botao. Update Purpose after archive.
## Requirements
### Requirement: Ações do card de alocação no final do card

No card de **Alocação** (Meus Ativos), o bloco de ações de edição (botão **Editar** e, durante a edição, os botões **Salvar** e **Cancelar**) SHALL ser exibido no **final do card**, após o conteúdo (faixa de composição, legenda/sliders, ledger e demais blocos), e NÃO no cabeçalho. As ações MUST manter o mesmo comportamento atual (Editar abre a edição; Salvar persiste e mostra a mensagem de sucesso; Cancelar descarta sem mensagem). O título "Alocação" e o patrimônio total MUST permanecer no cabeçalho.

#### Scenario: Botão Editar no rodapé

- **WHEN** o card de alocação é exibido (modo leitura)
- **THEN** o botão "Editar" aparece no final do card
- **AND** o cabeçalho mantém o título "Alocação" e o patrimônio total

#### Scenario: Salvar/Cancelar no rodapé durante a edição

- **WHEN** o usuário está editando a distribuição
- **THEN** os botões "Salvar" e "Cancelar" aparecem no final do card
- **AND** acionam o mesmo comportamento atual (salvar/cancelar)


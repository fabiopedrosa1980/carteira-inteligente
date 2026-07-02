## MODIFIED Requirements

### Requirement: Ações do card de alocação no final do card

No card de **Alocação** (Meus Ativos), o gatilho de edição SHALL ser um **botão-ícone** (lápis) no **cabeçalho** do card, à direita do título e do patrimônio, e NÃO um botão de texto no rodapé. Durante a edição, os botões **Salvar** e **Cancelar** SHALL ser exibidos no **final do card**, após o conteúdo (faixa de composição, legenda/sliders, ledger e demais blocos). As ações MUST manter o mesmo comportamento atual (o ícone de edição abre a edição; Salvar persiste e mostra a mensagem de sucesso; Cancelar descarta sem mensagem). O título "Alocação" e o patrimônio total MUST permanecer no cabeçalho. O botão-ícone de edição MUST reusar o tamanho e o tratamento visual (tint + ícone colorido) dos botões-ícone das linhas de lista e ter rótulo acessível (`aria-label`), por ser icon-only.

#### Scenario: Ícone de editar no cabeçalho

- **WHEN** o card de alocação é exibido em modo leitura
- **THEN** um botão-ícone de lápis aparece no cabeçalho do card, à direita do título/patrimônio
- **AND** o cabeçalho mantém o título "Alocação" e o patrimônio total
- **AND** não há botão de texto "Editar" no rodapé

#### Scenario: Salvar/Cancelar no rodapé durante a edição

- **WHEN** o usuário está editando a distribuição
- **THEN** o ícone de edição do cabeçalho é ocultado
- **AND** os botões "Salvar" e "Cancelar" aparecem no final do card
- **AND** acionam o mesmo comportamento atual (salvar/cancelar)

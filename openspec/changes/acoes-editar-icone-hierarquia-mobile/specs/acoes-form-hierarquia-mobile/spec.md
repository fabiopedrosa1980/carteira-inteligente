## ADDED Requirements

### Requirement: Pares Cancelar/primário lado a lado com hierarquia no mobile

Nos formulários e modais que apresentam um par de ações **Cancelar** + ação primária (Salvar/Criar/Adicionar) — formulário de Metas, card de Alocação em edição, modal de Lançamento e modal de Adicionar Lançamentos —, no mobile (largura ≤600px; modais ≤480px) as duas ações SHALL ser exibidas **na mesma linha** com hierarquia, e NÃO empilhadas full-width com peso igual. O **Cancelar** SHALL ter largura mínima pelo conteúdo (não expande) e a **ação primária** SHALL ocupar a maior fatia da linha, posicionada à direita. Ambos os botões MUST ter alvo de toque de no mínimo 44px de altura, foco visível, e a página MUST permanecer sem rolagem horizontal.

#### Scenario: Par na mesma linha com hierarquia

- **WHEN** um formulário ou modal com par Cancelar + primário é exibido em largura ≤600px (modais ≤480px)
- **THEN** Cancelar e a ação primária aparecem na mesma linha
- **AND** o Cancelar ocupa a largura mínima do seu conteúdo (não expande)
- **AND** a ação primária ocupa a maior fatia da linha, posicionada à direita

#### Scenario: Alvo de toque e sem overflow

- **WHEN** o par é exibido no mobile
- **THEN** cada botão tem no mínimo 44px de altura
- **AND** a página não apresenta rolagem horizontal
- **AND** o foco é visível em ambos os botões

### Requirement: CTAs primários isolados permanecem full-width no mobile

Os CTAs primários **sem par de Cancelar concorrente** — "Adicionar" no estado vazio e no rodapé de seção de Meus Ativos — SHALL permanecer full-width no mobile, preservando o peso de ação primária da seção.

#### Scenario: CTA isolado full-width

- **WHEN** o CTA "Adicionar" (estado vazio ou rodapé de seção) é exibido em largura ≤600px
- **THEN** ele ocupa a largura inteira do container, como ação primária isolada

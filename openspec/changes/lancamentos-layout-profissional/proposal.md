## Why

A tela de **Lançamentos** funciona, mas a distribuição visual ainda parece de protótipo: o número mais importante (o total investido) fica escondido como texto secundário no subtítulo, as colunas numéricas da tabela não estão alinhadas à direita (dificultando a leitura/escaneamento), o espaçamento entre blocos é irregular e o estado vazio é uma linha solta. O objetivo é elevar o acabamento da tela para um padrão profissional de dashboard financeiro, **sem alterar comportamento** — apenas reorganizando a distribuição, a hierarquia e o ritmo visual com a skill de frontend.

## What Changes

- **Cabeçalho com faixa de resumo**: substituir o subtítulo apertado ("N lançamentos · Total: R$ X") por uma faixa de resumo onde o **Total** aparece como número de destaque com legenda, e a contagem de lançamentos vira meta discreta. A ação destrutiva "Limpar tudo" é rebaixada visualmente (mantém função).
- **Alinhamento numérico da tabela**: colunas numéricas (Qtd., Preço Unit., Total) alinhadas à direita com `tabular-nums` no cabeçalho e nas linhas; colunas de texto (Ativo, Data) à esquerda; Operação à direita. Leitura em coluna fica limpa e escaneável.
- **Ritmo de espaçamento consistente**: unificar paddings de cabeçalho de tabela, linhas, rodapé "Adicionar" e paginação num mesmo passo; padronizar o gap entre seções e o respiro interno dos cards de seção.
- **Cabeçalho de seção mais polido**: alinhar rótulo, badge de contagem e métrica "Total" da seção para que cada cabeçalho leia como uma linha-resumo coerente.
- **Estado vazio de verdade**: quando uma seção não tem lançamentos, exibir um estado vazio centrado (ícone + mensagem + CTA "Adicionar") no lugar da linha solta de texto.
- Sem mudança de comportamento, dados, rotas ou contratos — somente apresentação (HTML/SCSS do componente `my-assets`).

## Capabilities

### New Capabilities
- `lancamentos-layout-profissional`: define a apresentação profissional da tela de Lançamentos — faixa de resumo no cabeçalho com Total em destaque, alinhamento numérico das colunas da tabela, ritmo de espaçamento consistente, cabeçalho de seção alinhado e estado vazio por seção.

### Modified Capabilities
<!-- Nenhuma: a mudança é puramente de apresentação e não altera requisitos de comportamento das capacidades existentes (botão Adicionar, grid mobile, ocultar valores permanecem como estão). -->

## Impact

- **Componente**: `src/app/components/my-assets/my-assets.html` e `src/app/components/my-assets/my-assets.scss` (apresentação apenas).
- **Sem impacto** em serviços, modelos, rotas, API ou estado. Nenhuma dependência nova.
- Mobile: preserva o layout de card recém-aprovado (Qtd na linha do ticker, Total na linha 2, ações em rodapé); o foco profissional incide sobre a faixa de resumo e a tabela desktop, com refinamentos de ritmo que valem nas duas larguras.

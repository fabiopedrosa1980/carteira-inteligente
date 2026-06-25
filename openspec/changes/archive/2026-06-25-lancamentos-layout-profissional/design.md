## Context

A tela de Lançamentos (`MyAssetsComponent`) já tem a estrutura certa — cabeçalho da página, seções em acordeão por tipo de ativo (Ações/FIIs/ETFs), tabela detalhada por seção, paginação e CTA primário "Adicionar" no rodapé de cada seção. O que falta é acabamento: a distribuição visual ainda lê como protótipo.

Pontos atuais que destoam de um dashboard financeiro profissional:
- O **total investido** — número mais importante da tela — está embutido como texto secundário no subtítulo (`N lançamentos · Total: R$ X`).
- As **colunas numéricas** da tabela (Qtd., Preço, Total) não estão alinhadas à direita; números com larguras diferentes não escaneiam em coluna.
- **Espaçamentos divergentes** entre blocos equivalentes (rodapé, paginação, linhas).
- **Estado vazio** é uma linha de texto solta, fora do idioma visual do resto.

A mudança é **puramente de apresentação** (HTML/SCSS de `my-assets`). Sem tocar serviços, modelos, rotas, API ou estado. Os tokens do app (`--accent`, `--text-secondary`, `--btn-accent-text`, `--btn-accent-hover`, `--border`) já existem e são reutilizados.

## Goals / Non-Goals

**Goals:**
- Elevar a hierarquia: total investido como figura de destaque no cabeçalho.
- Tabela escaneável: colunas numéricas à direita com `tabular-nums`; texto à esquerda.
- Ritmo de espaçamento uniforme entre blocos.
- Cabeçalho de seção legível como linha-resumo.
- Estado vazio com identidade (ícone + mensagem + CTA), por seção.
- Preservar 100% do comportamento, dados e interações.

**Non-Goals:**
- Não alterar o layout de card mobile recém-aprovado (Qtd na linha do ticker, Total na linha 2, ações em rodapé).
- Não mudar o fluxo do modal, ordenação, paginação ou regras de negócio.
- Não introduzir bibliotecas, dependências ou tokens novos.
- Não redesenhar o acordeão (manter expand/collapse e chevron).

## Decisions

**1. Faixa de resumo no cabeçalho em vez de subtítulo inline.**
Reestruturar `.page-header` para: à esquerda o título "Lançamentos" com a contagem como meta discreta; um bloco de **Total** com legenda curta ("Total investido") e o valor como figura de destaque (peso alto, `tabular-nums`); "Limpar tudo" rebaixado (ghost discreto, ícone + rótulo) à direita.
- *Alternativa considerada*: cards de métrica (estilo KPI) no topo. Rejeitada por excesso para uma única métrica relevante — agregaria peso visual sem informação nova e competiria com a faixa de resumo do dashboard principal.

**2. Alinhamento numérico via classes utilitárias no grid existente.**
A tabela já usa CSS grid (`repeat(5, minmax(0,1fr)) 72px`). Aplicar `text-align: right` + `tabular-nums` às células/cabeçalhos numéricos (Qtd., Preço, Total) e manter Ativo/Data à esquerda. O cabeçalho (`.th-sort`) precisa espelhar o alinhamento da coluna para o título e a seta de ordenação ficarem à direita nas colunas numéricas.
- *Alternativa considerada*: trocar para `<table>` semântica. Rejeitada — o grid atual funciona e a troca seria refactor amplo sem ganho funcional; mantém escopo de apresentação.

**3. Passo de espaçamento único.**
Adotar um padding horizontal consistente (alinhado às bordas do card de seção) para cabeçalho de tabela, linhas, rodapé "Adicionar" e paginação; gap uniforme entre seções. Centralizar os valores em variáveis SCSS locais para evitar divergência.

**4. Estado vazio por seção reutilizando o idioma de vazio já usado em outras telas.**
Substituir o `<p class="empty-msg">` por um bloco centrado (ícone + título curto + CTA "Adicionar" que chama `openAdd(sec.id)`), seguindo o mesmo padrão dos estados vazios do app (ex.: histórico/dividendos). Quando vazio, o rodapé "Adicionar" duplicado pode ser suprimido para a seção (o CTA do vazio assume), evitando dois botões idênticos.

## Risks / Trade-offs

- [Alinhar cabeçalho e seta de ordenação à direita pode quebrar o clique/hover do `.th-sort`] → manter o elemento clicável inteiro; usar `justify-content: flex-end` no flex interno do cabeçalho numérico, preservando área de toque.
- [Estado vazio com CTA + rodapé "Adicionar" pode duplicar botões] → quando a seção está vazia, exibir apenas o CTA do estado vazio; o rodapé volta quando há linhas.
- [Refinamentos de espaçamento podem afetar o card mobile] → restringir mudanças de ritmo aos blocos desktop e às regras fora do `@media (max-width: 600px)`; revisar visualmente o mobile para garantir que o card aprovado não muda.
- [Orçamento de bundle do SCSS] → a tela compartilha budget já no limite; manter o CSS enxuto (reaproveitar tokens, evitar duplicação).

## Migration Plan

Mudança somente de front-end, sem migração de dados. Deploy é o build padrão (`ng build`); rollback é reverter o commit. Sem flags.

## Open Questions

- Nenhuma bloqueante. A legenda exata do total ("Total investido" vs "Total aportado") pode ser ajustada na implementação para casar com a linguagem já usada no app.

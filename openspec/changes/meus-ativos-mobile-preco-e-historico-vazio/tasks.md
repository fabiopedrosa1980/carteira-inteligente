## 1. Preço Atual no card mobile de Meus Ativos

- [x] 1.1 Em `dashboard.scss` (`@media (max-width: 640px)` da `.acoes-list`), remover `td:nth-child(4) { display: none; }` e atribuir `grid-area: patual` à célula de Preço Atual, alinhada à direita.
- [x] 1.2 Atualizar `grid-template-areas` do card para incluir `patual` pareado com `preco` (Preço Médio) — `'preco patual'` e `'qtd qtd'`; Preço Médio passou a alinhar à esquerda.
- [x] 1.3 Adicionar o micro-rótulo `td:nth-child(4)::before { content: 'Preço atual'; }` no mesmo padrão dos demais rótulos do card.
- [x] 1.4 Validar no mobile (≤640px) que Preço Atual aparece junto ao Preço Médio, com "—" quando ausente, sem rolagem horizontal.

## 2. Estado vazio no Histórico

- [x] 2.1 Em `dividend-history.html`, adicionar um bloco de estado vazio exibido quando `!error() && !anyProcessing() && visiblePositions().length === 0` (já dentro de `!loadingPositions()`).
- [x] 2.2 Escrever a mensagem orientando o usuário (cadastrar lançamentos) e estilizar em `dividend-history.scss` (`.dh-no-data`) no padrão de vazio do app, com ícone.
- [x] 2.3 Verificar precedência: carregando/erro/processamento têm prioridade; a mensagem some ao haver posições.

## 3. Indicadores — 3 por linha no web, 2 no mobile

- [x] 3.1 Em `dashboard.scss`, `.ps-cards` já está em `repeat(3, 1fr)` no web e `1fr 1fr` no mobile (≤640px) — sem regressão, nenhum ajuste necessário.
- [x] 3.2 Conferir que os 6 cards cabem em 3 por linha no web e 2 por linha no mobile, sem rolagem horizontal.

## 4. Verificação

- [x] 4.1 `npx prettier --write` nos arquivos alterados e `ng build` sem erros.
- [ ] 4.2 Validar visualmente: card mobile de Meus Ativos com Preço Atual; Histórico com mensagem de vazio quando sem posições; indicadores 3 por linha no web e 2 por linha no mobile.
- [ ] 4.3 `openspec validate meus-ativos-mobile-preco-e-historico-vazio` sem erros.

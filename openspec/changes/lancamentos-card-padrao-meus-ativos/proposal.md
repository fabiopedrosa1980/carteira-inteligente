## Why

O card mobile de **Lançamentos** e o card mobile de **Meus Ativos** têm idiomas visuais ligeiramente diferentes (raio do card, tipografia dos números, arranjo dos campos). O usuário quer **padronizar** o card de Lançamentos para o mesmo padrão de Meus Ativos, com uma diferença intencional de arranjo: o **ticker sozinho na primeira linha** e os **demais campos em 2 por linha**.

## What Changes

- Reorganizar o grid do card mobile de Lançamentos para:
  - **Linha 1**: ticker ocupando a largura inteira (sozinho).
  - **Linha 2**: Data · Quantidade (2 por linha).
  - **Linha 3**: Preço Unit. · Total (2 por linha).
  - **Rodapé**: ações (Editar/Excluir e o "+"), como já está.
- **Padronizar o idioma visual com Meus Ativos**: mesmo raio de card (14px) e mesma tipografia dos valores (sans, em vez do mono atual), mantendo os micro-rótulos em caixa-alta.
- Alinhamento no idioma de Meus Ativos: campos de texto (Data, Preço) à esquerda; números-chave (Qtd, Total) à direita; Total como valor de destaque.
- Sem mudança de comportamento, dados ou desktop — apenas o arranjo/estilo do card mobile.

## Capabilities

### New Capabilities
<!-- Nenhuma. -->

### Modified Capabilities
- `lancamentos-mobile-grid`: passa a especificar o arranjo padronizado do card mobile (ticker na 1ª linha sozinho; demais campos 2 por linha) e a paridade de idioma visual com o card de Meus Ativos.

## Impact

- **Componente**: `src/app/components/my-assets/my-assets.scss` (bloco mobile `@media (max-width: 600px)` da `.table-row` e células). HTML não muda (o arranjo usa `grid-template-areas`).
- **Sem impacto** em serviços, modelos, rotas, API ou estado. Nenhuma dependência nova.
- Afeta somente largura ≤600px; o desktop não muda.

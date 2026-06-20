## Why

A tela de Lançamentos no mobile ainda mostra colunas demais (Ativo · Data · Qtd · Total), apertando o conteúdo e diminuindo a fonte. E listas longas rolam sem fim — sem paginação fica difícil navegar. Queremos uma **versão mobile mais compacta** (menos colunas, fonte maior) e **paginação de 10 lançamentos por página**.

## What Changes

- **Mobile compacto (tabela detalhada):** exibir apenas **Ativo · Qtd · Total · ações**, omitindo **Data** e **Preço unit.**, com **fonte maior** para melhor leitura.
- **Paginação por seção:** cada seção (Ações/FIIs/ETFs) lista **10 lançamentos por página**, com controles Anterior/Próxima e indicador "página X / Y". A paginação vale para a visão detalhada e a agrupada (10 itens por página).
- Desktop mantém todas as colunas; a visão agrupada (cards no mobile) é preservada.

## Capabilities

### Added Capabilities
- `lancamentos-mobile-paginacao`: versão mobile compacta (colunas reduzidas, fonte maior) e paginação de 10 itens por página, por seção, na tela de Lançamentos.

## Impact

**Frontend (este repo):**
- `src/app/components/my-assets/my-assets.ts` — estado de paginação por seção (`PAGE_SIZE=10`), slices paginados e navegação.
- `src/app/components/my-assets/my-assets.html` — usar as listas paginadas + controles de paginação por seção.
- `src/app/components/my-assets/my-assets.scss` — mobile: colunas Ativo·Qtd·Total·ações (oculta Data e Preço), fonte maior; estilo dos controles de paginação.

Sem backend.

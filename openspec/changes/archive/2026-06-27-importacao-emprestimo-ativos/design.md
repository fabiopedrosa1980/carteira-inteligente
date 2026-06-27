## Context

A importação da planilha de Posição da B3 já existe na API Go (change `importacao-planilha-b3`): `POST /api/v1/transactions/import` parseia as abas `Acoes`/`ETF` via `internal/infrastructure/b3import` e sobrepõe os lançamentos. O parser hoje devolve `[]Position{Ticker, Quantity, ClosingPrice, Sheet}` e o handler deduplica por ticker (mantém a primeira ocorrência).

Inspeção do arquivo real confirma que ações emprestadas como **Doador** saem da aba `Acoes` e aparecem só em `Empréstimos` (BBSE3, CSMG3, ITUB3) — hoje perdidas na importação. A aba `Empréstimos` traz o ticker na coluna `Produto` (formato `"BBSE3 - BB SEGURIDADE ..."`), além de `Natureza`, `Quantidade` e `Preço de Fechamento`.

## Goals / Non-Goals

**Goals:**
- Incluir na importação as posições emprestadas de natureza `Doador`.
- Agregar quantidade por ticker entre abas (disponível + emprestado).
- Classificar `Doador` por catálogo (Acoes/FIIs), como na aba `Acoes`.

**Non-Goals:**
- Suportar natureza `Tomador` (ativos tomados não são do investidor).
- Distinguir/sinalizar na carteira o que está emprestado vs disponível (vira um lançamento único somado).
- Suportar `Tesouro Direto` (segue ignorado).
- Qualquer mudança no frontend ou no contrato HTTP.

## Decisions

### D1: Parser passa a ler `Empréstimos` e expõe a natureza
Adicionar `Empréstimos` às abas processadas e incluir o campo `Natureza` em `Position`. O ticker dessa aba vem de `Produto` (parte antes de `" - "`), pois não há coluna `Código de Negociação`.
- **Por quê:** manter o parser como única fonte de extração; a decisão de filtrar por natureza fica no handler, junto com a classificação.
- **Alternativa descartada:** filtrar `Doador` dentro do parser. Rejeitada para manter o parser sem regra de negócio (apenas extração).

### D2: Handler filtra `Doador` e agrega por ticker
Trocar a deduplicação "primeira ocorrência" por **agregação por ticker**: somar `Quantity` das posições do mesmo ticker; manter um `Preço de Fechamento` (o do ticker) e uma classificação. Posições de `Empréstimos` só entram se `Natureza == "Doador"`.
- **Por quê:** cobre o caso de empréstimo parcial (ticker em `Acoes` e `Empréstimos`) sem duplicar lançamentos; reflete a propriedade total do investidor.
- **Alternativa descartada:** criar dois lançamentos (disponível + emprestado) para o mesmo ticker. Rejeitada porque o app consolida posição por ticker e a tela de Meus Ativos já soma — dois lançamentos só geram ruído.

### D3: Classificação reaproveita `classifyPosition`
Para `Empréstimos`, classificar pelo catálogo igual à aba `Acoes` (não força ETFs). O ticker já normalizado alimenta `assetSvc.GetByTicker`.

## Risks / Trade-offs

- **Ticker de `Produto` com formatação inesperada** → Extrair pela primeira parte antes de `" - "` e normalizar (UPPER/TRIM); se vier vazio, a linha é ignorada como qualquer outra sem ticker.
- **Preço divergente entre abas para o mesmo ticker** → Improvável (é o fechamento do dia, igual nas abas). Mitigação: usar o primeiro preço > 0 encontrado para o ticker.
- **Natureza com variação de caixa/acentuação** → Comparar de forma case-insensitive e por prefixo (`Doador`/`Tomador`).
- **Posição emprestada sem `Preço de Fechamento`** → Cai na regra existente de "ticker ignorado: preço indisponível" no resumo.

## Migration Plan

1. Ajustar `b3import` (campo `Natureza`, leitura da aba `Empréstimos`, ticker via `Produto`).
2. Ajustar o handler (filtro `Doador` + agregação por ticker).
3. Atualizar testes do parser e do endpoint; validar com o arquivo real (deve passar a importar BBSE3, CSMG3, ITUB3 → 10 Ações + 1 ETF).
4. Deploy da API Go (Render). Rollback: reverter o commit; o endpoint volta a ignorar `Empréstimos`.

## Open Questions

- Nenhuma. Caso de `Tomador` e Tesouro Direto explicitamente fora de escopo.

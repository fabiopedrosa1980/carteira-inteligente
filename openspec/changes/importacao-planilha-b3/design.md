## Context

O app é um frontend Angular 21 (standalone, signals) que consome a API Go em `carteira-inteligente-api.onrender.com`. Os lançamentos vivem na API e são lidos/gravados via `BackendApiService` (`getTransactions`, `createTransaction`, `deleteAllTransactions`, etc.) e refletidos no estado por `TransactionService`. A navegação do dashboard é um conjunto de abas controladas por `activeTab` em `DashboardComponent`, com a lista declarada em `tabs` (`dashboard.ts`) e renderizada em `dashboard.html`.

A planilha real fornecida pelo usuário é o relatório de **Posição** da B3 (`posicao-2026-06-27-02-37-19.xlsx`). Inspecionado, o arquivo tem as abas `Acoes`, `Empréstimos`, `ETF` e `Tesouro Direto`. As abas relevantes têm as colunas: `Código de Negociação` (ticker), `Quantidade` e `Preço de Fechamento`. **Não há preço de compra nem data de compra** — é um snapshot da carteira, não um extrato de operações.

Decisões já tomadas com o usuário: o parsing acontece **na API Go** (frontend só faz upload); a importação **sobrepõe** os lançamentos manuais.

## Goals / Non-Goals

**Goals:**
- Nova tela/menu **Importar** no dashboard com seleção de arquivo, confirmação de sobreposição e resumo do resultado.
- Upload do `.xlsx` para um novo endpoint Go que parseia a Posição, classifica tickers e regrava os lançamentos atomicamente.
- Refletir o resultado no app reusando `TransactionService.reload()` e `loadAtivos()`.

**Non-Goals:**
- Parsing de `.xlsx` no frontend (decidido: ocorre na API Go).
- Suporte às abas `Empréstimos` e `Tesouro Direto` (ignoradas nesta entrega).
- Importar histórico de operações / preço de compra real (o relatório de Posição não os contém).
- Mesclar com lançamentos existentes (a operação é sempre sobreposição total).

## Decisions

### D1: Parsing na API Go via upload multipart
Frontend envia o arquivo cru para `POST /api/v1/transactions/import` (`multipart/form-data`). A API Go parseia o `.xlsx`, classifica e regrava.
- **Por quê:** centraliza a lógica de parsing/classificação no backend (mesma fonte de verdade do catálogo de tickers), evita adicionar lib de XLSX (SheetJS) ao bundle Angular e mantém o frontend fino.
- **Alternativa descartada:** parsear no Angular com SheetJS e usar `deleteAllTransactions` + N `createTransaction`. Rejeitada por inflar o bundle, duplicar a classificação de tipo no cliente e tornar a sobreposição não-atômica (N chamadas).

### D2: Posição → lançamento sintético por ticker
Cada linha válida das abas `Acoes`/`ETF` vira um lançamento: `quantity` = Quantidade, `price` = Preço de Fechamento, `date` = data do relatório (derivada do nome/arquivo ou da data de processamento), `asset_type` = classificação por ticker.
- **Por quê:** é o máximo de fidelidade possível a partir de um snapshot. O preço de fechamento é um proxy editável depois pelo usuário na tela de Lançamentos.
- **Alternativa descartada:** exigir o relatório de Movimentação (tem preço/data de operação). Adiável: o usuário forneceu o de Posição; suportar Movimentação pode ser uma evolução futura.

### D3: Classificação de tipo pelo catálogo, não pela aba
A aba só distingue ETF de "Ações". FIIs aparecem na aba `Acoes` e precisam ser reclassificados pelo catálogo de tickers já existente na API (ver specs `catalogo-ativos-b3-endpoint`, `lancamento-tipo-por-ticker`, `taee11-classificacao-tipo-ativo`).
- **Por quê:** consistência com a classificação usada no cadastro manual; evita que FIIs entrem como Ações.

### D4: Sobreposição atômica no backend
A API faz delete-all + insert das novas posições dentro de uma transação de banco (ou equivalente), de modo que falha não destrói a base.
- **Por quê:** o spec exige que falha não perca dados. Fazer isso no cliente (deleteAll seguido de N creates) deixa janela de inconsistência.

### D5: Componente de importação standalone + nova aba
Novo componente `ImportComponent` (`components/import/`), adicionado a `tabs` com `id: 'import'` e renderizado por `*ngIf="activeTab === 'import'"` no `dashboard.html`. Novo método `importTransactions(file: File): Observable<ImportResult>` em `BackendApiService` usando `FormData`. Confirmação reusa `ConfirmService`. Refresh reusa `TransactionService.reload()` e, se a aba seguinte for Lançamentos/Meus Ativos, `loadAtivos()`.
- **Por quê:** segue o padrão existente de componentes standalone e telas por aba; reaproveita serviços já presentes.

## Risks / Trade-offs

- **Preço de fechamento ≠ preço de compra** → A tela de Importar deve deixar claro que os valores são aproximados (preço atual) e editáveis depois; documentar no resumo.
- **Operação destrutiva (sobreposição)** → Confirmação explícita obrigatória na UI (D5) + atomicidade no backend (D4). Sem confirmação, não envia.
- **Endpoint Go ainda não existe (repo externo)** → O frontend trata erro/indisponibilidade com mensagem amigável e não altera a visualização dos lançamentos; a entrega no repo Go é dependência externa rastreada nas tasks.
- **Variações de layout do relatório B3 (colunas/abas renomeadas, acentuação)** → Parsing por nome de cabeçalho (não por índice fixo) e tolerância a linhas de total/vazias; tickers não reconhecidos vão para a lista de "ignorados" no resumo em vez de falhar tudo.
- **FIIs sem aba própria neste arquivo** → Dependem 100% da classificação por catálogo (D3); ticker desconhecido cai como Ações por padrão — aceitável e corrigível manualmente.

## Migration Plan

1. Implementar e publicar o endpoint `POST /api/v1/transactions/import` no repo Go (parsing, classificação, sobreposição atômica, resumo).
2. Implementar a tela/menu Importar e o método de upload no frontend, codando contra o contrato do endpoint.
3. Validar com o arquivo real (`posicao-2026-06-27-02-37-19.xlsx`): conferir contagens por classe e tickers ignorados.
4. Rollback: a feature é aditiva; basta ocultar a aba Importar. Dados do usuário não migram automaticamente — a sobreposição só ocorre por ação explícita.

## Open Questions

- Data do lançamento sintético: usar a data contida no nome do arquivo (`posicao-AAAA-MM-DD-...`), uma coluna do arquivo, ou a data de processamento no servidor? (Proposto: derivar do nome do arquivo, com fallback para a data de processamento.)
- Suporte futuro ao relatório de Movimentação (preço/data reais) — fora de escopo agora, registrar como evolução.

## Why

Hoje os lançamentos só podem ser cadastrados um a um, manualmente. Quem já tem carteira na B3 precisa redigitar dezenas de posições para usar o app. Permitir importar diretamente a planilha de Posição da B3 elimina esse trabalho e deixa a base do app fiel à corretora em poucos cliques.

## What Changes

- Nova tela/menu **Importar** na navegação principal do dashboard, ao lado de Meus Ativos, Lançamentos, Dividendos e Metas.
- O usuário seleciona o arquivo `.xlsx` exportado da área do investidor da B3 (relatório de **Posição**, ex.: `posicao-2026-06-27-02-37-19.xlsx`) e envia.
- O arquivo é enviado (upload multipart) para um **novo endpoint na API Go**, que parseia as abas (`Acoes`, `ETF`; demais abas ignoradas nesta entrega), classifica cada ticker e regrava os lançamentos.
- **BREAKING (dados do usuário):** a importação **sobrepõe** os lançamentos existentes — todos os lançamentos manuais são apagados e substituídos pelas posições da planilha. A tela exige confirmação explícita antes de enviar.
- Como o relatório de Posição é um *snapshot* (tem quantidade e preço de fechamento, mas **não tem preço de compra nem data de compra**), cada ticker vira **um lançamento sintético** por posição, usando o preço de fechamento como preço (ajustável depois) e a data do relatório como data.
- Feedback de resultado: total de posições importadas por classe (Ações/ETFs), tickers ignorados e erros de parsing.

## Capabilities

### New Capabilities
- `importacao-posicao-b3-ui`: tela/menu de Importar no dashboard — seleção de arquivo, confirmação de sobreposição, estados de envio/sucesso/erro e resumo do resultado.
- `importacao-posicao-b3-api`: contrato do endpoint de importação na API Go (upload do `.xlsx`, parsing das abas de Posição, classificação por ticker, sobreposição da base de lançamentos e payload de resposta).

### Modified Capabilities
<!-- Nenhuma capability de spec existente tem requisitos alterados. -->

## Impact

- **Frontend (Angular):** nova entrada em `tabs` e novo bloco no `dashboard.html`/`dashboard.ts`; novo componente de importação; novo método em `BackendApiService` para o upload multipart; reuso de `TransactionService.reload()` para refletir o resultado.
- **API Go (repo externo `carteira-inteligente-api`):** novo endpoint `POST /api/v1/transactions/import` que parseia o `.xlsx` da Posição, sobrepõe os lançamentos e retorna o resumo. É dependência externa — o frontend degrada com erro amigável enquanto o endpoint não existir.
- **Dados:** operação destrutiva sobre os lançamentos do usuário (sobreposição). Sem migração de schema; reaproveita o modelo de transação atual (`ticker`, `asset_type`, `quantity`, `price`, `date`).

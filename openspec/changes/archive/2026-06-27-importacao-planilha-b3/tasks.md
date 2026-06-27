## 1. API Go — endpoint de importação (repo externo `carteira-inteligente-api`)

- [x] 1.1 Criar rota `POST /api/v1/transactions/import` aceitando upload `multipart/form-data` de um único `.xlsx`
- [x] 1.2 Validar arquivo presente e legível como `.xlsx`; retornar 4xx descritivo quando ausente/inválido
- [x] 1.3 Parsear abas `Acoes` e `ETF` por nome de cabeçalho (`Código de Negociação`, `Quantidade`, `Preço de Fechamento`); ignorar `Empréstimos`/`Tesouro Direto`, linhas de total/vazias e quantidade ≤ 0
- [x] 1.4 Classificar cada ticker em `Acoes`/`FIIs`/`ETFs` pelo catálogo existente (ETF→ETFs; demais por catálogo)
- [x] 1.5 Derivar a data do lançamento (nome do arquivo `posicao-AAAA-MM-DD-...`, com fallback para data de processamento)
- [x] 1.6 Sobrepor atomicamente: apagar todos os lançamentos e inserir um por posição (quantity, price=fechamento, date); rollback em falha
- [x] 1.7 Retornar resumo: contagem criada por classe + lista de tickers ignorados (com motivo)
- [x] 1.8 Testar com o arquivo real `posicao-2026-06-27-02-37-19.xlsx` e conferir contagens

## 2. Frontend — serviço de upload

- [x] 2.1 Adicionar interface `ImportResult` (contagens por classe + ignorados) em `backend-api.service.ts`
- [x] 2.2 Implementar `importTransactions(file: File): Observable<ImportResult>` montando `FormData` e POST no endpoint, com tratamento de erro

## 3. Frontend — componente de importação

- [x] 3.1 Criar componente standalone `ImportComponent` em `src/app/components/import/` (ts/html/scss)
- [x] 3.2 Input de arquivo restrito a `.xlsx`, exibindo o nome do arquivo e habilitando o botão só com arquivo válido
- [x] 3.3 Exigir confirmação de sobreposição (reusar `ConfirmService`) antes de enviar; cancelar não envia nada
- [x] 3.4 Estados de envio (loading/botão desabilitado), sucesso (resumo por classe + ignorados) e erro (mensagem amigável)
- [x] 3.5 Ao concluir com sucesso, chamar `TransactionService.reload()` (e `loadAtivos()` quando aplicável) para refletir o resultado

## 4. Frontend — integração no dashboard

- [x] 4.1 Adicionar entrada `import` (label "Importar", iconPath) ao array `tabs` em `dashboard.ts`
- [x] 4.2 Renderizar `<app-import>` sob `*ngIf="activeTab === 'import'"` em `dashboard.html` e importar o componente
- [x] 4.3 Garantir que `refreshActiveTab()`/navegação trate a aba `import` sem efeitos colaterais indevidos

## 5. Verificação e fechamento

- [x] 5.1 `npx prettier --write` nos arquivos alterados e `ng build` sem erros
- [x] 5.2 Validar fluxo fim-a-fim: importar o arquivo real, confirmar sobreposição e ver os lançamentos atualizados em Lançamentos/Meus Ativos
- [x] 5.3 Validar caminho de erro (endpoint indisponível) exibindo mensagem amigável sem alterar a visualização

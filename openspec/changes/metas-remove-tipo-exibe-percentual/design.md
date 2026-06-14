## Contexto

As metas hoje têm um campo `Type` (`patrimonio` | `renda_mensal` | `preco_medio`) que determina como `buildGoalResponses` calcula `currentValue`/`progressPercent`. O `preco_medio` usa também um `Ticker`. A coluna `type` é `NOT NULL` no GORM. O frontend expõe seletor de tipo e campo ticker no formulário e um selo de tipo na listagem.

A decisão é remover o tipo completamente (UI + backend): toda meta passa a acompanhar o patrimônio total da carteira.

## Metas / Não-Metas

**Metas:**
- Remover `type`/`ticker` do modelo, DTO, handler, service e formulário
- Progresso sempre = patrimônio total ÷ valor alvo (limitado a 100%)
- Percentual sempre visível na listagem
- Migração segura para bancos legados com `type NOT NULL`

**Não-Metas:**
- Manter renda mensal e preço médio como modos de meta
- Alterar o cálculo de patrimônio (continua `sum(qty * preço atual)`)

## Decisões

### D1 — Remover campos `Type` e `Ticker` do domínio
`domain.Goal` perde `Type` e `Ticker`. `GoalRequest`/`GoalResponse` e `GoalFromDomain` também. O binding `oneof=...` do `type` é removido.

### D2 — `buildGoalResponses` simplificado
Remove o `switch g.Type` e os cálculos de `rendaMensal`/`avgMap`/`dyMap`. `currentValue = patrimonio` para todas as metas. Mantém o cálculo de patrimônio com preços ao vivo (Yahoo) e o teto de 100%.

### D3 — Migração best-effort das colunas legadas
Render usa filesystem efêmero (o SQLite é recriado a cada deploy — evidenciado pela tabela `stocks` vazia), então o `AutoMigrate` cria a tabela `goals` já sem `type`/`ticker`. Para robustez contra um banco persistente, após o `AutoMigrate` executa-se best-effort:
```
ALTER TABLE goals DROP COLUMN type
ALTER TABLE goals DROP COLUMN ticker
```
Erros são ignorados (coluna inexistente em banco novo, ou SQLite sem a coluna). SQLite ≥ 3.35 suporta `DROP COLUMN`.

**Alternativa descartada:** recriar a tabela `goals` (migração de dados) — desnecessário dado o filesystem efêmero e o risco baixo.

### D4 — Frontend: ícone fixo e formulário enxuto
Sem tipo, o card usa um ícone fixo (🎯). O formulário fica com Nome e Valor Alvo apenas. `MetaType`, `typeOptions`, `iconFor`, `labelFor`, `formType`, `formTicker` são removidos. O percentual (`progressPercent`) já é exibido — garante-se que continue sempre visível.

## Riscos / Trade-offs

- **[Banco persistente com `type NOT NULL`]** → `ALTER TABLE ... DROP COLUMN` best-effort remove a restrição; se o SQLite for antigo (< 3.35), o drop falha e o insert continuaria quebrando. Mitigação: o driver `glebarez/sqlite`/`mattn` em uso é recente o suficiente; e o ambiente é efêmero.
- **[Metas antigas com type/ticker]** → ignorados; o progresso passa a ser patrimônio para todas. Sem perda de dados relevante.

## Plano de Migração

1. Backend: remover campos, simplificar handler, adicionar drop best-effort após AutoMigrate.
2. Deploy backend — tabela recriada/ajustada.
3. Deploy frontend — formulário e listagem sem tipo.
4. Sem rollback especial necessário.

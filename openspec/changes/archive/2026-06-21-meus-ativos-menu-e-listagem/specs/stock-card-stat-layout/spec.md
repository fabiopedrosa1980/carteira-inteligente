## MODIFIED Requirements

### Requirement: Faixa de estatísticas do card não corta textos

A faixa de estatísticas do card de ação (`div.stat-strip`) SHALL exibir apenas a **tag de setor** (quando presente e diferente de 'Ações'). Os itens **Hoje**, **DY** e **Nota** são removidos da faixa. Quando não houver tag de setor, a faixa pode ser omitida ou ficar vazia sem espaçamento desnecessário.

#### Scenario: Card sem tag de setor

- **WHEN** um card de ativo é exibido e o setor é 'Ações' ou ausente
- **THEN** a faixa de estatísticas não exibe nenhum conteúdo
- **AND** não há espaço vazio visível onde Hoje, DY ou Nota estavam

#### Scenario: Card com tag de setor não-Ações

- **WHEN** um card de ativo tem setor diferente de 'Ações' (ex.: 'FII', 'ETF')
- **THEN** a faixa exibe apenas a sector-tag com o nome do setor
- **AND** Hoje, DY e Nota não aparecem

#### Scenario: Sem corte por overflow

- **WHEN** a sector-tag é o único conteúdo da faixa
- **THEN** o texto da tag não é cortado pela borda do card

## REMOVED Requirements

### Requirement: Nota alinhada à linha do ticker no card

**Reason**: O campo Nota foi removido dos cards de ativo. O elemento `<span class="card-nota">` é eliminado do template.

**Migration**: Remover o bloco `<span class="card-nota" *ngIf="stock.nota > 0">` do `stock-card.html`. CSS relacionado (`.card-nota`, `.notaClass`) pode ser removido.

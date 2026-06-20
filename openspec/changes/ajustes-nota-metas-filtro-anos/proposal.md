## Why

Três ajustes pontuais de UI melhoram leitura e usabilidade: a Nota do ativo hoje fica perdida no rodapé do card com rótulo redundante; a tela de Metas no mobile corta textos das células; e o filtro de anos em chips ocupa muito espaço vertical e fica inconsistente no mobile. O usuário pediu padronizar a Nota ao lado do ticker (alinhada à direita, sem rótulo), garantir que Metas não corte texto no mobile e transformar o filtro de anos em um combo com rótulo "Ano" no mobile.

## What Changes

- **Card de ação**: mover a Nota para o topo do card, na mesma linha do ticker, alinhada à direita e **sem o rótulo "Nota"**. Remover a Nota do `stat-strip` do rodapé.
- **Tela de Metas (mobile)**: ajustar a tabela/células para que nenhum texto (nome da meta, valores, progresso) seja cortado em telas estreitas.
- **Filtro de anos do Histórico (mobile)**: substituir os chips de ano por um `select` (combo) com o rótulo "Ano" quando em mobile. No desktop os chips podem permanecer.

## Capabilities

### New Capabilities
<!-- nenhuma -->

### Modified Capabilities
- `mobile-view-fit`: a Nota passa a ser exibida no topo do card alinhada ao ticker sem rótulo; a tela de Metas não corta texto em mobile; o filtro de anos do Histórico vira combo com rótulo "Ano" no mobile.

## Impact

- `src/app/components/stock-card/stock-card.html` e `stock-card.scss` — reposicionamento da Nota.
- `src/app/components/goals/goals.html` e `goals.scss` — tabela de Metas sem corte de texto no mobile.
- `src/app/components/dividend-history/dividend-history.html` e `dividend-history.scss` — combo de ano com rótulo "Ano" no mobile.
- Sem mudanças de API, modelos de dados ou serviços.

## Why

Os subtítulos descritivos abaixo dos headers ocupam espaço sem agregar informação essencial, deixando as telas mais carregadas. O botão de logout em texto ("Sair") fica destoante de um header enxuto e funciona melhor como ícone. O ícone 🎯 repetido em cada linha da lista de Metas é redundante. E o retry do login (hoje ~25 tentativas) deve falhar mais rápido — 3 tentativas e então exibir o erro.

## What Changes

- Remover os textos (subtítulos) abaixo dos headers:
  - Subtítulos de página de **Minhas Ações**, **Dividendos** e **Metas**.
  - Subtítulo do topo do app ("Análise de dividendos · Ações do Ibovespa").
  - Descrições abaixo dos títulos internos de **Recebidos/Projetados** (`ds-subtitle`).
  - **Manter** o subtítulo de **Meus Ativos** (contém a contagem de lançamentos e o valor Total).
- Trocar o botão de **logout** de texto ("Sair") para um **ícone**.
- Remover o **ícone 🎯** de cada linha da lista de **Minhas Metas**.
- Ajustar o **retry do login** para **3 tentativas** e então exibir o erro.

## Capabilities

### New Capabilities
- `goals-list-display`: apresentação da lista de Metas sem ícone por linha.

### Modified Capabilities
- `page-header-standardization`: headers sem subtítulo (exceto o subtítulo de dados de Meus Ativos).
- `app-logout`: ação de logout representada por ícone.
- `login-resilience`: limite de retry reduzido para 3 tentativas.

## Impact

- `src/app/components/dashboard/dashboard.html` — remover `.header-subtitle` e o `.page-subtitle` de Minhas Ações; logout como ícone.
- `src/app/components/dashboard/dashboard.scss` — ajustar estilo do botão de logout (ícone).
- `src/app/components/dividends/dividends.html` — remover `.page-subtitle`.
- `src/app/components/goals/goals.html` — remover `.page-subtitle` e o `.meta-icon` da lista.
- `src/app/components/dividends-summary/dividends-summary.{html,ts}` — remover `ds-subtitle` e o `subtitle` computado.
- `src/app/components/login/login.ts` — `MAX_INIT_ATTEMPTS` = 3.
- CSS órfão de `.header-subtitle`/`.ds-subtitle`/`.meta-icon` removido conforme aplicável.

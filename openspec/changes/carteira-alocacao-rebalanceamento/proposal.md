## Why

O app acompanha cada ativo isoladamente (P&L, dividendos, e agora preço-teto), mas **não mostra a carteira como um todo**: nenhuma tela responde "estou concentrado demais?" ou "para onde direcionar o próximo aporte?". A decisão de **rebalanceamento** — clássica para o investidor de renda variável brasileiro — fica de fora. A feature de **alocação & rebalanceamento** preenche esse gap usando dados que o app **já carrega** (posições/saldo), comparando a alocação atual a alvos por classe e sinalizando concentração.

## What Changes

- **Calcular a alocação atual por classe** (Ações / FIIs / ETFs) como percentual do patrimônio total, a partir do `saldo` das posições já carregadas.
- **Comparar com alvos configuráveis por classe** (ex.: Ações 50% / FIIs 40% / ETF 10%) e exibir o **desvio** de cada classe (acima/abaixo do alvo) com o valor em R$ para reequilibrar.
- **Sugerir rebalanceamento** tratando **aporte e venda com peso igual** (sem lógica fiscal na v1): classes abaixo do alvo pedem aporte; acima do alvo, redução — ambos com o R$ necessário para convergir.
- **Alertar concentração por ativo**: sinalizar ativos cujo saldo ultrapassa um **limite configurável** (ex.: 20% da carteira).
- **Exibir tudo num card "Alocação"** no topo da aba **Meus Ativos** (barras por classe + desvios + alertas).
- **Persistir alvos e limite no backend** via novo endpoint `/allocation` (dependência externa — ver Impact).

## Capabilities

### New Capabilities
- `carteira-alocacao-calculo`: cálculo puro da alocação atual por classe, desvios vs alvo, montantes de rebalanceamento (aporte/venda) e detecção de concentração por ativo.
- `carteira-alocacao-configuracao`: alvos de alocação por classe + limite de concentração, persistidos no backend.
- `carteira-alocacao-exibicao`: card "Alocação" no topo de Meus Ativos (barras, desvios, alertas) e edição dos alvos/limite.
- `backend-allocation-endpoint`: contrato do endpoint `/allocation` (GET/PUT) no backend — **dependência externa** (repo Go), pré-requisito da persistência.

### Modified Capabilities
<!-- Nenhuma capability existente tem requisitos alterados. -->

## Impact

- **Novo util** `src/app/models/allocation.util.ts` — cálculo puro (%/classe, desvios, rebalanceamento, concentração), testável no estilo de `preco-teto.util.ts`.
- **Novo serviço** `AllocationService` — estado (signals) dos alvos + limite, lendo/gravando via `BackendApiService`.
- **`BackendApiService`** — 2 métodos novos (`getAllocation`/`updateAllocation`) contra o contrato `/allocation`.
- **UI** — novo card de Alocação no topo de Meus Ativos (dashboard) + edição inline/modal dos alvos e do limite.
- **Dados** — usa `saldo` das posições já carregadas em `acoes()`; nada novo a buscar para o cálculo.
- ⚠️ **Dependência externa (backend Go, outro repo):** a persistência depende do endpoint `/allocation` que **não existe neste projeto**. O frontend é construído contra o contrato; o cálculo e a UI funcionam com alvos em memória, mas **a leitura/gravação só persiste quando o endpoint subir** no backend.
- **Não é recomendação de investimento** — alocação-alvo é definida pelo usuário; o app apenas compara e sinaliza.

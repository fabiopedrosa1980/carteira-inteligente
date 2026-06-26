## Context

`valoresOcultos` é um signal local do `DashboardComponent` (persistido em `ci-hide-values`), com toggle no header da seção Meus Ativos e propagado via `@Input() hideValues` para `my-assets` e `allocation-card`. Dividendos e Metas não recebem o estado. O mascaramento usa a classe `.values-hidden` (blur) já existente em my-assets/allocation. `NotificationService.show(msg)` é o toast padrão (usado por `TransactionService`).

## Goals / Non-Goals

**Goals:**
- Estado de privacidade único, global e persistido.
- Controle no menu superior, após o usuário.
- Mascarar todos os totais em R$ de todas as telas; manter percentuais/contagens.
- Toast de sucesso ao editar a distribuição.

**Non-Goals:**
- Mudar o cálculo dos totais ou o backend.
- Mascarar dados não-monetários (percentuais, quantidades, datas).
- Refazer o visual do blur (reusar `.values-hidden`).

## Decisions

### 1. `ValueVisibilityService` como fonte única
Criar serviço `providedIn: 'root'` com `hidden = signal<boolean>` (init de `localStorage['ci-hide-values']`), `toggle()` e persistência. `DashboardComponent` passa a delegar (`valoresOcultos`→`service.hidden`), e o controle do topo chama `service.toggle()`. Componentes que já recebem `@Input() hideValues` podem continuar recebendo (dashboard repassa `service.hidden()`), mas Dividendos/Metas passam a **injetar o serviço diretamente** — evita encadear inputs por componentes intermediários.
- *Alternativa descartada:* manter no Dashboard e propagar por inputs até Dividendos/Metas — exigiria repassar por toda a árvore; um serviço é mais simples e desacoplado.

### 2. Controle no topo, reusando `.icon-btn`
Mover o `<button>` do olho para `header-actions`, imediatamente após `.user-chip` e antes do tema. Reusa o estilo `.icon-btn` já presente. O botão do header da seção Meus Ativos é removido (o estado agora é global no topo).

### 3. Mascaramento por `.values-hidden` em cada tela
Aplicar a classe `values-hidden` (ou o blur equivalente) ao redor dos totais em R$ de cada tela, condicionada ao serviço. Reaproveita o tratamento de blur já usado em Meus Ativos/alocação. Alvos:
- Meus Ativos: patrimônio, saldos, totais por grupo (já cobertos em parte).
- Lançamentos: total investido + totais por seção (já cobertos).
- Dividendos: totais R$ de recebidos/projetados/mensais.
- Metas: valores R$ (atual/alvo) — percentual de progresso permanece.

### 4. Toast de alocação no `saveEdit`
`allocation-card` injeta `NotificationService` e chama `show('Distribuição alterada com sucesso')` dentro de `saveEdit()`, após `alloc.save(...)`. Como o save é otimista (estado atualizado na hora), mostrar logo após é coerente com o padrão atual.

## Risks / Trade-offs

- **Esquecer algum total numa tela** → auditar cada tela por elementos em R$ e cobrir todos; verificar visualmente com a privacidade ligada.
- **Mascarar um percentual por engano** → escopar a classe só aos nós de valor monetário, nunca aos de % / contagem.
- **Migração do estado local→serviço** → manter a mesma chave `ci-hide-values` para preservar a preferência já salva do usuário.

## Migration Plan

1. Criar `ValueVisibilityService` (mesma chave de storage).
2. Dashboard: trocar `valoresOcultos`/`toggleValores` para delegar ao serviço; mover o botão do olho para o topo (após o usuário) e remover do header de Meus Ativos.
3. Dividendos e Metas: injetar o serviço e aplicar `values-hidden` aos totais R$.
4. `allocation-card.saveEdit`: toast de sucesso.
5. Verificar visualmente: ligar privacidade e percorrer as 4 telas; recarregar para confirmar persistência.

## Context

O estado `valoresOcultos` (signal no `DashboardComponent`, persistido em localStorage) controla o recurso de ocultar valores. Hoje a máscara (blur via classe `values-hidden`) é aplicada em:
- `.portfolio-summary` (cards de resumo) — `dashboard.scss`
- `app-allocation-card [hideValues]` — `allocation-card.scss`
- `app-my-assets [hideValues]` (tela de Lançamentos: total do cabeçalho + `.sec-total`) — `my-assets.scss`

A visão em lista da aba Meus Ativos (`.sections-list` → `.accordion`) fica **fora** de `.portfolio-summary` e não recebe nenhuma classe `values-hidden`, então seus totais por grupo (`.sec-total`, vindos de `groupSaldo(group)`) permanecem visíveis ao ocultar.

## Goals / Non-Goals

**Goals:**
- Mascarar os totais por grupo dos acordeões da visão em lista quando os valores estão ocultos.
- Reusar exatamente o mesmo tratamento de blur já adotado nas demais áreas.

**Non-Goals:**
- Não mascarar os valores por linha da tabela interna do acordeão (Preço, Saldo por ativo) — o pedido é sobre os **totais** dos acordeões.
- Não alterar o estado, persistência ou o botão olho (já existem e funcionam).
- Não tocar na tela de Lançamentos (já cobre seus próprios totais).

## Decisions

**1. Classe `values-hidden` na lista de acordeões + regra de blur no `.sec-total`.**
Adicionar `[class.values-hidden]="valoresOcultos()"` ao `.sections-list` da aba Meus Ativos (`dashboard.html`) e, em `dashboard.scss`, mascarar `.sections-list.values-hidden .sec-total` com `filter: blur(7px); user-select: none; pointer-events: none` — idêntico ao padrão de `.alloc-card.values-hidden` e `.meus-ativos.values-hidden`.
- *Alternativa considerada*: um wrapper geral englobando summary + alocação + lista sob um único `.values-hidden`. Rejeitada — o blur dos cards de resumo é específico (`.ps-card-value`) e misturar escopos arriscaria mascarar elementos não-monetários; manter regras dirigidas por classe é mais seguro e idempotente.

**2. Escopo via SCSS do componente.**
Como `dashboard.scss` é escopado ao componente, a regra `.sections-list.values-hidden .sec-total` não afeta o `.sections-list` da tela de Lançamentos (componente `my-assets`), que já tem o seu próprio tratamento.

## Risks / Trade-offs

- [Valores por linha (Saldo por ativo) continuam visíveis ao abrir o acordeão] → fora do escopo declarado ("totais"); pode ser tratado depois se o usuário quiser privacidade total.
- [Blur deixa o número recuperável via inspeção do DOM] → mesma limitação já aceita no recurso atual (proteção contra "olhar por cima do ombro", não criptográfica).

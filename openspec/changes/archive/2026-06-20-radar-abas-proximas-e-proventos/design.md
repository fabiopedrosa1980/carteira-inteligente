## Context

`DividendsComponent` controla as sub-tabs via `activeTab = signal<DividendsTab>` e a lista `tabs: { id, label, iconPath }[]`. Hoje `DividendsTab = 'historico' | 'recebidos' | 'projetados' | 'radar'`, e a aba `radar` renderiza um `ng-container` com `app-proximas-datas-com` + `app-dividends-radar` empilhados.

## Goals / Non-Goals

**Goals:**
- Duas abas independentes: "Próximas datas-com" e "Radar de proventos".
- Manter seletor Ações/FIIs e o comportamento atual de cada componente.

**Non-Goals:**
- Alterar a lógica/visual interno de `proximas-datas-com` ou `dividends-radar`.
- Mexer nas outras abas (Histórico/Recebidos/Projetados).

## Decisions

**1. Tipos de aba.** `DividendsTab` passa a incluir `'proximas'` e `'radar'` no lugar do único `'radar'`. Ordem das abas: Histórico · Recebidos · Projetados · **Próximas datas-com** · **Radar de proventos**.

**2. Rótulos.** "Próximas datas-com" e "Radar de proventos" (o atual era só "Radar").

**3. Ícones.** "Próximas datas-com" recebe um ícone de relógio/agenda (urgência); "Radar de proventos" mantém o ícone de radar atual.

**4. Render.** Substituir o `ng-container` empilhado por dois blocos:
- `*ngIf="activeTab() === 'proximas'"` → `app-proximas-datas-com`
- `*ngIf="activeTab() === 'radar'"` → `app-dividends-radar`

**5. Aba inicial.** Mantém `historico` como default; sem mudança.

## Risks / Trade-offs

- [Quebra de muscle-memory] quem usava "Radar" para ver as duas coisas agora alterna abas. Aceitável — ganho de foco supera.
- [Mais abas na faixa] 5 sub-tabs podem apertar em telas estreitas; os rótulos longos ("Próximas datas-com") exigem conferir o wrap/scroll horizontal já existente em `.dv-tabs`.

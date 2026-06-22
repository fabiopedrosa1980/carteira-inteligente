## Context

O app tem uma linguagem consolidada para cards de métrica nos cards de resumo do dashboard (`.ps-card`): superfície neutra (`var(--card-bg)` + `var(--border)`, raio 10px), cabeçalho com rótulo uppercase 11px em `--text-secondary` à esquerda e um tile de ícone 30×30 à direita com tinta de accent (`color-mix(in srgb, var(--accent) 12%, transparent)`, glifo em `--accent`), e o valor em `--text-primary` com `font-variant-numeric: tabular-nums` (herói a 22px/700).

O card de total das telas Recebidos/Projetados (`.ds-total-card`) destoa: fundo verde hardcoded `rgba(26,127,75,0.1)`, borda verde, valor em `var(--accent)` e medidas em `rem`. Em tema claro o verde fixo fica fora da paleta, e mesmo no escuro o card não conversa com os demais.

Também removemos o título redundante do tooltip de oportunidade.

## Goals / Non-Goals

**Goals:**
- Card de total visualmente irmão dos cards de resumo, sem wash verde nem número colorido.
- Tooltip de oportunidade sem título próprio (veredito lidera).

**Non-Goals:**
- Mudar dados, cálculos, ordenação ou o acordeão de detalhamento por ativo.
- Redesenhar a tela inteira de Recebidos/Projetados — só o card de total.
- Inventar uma nova linguagem de card; o objetivo é aderir à existente (restrição = identidade).

## Decisions

### Plano de design (alinhamento à identidade existente)

- **Cor:** sem nova paleta. Superfície `--card-bg`; borda `--border`; rótulo `--text-secondary`; valor `--text-primary`; accent restrito ao tile de ícone via `color-mix(in srgb, var(--accent) 12%, transparent)` + glifo `--accent`. A semântica "dinheiro" deixa de ser carregada pelo fundo/número e passa a ser carregada pelo ícone — mesma estratégia dos cards "Dividendos recebidos/A receber" do dashboard.
- **Tipo:** sem novas fontes. Rótulo 11px/500 uppercase `letter-spacing: 0.04em`; valor herói 22px/700 `tabular-nums` — exatamente os tokens de `.ps-card`/`.ps-card-hero`.
- **Layout:** card com cabeçalho (rótulo + tile de ícone) e valor abaixo, espelhando `.ps-card-top`. Ícone por modo: "recebido" usa um glifo de entrada/moeda (seta para baixo em círculo); "projetado" usa um glifo de calendário/projeção. Reaproveitar os mesmos paths de ícone já usados na aba (Recebidos/Projetados em `dividends.ts`) para coerência entre a aba e o card.

```
ANTES (.ds-total-card)            DEPOIS (linguagem .ps-card)
┌───────────────────────┐        ┌───────────────────────────┐
│ TOTAL RECEBIDO        │  wash  │ TOTAL RECEBIDO        ⌜◢⌟  │  tile accent
│ R$ 1.234,56 (verde)   │ verde  │ R$ 1.234,56 (text-primary)│
└───────────────────────┘        └───────────────────────────┘
   fundo+número verdes               superfície neutra; accent só no ícone
```

- **Assinatura:** não há assinatura nova — a "assinatura" desta tela é justamente pertencer ao sistema de cards do app. Risco aqui seria criar algo único; a escolha deliberada é a coerência.

### Tooltip sem título

- Remover o elemento `<span class="ot-title">` e a regra `.ot-title` (órfã após a remoção). O veredito `.ot-verdict` já tem peso/tamanho de cabeçalho, então nenhum ajuste de espaçamento adicional é necessário além de validar o respiro do topo.

## Risks / Trade-offs

- [Perder o sinal "verde = dinheiro" ao tirar a cor do número] → mitigado pelo tile de ícone com tinta de accent, padrão já usado e reconhecido nos cards de proventos do dashboard.
- [Glifos diferentes por modo podem divergir da aba] → mitigado reusando os paths de ícone já definidos para Recebidos/Projetados.
- [Especificidade de CSS ao reescrever `.ds-total-*`] → manter os mesmos seletores de classe, só trocando valores; evita conflito de cascata.

## Open Questions

- Nenhuma.

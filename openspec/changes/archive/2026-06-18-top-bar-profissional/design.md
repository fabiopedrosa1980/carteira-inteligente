## Context

Subject: terminal de carteira/dividendos da B3 para o investidor pessoa física. Job da barra superior: identidade da marca + controles de sessão + navegação. Identidade já estabelecida no app: tema dark GitHub-like, verde de destaque (`--accent` #2ea043 dark / #1a7f4b light), figuras em fonte monoespaçada com `tabular-nums`. A barra hoje usa emojis (📈 logo, ☀️/🌙 tema, 📊/📈/📅/🎯 abas), o que destoa de um produto financeiro.

## Plano de design (frontend-design)

**Color (tokens existentes, sem nova paleta):** `--bg`, `--header-bg`, `--card-bg`, `--border`, `--text-primary`, `--text-secondary`, `--accent`. A barra é quieta (superfícies neutras), o verde aparece só na marca e no estado ativo.

**Type:** wordmark "Carteira Inteligente" na sans do app; "Inteligente" em peso 700 e cor de destaque, "Carteira" em peso 500. Rótulos das abas 14px/600. Sem nova fonte — disciplina no espaçamento e peso.

**Layout (toolbar):**
```
┌───────────────────────────────────────────────────────────────┐
│ [▮▯▮ mark] Carteira Inteligente            [avatar nome] [☼][⎋] │
├───────────────────────────────────────────────────────────────┤
│  ▮ Meus Ativos   ▮ Minhas Ações   ▮ Dividendos   ▮ Metas       │
└───────────────────────────────────────────────────────────────┘
```
Header sticky no topo; abas logo abaixo, com indicador de ativo (borda inferior) e ícone SVG à esquerda do rótulo.

**Signature:** a **marca SVG de barras ascendentes** (candlestick/bar mark) em verde de destaque, reaproveitando a linguagem do brand-icon da tela de login — o único elemento "de marca", tudo ao redor permanece sóbrio.

## Decisions

**1. Marca SVG.** Trocar `📈` por um `<svg>` inline de 3 barras ascendentes (rect arredondados, opacidades crescentes) em `var(--accent)`, ~24px. Wordmark mantém o destaque em "Inteligente".

**2. Ícones SVG das abas.** Em `dashboard.ts`, trocar `icon` (emoji) por `iconPath` (string com o `d` de um ícone de traço, viewBox 24): Meus Ativos = grade/portfólio; Minhas Ações = linha ascendente (trending-up); Dividendos = calendário; Metas = alvo. No template, `<svg ...><path [attr.d]="tab.iconPath"></path></svg> {{ tab.label }}`, com `stroke: currentColor`.

**3. Controles consistentes.** `btn-theme` e `btn-logout` viram botões-ícone do mesmo tamanho (36×36, raio 8), `color: var(--text-secondary)`, hover com borda/realce; tema usa SVG sol/lua alternado por `isDark()`. `:focus-visible` com outline de destaque. Chip de usuário refinado (avatar 28px + nome, borda sutil).

**4. Header sticky + refino.** `.dashboard-header { position: sticky; top: 0; z-index }` com a `.tab-nav` também fixa logo abaixo (ou o conjunto num wrapper sticky). Ajustar paddings/altura, alinhamento vertical central, divisória sutil; respeitar `prefers-reduced-motion` (sem novas animações além de um fade discreto na marca, opcional).

## Risks / Trade-offs

- [Sticky cobre conteúdo] → garantir z-index e que o `.content` não fique sob a barra; testar rolagem.
- [Excesso de design] → manter a marca como único destaque; controles e abas quietos (skill: "remove one accessory").
- [Ícones SVG inline aumentam o HTML] → aceitável; sem dependência de biblioteca de ícones.
- [Acessibilidade] → `aria-label`/`title` nos botões-ícone; foco visível; contraste do estado ativo.

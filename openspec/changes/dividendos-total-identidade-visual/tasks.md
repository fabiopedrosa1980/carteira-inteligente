## 1. Remover título do tooltip de oportunidade

- [x] 1.1 Em `dashboard.html`, remover o `<span class="ot-title">Oportunidade</span>` do tooltip
- [x] 1.2 Em `dashboard.scss`, remover a regra `.ot-title` (órfã) e validar o respiro do topo do tooltip

## 2. Card de total — alinhar à identidade

- [x] 2.1 Em `dividends-summary.ts`, expor um `totalIconPath` por modo (recebidos = glifo "$"; projetados = glifo de tendência), reusando os paths das abas em `dividends.ts`
- [x] 2.2 Em `dividends-summary.html`, reestruturar o `.ds-total-card`: cabeçalho com rótulo + tile de ícone (`.ds-total-icon` com o `totalIconPath`) e o valor abaixo
- [x] 2.3 Em `dividends-summary.scss`, reestilizar `.ds-total-card` para superfície neutra (`var(--card-bg)`/`var(--border)`), remover o wash verde
- [x] 2.4 Rótulo em `--text-secondary` (uppercase 11px/500, letter-spacing 0.04em) e valor herói em `--text-primary` (22px/700, `tabular-nums`)
- [x] 2.5 Estilizar `.ds-total-icon` como tile 30×30 com `color-mix(in srgb, var(--accent) 12%, transparent)` e glifo `--accent`, espelhando `.ps-card-icon`

## 3. Verificação

- [x] 3.1 Rodar `ng build` e validar ausência de erros
- [ ] 3.2 Conferir visualmente: tooltip sem título (veredito lidera); card de total em Recebidos e Projetados com superfície neutra e accent só no ícone, em tema claro e escuro
- [x] 3.3 Rodar `npx prettier --write` nos arquivos alterados

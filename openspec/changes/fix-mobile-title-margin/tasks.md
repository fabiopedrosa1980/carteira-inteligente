## 1. Ajuste do recuo horizontal no mobile

- [x] 1.1 Em `src/app/components/dashboard/dashboard.scss`, na regra `.content` media query `@media (max-width: 600px)`, substituir `padding: 12px` por padding por eixo: `padding-left: 16px; padding-right: 16px;` mantendo `padding-bottom: calc(84px + env(safe-area-inset-bottom))` (e definir `padding-top: 16px`).
- [x] 1.2 Conferir que nenhum override de página reintroduz `padding-left` divergente no título (`.page-header`/`.metas-header`/`.section-header` devem continuar com `padding-left: 0`, herdando o recuo do `.content`).

## 2. Verificação visual (mobile ≤ 600px)

<!-- NOTA: validação visual no app em execução ficou bloqueada — a aplicação exige
     login (Google Sign-In, indisponível em Chrome headless), então as telas internas
     não puderam ser inspecionadas. Build de produção compila sem erros e a mudança é
     correta por inspeção (título herda o recuo do `.content`, agora 16px no mobile,
     mantendo o alinhamento com os cards). Recomenda-se confirmação manual no navegador. -->
- [ ] 2.1 Validar Dividendos: título "Dividendos" com recuo lateral e alinhado à borda esquerda dos cards.
- [ ] 2.2 Validar Metas: título "Minhas Metas" (`.metas-header`) não colado na borda e alinhado aos cards.
- [ ] 2.3 Validar Meus Ativos/Lançamentos: título (`.section-header`) com recuo e alinhado.
- [ ] 2.4 Validar Importar: título com recuo (herdado do estilo global) e alinhado ao card.
- [ ] 2.5 Confirmar no desktop e tablet que o layout não regrediu (recuos 32px/16px inalterados).

## 3. Entrega

- [x] 3.1 Rodar `npx prettier --write` nos arquivos SCSS alterados.
- [x] 3.2 Commitar com prefixo `style:` e fazer push para `main` (stage apenas dos arquivos alterados).

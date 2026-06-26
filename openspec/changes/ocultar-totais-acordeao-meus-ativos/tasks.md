## 1. Mascarar os totais dos acordeões

- [x] 1.1 Em `dashboard.html`, adicionar `[class.values-hidden]="valoresOcultos()"` ao `.sections-list` da visão em lista da aba Meus Ativos.
- [x] 1.2 Em `dashboard.scss`, mascarar `.sections-list.values-hidden .sec-total` com `filter: blur(7px); user-select: none; pointer-events: none` (mesmo padrão dos demais blocos).

## 2. Validação

- [x] 2.1 `npx prettier --write` nos arquivos alterados.
- [x] 2.2 `ng build` sem erros (avisos de budget pré-existentes são aceitáveis).
- [x] 2.3 Conferir na aba Meus Ativos: ao ocultar valores, os totais por grupo dos acordeões ficam mascarados; rótulo, contagem e chevron permanecem; ao exibir, voltam ao normal. Lançamentos e cards de resumo seguem como antes.

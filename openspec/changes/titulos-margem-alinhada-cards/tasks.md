## 1. Auditoria de alinhamento

- [x] 1.1 Listar as telas que usam `.page-title` (Meus Ativos, Lançamentos, Dividendos, Radar, Metas e outras)
- [x] 1.2 Medir, por tela, o recuo horizontal efetivo do título vs. dos cards em desktop e mobile
- [x] 1.3 Marcar quais telas estão desalinhadas

## 2. Ajuste de CSS

- [x] 2.1 Padronizar a "calha" horizontal de título + cards (herdar padding do `.content` ou wrapper comum) em `src/styles.scss`/SCSS por tela
- [x] 2.2 Corrigir as telas marcadas como desalinhadas (desktop)
- [x] 2.3 Corrigir o alinhamento nos breakpoints mobile
- [x] 2.4 Garantir que tipografia/tamanho do título não mudaram

## 3. Verificação

- [ ] 3.1 Conferir visualmente cada tela: borda esquerda do título encostada na coluna dos cards (desktop)
- [ ] 3.2 Conferir o mesmo em mobile
- [ ] 3.3 Conferir consistência entre todas as telas
- [x] 3.4 `npx prettier --write` nos arquivos alterados e `ng build` sem erros

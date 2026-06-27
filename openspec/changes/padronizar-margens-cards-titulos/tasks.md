## 1. Auditoria do recuo atual

- [x] 1.1 Mapear o recuo horizontal (desktop e mobile) de cada tela: Meus Ativos (`$pad-x`), Dividendos (`$dv-pad-x`), Portfolio (`.section-header`), Metas (`.metas-header`), Importar (`.import-screen`)
- [x] 1.2 Definir o valor canônico (revisado para 16px em todos os breakpoints — ver design D1) e listar as telas fora do padrão

## 2. Ajustes para o recuo padrão de 16px

- [x] 2.1 `my-assets.scss` (`$pad-x`) e `dividends.scss` (`$dv-pad-x`): 20px → 16px
- [x] 2.2 `dashboard.scss`: `.section-header`, `.accordion-header` e `.add-row` (cards do Portfolio) 20px → 16px no desktop
- [x] 2.3 `import.scss`: remover `max-width`/`margin: 0 auto`; alinhar à esquerda com recuo 16px
- [x] 2.4 `goals.scss`: já em 16px — confirmar que permanece como referência (sem alteração)

## 3. Verificação

- [x] 3.1 `npx prettier --write` nos SCSS alterados e `ng build` sem erros
- [ ] 3.2 Validar visualmente as 5 abas em desktop: título e cards na mesma coluna ao alternar
- [ ] 3.3 Validar visualmente em mobile (≤600px): recuo 16px consistente em todas as telas
- [ ] 3.4 Commit e push em `carteira-inteligente`

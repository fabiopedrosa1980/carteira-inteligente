## 1. Abas (dividends.ts)

- [x] 1.1 Trocar o tipo `DividendsTab`: substituir `'radar'` por `'proximas' | 'radar'`
- [x] 1.2 Atualizar a lista `tabs`: adicionar "Próximas datas-com" (ícone de relógio/agenda) e renomear a do radar para "Radar de proventos"

## 2. Render (dividends.html)

- [x] 2.1 Remover o `ng-container` que empilha os dois componentes na aba radar
- [x] 2.2 Renderizar `app-proximas-datas-com` em `*ngIf="activeTab() === 'proximas'"`
- [x] 2.3 Renderizar `app-dividends-radar` em `*ngIf="activeTab() === 'radar'"`

## 3. Verificação

- [x] 3.1 `ng build` sem erros; conferir as duas abas separadas, cada uma com seu conteúdo, e o seletor Ações/FIIs funcionando
- [x] 3.2 `npx prettier --write` nos arquivos alterados; commit e push

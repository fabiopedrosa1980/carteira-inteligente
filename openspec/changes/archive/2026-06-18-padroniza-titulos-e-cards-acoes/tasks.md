## 1. Padrão global de header

- [x] 1.1 Em `src/styles.scss`, criar as classes utilitárias `.page-header`, `.page-title`, `.page-title-icon` (20px) e `.page-subtitle`, espelhando o visual da aba Meus Ativos.

## 2. Adotar o padrão nas páginas

- [x] 2.1 `my-assets.{html,scss}`: adotar as classes globais no header (referência), removendo valores locais redundantes.
- [x] 2.2 `dashboard.{html,scss}`: header de Minhas Ações usando o padrão global; alinhar margem.
- [x] 2.3 `goals.{html,scss}`: header de Metas no padrão global, corrigindo o ícone de 22px para 20px.

## 3. Header da aba Dividendos

- [x] 3.1 Em `dividends.html`, adicionar `📅 Dividendos` + subtítulo acima de `.dv-tabs`, usando o padrão global.

## 4. Pills Maior Baixa e Maior Nota

- [x] 4.1 Em `dashboard.ts`, adicionar os computeds `minChange`, `maxNota` e `topNotaStock`.
- [x] 4.2 Em `dashboard.html`, adicionar os pills "Maior Baixa" (valor em vermelho quando negativo) e "Maior Nota" (valor + ticker) em `.portfolio-stats`.
- [x] 4.3 Em `dashboard.scss`, adicionar `.sp-value.neg` e o estilo do sub-ticker (`.sp-sub`) do pill de nota.

## 5. Rótulos das sub-tabs no mobile

- [x] 5.1 Em `dividends.scss`, remover o `display: none` de `.dv-tab-label` no `@media (max-width: 480px)`, ajustando padding se necessário para Histórico/Recebidos/Projetados.

## 6. Verificação e entrega

- [x] 6.1 Rodar `npx prettier --write` nos arquivos alterados e validar o build (`ng build`).
- [x] 6.2 Commit e push seguindo o workflow do projeto (`style:`/`feat:`).

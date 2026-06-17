## 1. Cálculo da quebra mensal

- [x] 1.1 Estender `SummaryRow` com `months: { month: number; label: string; value: number }[]`
- [x] 1.2 Adicionar constante de nomes de meses em português (abreviados)
- [x] 1.3 Recebidos: acumular por mês `amount × cotas elegíveis` dos proventos do ano atual (mesma regra de data-com)
- [x] 1.4 Projetados: acumular por mês `amount × cotas atuais` dos proventos do ano anterior
- [x] 1.5 Converter mapa de meses em lista ordenada (1→12), descartando meses com valor 0; garantir que a soma dos meses = total do ativo

## 2. Estado de expansão

- [x] 2.1 Adicionar signal `expanded: Set<string>` com `toggle(ticker)` e `isExpanded(ticker)` (inicial: colapsado)

## 3. Apresentação (acordeão)

- [x] 3.1 Transformar a linha de ativo em cabeçalho clicável (Ativo, Cotas, Total, chevron)
- [x] 3.2 Renderizar linhas de meses (Mês / Valor) quando o ativo estiver expandido
- [x] 3.3 Estilos do detalhamento mensal (recuo, fundo sutil, chevron) com variáveis de tema

## 4. Verificação

- [x] 4.1 `npx ng build` sem erros
- [x] 4.2 Validar: expandir/colapsar funciona; soma dos meses = total do ativo; Recebidos respeita data-com; Projetados usa ano anterior
- [x] 4.3 `npx prettier --write` nos arquivos alterados
- [x] 4.4 Commit e push seguindo Conventional Commits

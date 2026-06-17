## 1. Nome da empresa

- [x] 1.1 Em `stock-card.ts`, alterar o limite de `displayName` de 40 para 30 caracteres, preservando o fallback `—`.

## 2. Nota como stat na faixa

- [x] 2.1 Em `stock-card.html`, remover o bloco `.card-bottom`/`.nota-badge` e adicionar um `.stat` "Nota" dentro da `.stat-strip`, após DY, com `*ngIf="stock.nota > 0"` e `.stat-value` aplicando `notaClass`.
- [x] 2.2 Em `stock-card.scss`, remover as regras órfãs `.card-bottom`, `.nota-badge`, `.nota-star` e `.nota-value`, mantendo `.stat-value.nota-high/mid/low`.

## 3. Verificação e entrega

- [x] 3.1 Rodar `npx prettier --write` nos arquivos alterados e validar o build (`ng build`).
- [x] 3.2 Commit e push seguindo o workflow do projeto (`style:`).

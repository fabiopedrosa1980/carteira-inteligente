## 1. Cores por tipo

- [x] 1.1 Em `styles.scss`, trocar `--class-etf` para um roxo distinto do azul (dark `#a855f7`, light `#9333ea`); manter Ações verde e FIIs azul. Conferir contraste/distinção nos dois temas.

## 2. Limite por tipo (cap) no lugar do aviso

- [x] 2.1 Em `allocation-card.ts`, no `setClassTarget`, limitar o valor a `100 − (soma dos alvos das outras classes)` (além de `[0,100]`); arraste e teclado usam o mesmo caminho, então a soma nunca passa de 100%.
- [x] 2.2 Remover o aviso de soma (`.alloc-warn`) do HTML; limpar `targetsSum` se ficar sem uso.

## 3. Cores das ações (ledger)

- [x] 3.1 No `allocation-card.scss`, ajustar `.act.st-abaixo` (aportar) para verde (`--color-pos`), `.act.st-acima` (reduzir) para vermelho (`--color-neg`) e `.act.st-no-alvo` para neutro (`--text-secondary`).

## 4. Verificação

- [x] 4.1 `ng build` e validar: 3 cores distintas (sem dois azuis), arrastar/teclar não passa de 100% por classe, sem mensagem de soma, aportar=verde / reduzir=vermelho, ledger/persistência ok.
- [x] 4.2 Commit e push (stage de arquivos específicos).

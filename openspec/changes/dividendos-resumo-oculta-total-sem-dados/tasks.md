## 1. Ocultar total sem dados

- [ ] 1.1 Em `dividends-summary.html`, adicionar `*ngIf="rows().length > 0"` ao card `.ds-total-card`, para que o total ("Total recebido" / "Total projetado") não apareça no estado vazio.

## 2. Verificação

- [ ] 2.1 Rodar `ng build` e validar: sem dados, Recebidos/Projetados mostram apenas o bloco vazio (sem o card de total); com dados, o total e a lista aparecem normalmente.
- [ ] 2.2 Commit e push seguindo o fluxo do projeto (stage de arquivos específicos).

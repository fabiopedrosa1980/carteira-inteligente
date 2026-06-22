## 1. Histórico — alinhar ao padrão de Projetados

- [ ] 1.1 Em `dividend-history.scss`, restaurar `border: 1px solid var(--border)` em `.dh-section` (alinhando ao `.ds-section`).
- [ ] 1.2 Em `dividend-history.scss`, ajustar a `margin` de `.dh-title` para `0 0 0.35rem` (igual ao `.ds-title`).

## 2. Radar — alinhar ao padrão de Projetados

- [ ] 2.1 Em `dividends-radar.scss`, adicionar a regra `.radar-section` com `margin-top: 2rem; padding: 1.5rem; background: var(--card-bg); border-radius: 12px; border: 1px solid var(--border);`.
- [ ] 2.2 Em `dividends-radar.scss`, ajustar `.radar-title` para `font-size: 1.1rem; font-weight: 600; margin: 0 0 0.35rem; display: flex; align-items: center; gap: 0.5rem;` (mantendo a cor).

## 3. Verificação

- [ ] 3.1 Rodar `ng build` e validar visualmente que Histórico e Radar exibem o mesmo card/borda/título de Projetados, sem regressão em Recebidos/Projetados e com a matriz do Radar contida no card.
- [ ] 3.2 Commit e push seguindo o fluxo do projeto (stage de arquivos específicos).

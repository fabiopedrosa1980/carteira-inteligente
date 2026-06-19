## REMOVED Requirements

### Requirement: Faixa de próximas datas-com estimadas

**Reason**: Simplificação do produto — a estimativa por cadência trazia pouco valor acionável com a carteira atual; a comunicação passa a ser feita pelos textos nos cards do Radar.

**Migration**: A sub-tab e o componente são removidos da aplicação. A função antes pretendida (chamar atenção para oportunidade) é coberta pelos textos "Oportunidade de compra" (próximo mês) e "Melhor mês, aproveite" (mês com mais ativos) no Radar.

### Requirement: Estimativa da próxima data-com por cadência

**Reason**: O motor de cadência só existia para alimentar a faixa removida.

**Migration**: Nenhuma — a lógica de estimativa (`cadence.ts`) é excluída junto com o componente.

### Requirement: Horizonte da faixa

**Reason**: Parâmetro exclusivo da faixa removida.

**Migration**: Nenhuma.

## ADDED Requirements

### Requirement: Campo Preço Unit. com máscara de moeda

No modal de lançamento (adicionar/editar ativo), o campo **Preço Unit.** SHALL aplicar uma **máscara de moeda BRL** enquanto o usuário digita, exibindo o valor formatado (separador de milhar com ponto e decimais com vírgula, ex.: `1.234,56`). O valor **numérico** correspondente MUST ser mantido para cálculo do total e para salvar. A máscara MUST conviver com o preenchimento automático pela cotação (o valor vindo da cotação aparece formatado) e com a edição manual.

#### Scenario: Formatação ao digitar

- **WHEN** o usuário digita dígitos no campo Preço Unit.
- **THEN** o valor é exibido formatado como moeda BRL (ex.: `1.234,56`)
- **AND** o total estimado usa o valor numérico correspondente

#### Scenario: Preço preenchido pela cotação

- **WHEN** a cotação preenche o preço automaticamente
- **THEN** o valor aparece formatado com a máscara de moeda

#### Scenario: Valor salvo é numérico

- **WHEN** o usuário salva o lançamento
- **THEN** o preço persistido é o número correspondente ao valor digitado (não a string formatada)

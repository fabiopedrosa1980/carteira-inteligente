## ADDED Requirements

### Requirement: Contraste dos badges Dividendo/JCP no tema light

No tema light, os badges de tipo de provento **Dividendo** e **JCP** SHALL usar cores com contraste suficiente para destacarem sobre o fundo claro. O tema dark NÃO SHALL ser regredido.

#### Scenario: Badges legíveis no tema light
- **WHEN** o histórico de dividendos é exibido no tema light
- **THEN** os badges Dividendo e JCP aparecem com cores escuras/saturadas, claramente legíveis sobre o fundo claro

#### Scenario: Tema dark preservado
- **WHEN** o histórico de dividendos é exibido no tema dark
- **THEN** os badges mantêm a aparência atual, sem regressão de contraste

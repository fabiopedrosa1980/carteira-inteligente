## ADDED Requirements

### Requirement: Erro da API no lançamento é exibido e o modal permanece aberto

Ao salvar um lançamento, quando a API responder com erro (ex.: **HTTP 422** por tipo incompatível com o catálogo), a aplicação SHALL interromper o estado de carregamento, exibir a **mensagem retornada pela API** no modal e **manter o modal aberto** para correção. A aplicação MUST NOT fechar o modal nem registrar o lançamento quando a API rejeitar. Quando a resposta de erro não trouxer mensagem utilizável, a aplicação SHALL exibir uma mensagem genérica de falha.

#### Scenario: 422 de tipo incompatível é exibido

- **WHEN** a API rejeita o POST do lançamento com 422 e mensagem de incompatibilidade de tipo
- **THEN** o modal exibe a mensagem da API
- **AND** o modal permanece aberto e o spinner de salvamento é interrompido

#### Scenario: Sucesso fecha o modal normalmente

- **WHEN** a API aceita o lançamento
- **THEN** o lançamento é registrado e o modal fecha

#### Scenario: Erro sem mensagem mostra fallback

- **WHEN** a API falha sem mensagem utilizável no corpo
- **THEN** o modal exibe uma mensagem genérica de falha e permanece aberto

### Requirement: Seção com tipo travado valida o ticker antes de enviar

No modal aberto a partir de uma seção de Lançamentos (tipo travado pela seção), a aplicação SHALL consultar o ticker informado (cotação/catálogo) e, quando o tipo resolvido divergir do tipo da seção, **impedir o salvamento** com mensagem clara — sem depender exclusivamente da resposta da API. A validação da API (422) MUST permanecer como rede de segurança para casos de corrida (cotação ainda não resolvida no momento do envio).

#### Scenario: Bloqueia ticker incompatível com a seção

- **WHEN** o modal é aberto pela seção "Ações" e o usuário informa um ticker cujo tipo resolvido é "FIIs" (ex.: MXRF11)
- **THEN** o salvamento é impedido com mensagem de incompatibilidade, sem chamar a API

#### Scenario: Rede de segurança da API cobre a corrida

- **WHEN** o tipo ainda não foi resolvido no front no momento do envio e a API rejeita com 422
- **THEN** a mensagem da API é exibida e o modal permanece aberto

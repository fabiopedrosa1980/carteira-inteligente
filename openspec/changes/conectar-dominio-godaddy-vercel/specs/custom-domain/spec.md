## ADDED Requirements

### Requirement: Domínio personalizado vinculado ao projeto Vercel

O sistema SHALL servir a aplicação Angular publicada na Vercel através do domínio personalizado `carteira-inteligente.com` e do subdomínio `www.carteira-inteligente.com`, ambos adicionados ao projeto Vercel `carteira-inteligente-eight`.

#### Scenario: Acesso pelo domínio apex

- **WHEN** um usuário acessa `https://carteira-inteligente.com`
- **THEN** a aplicação carregada é exatamente a mesma servida em `carteira-inteligente-eight.vercel.app`

#### Scenario: Acesso pelo subdomínio www

- **WHEN** um usuário acessa `https://www.carteira-inteligente.com`
- **THEN** a aplicação responde sem erro de domínio não configurado

#### Scenario: Fallback Vercel preservado

- **WHEN** um usuário acessa `https://carteira-inteligente-eight.vercel.app`
- **THEN** a aplicação continua acessível normalmente

### Requirement: Registros DNS na GoDaddy

A zona DNS de `carteira-inteligente.com` na GoDaddy SHALL conter os registros indicados pela Vercel: um registro `A` para o apex apontando para o IP da Vercel e um registro `CNAME` para `www` apontando para o host da Vercel.

#### Scenario: Verificação do registro A do apex

- **WHEN** uma consulta DNS `A` é feita para `carteira-inteligente.com`
- **THEN** o resultado retorna o endereço IP fornecido pela Vercel (ex.: `76.76.21.21`)

#### Scenario: Verificação do CNAME do www

- **WHEN** uma consulta DNS `CNAME` é feita para `www.carteira-inteligente.com`
- **THEN** o resultado aponta para o host da Vercel (ex.: `cname.vercel-dns.com`)

#### Scenario: Domínio validado na Vercel

- **WHEN** os registros DNS já propagaram
- **THEN** o painel da Vercel exibe os domínios com status "Valid Configuration"

### Requirement: HTTPS com certificado automático

O sistema SHALL servir o domínio personalizado exclusivamente sob HTTPS, com certificado TLS emitido e renovado automaticamente pela Vercel.

#### Scenario: Certificado válido emitido

- **WHEN** um usuário acessa `https://carteira-inteligente.com`
- **THEN** a conexão usa um certificado TLS válido e sem aviso de segurança no navegador

#### Scenario: Redirecionamento de HTTP para HTTPS

- **WHEN** um usuário acessa `http://carteira-inteligente.com`
- **THEN** o sistema redireciona automaticamente para `https://`

### Requirement: Domínio canônico e redirect

O sistema SHALL definir um domínio canônico (apex ou `www`) e SHALL redirecionar o outro domínio para o canônico via HTTP 301 para evitar conteúdo duplicado.

#### Scenario: Redirect para o domínio canônico

- **WHEN** um usuário acessa a variante não canônica do domínio
- **THEN** o sistema responde com HTTP 301 redirecionando para a variante canônica

### Requirement: CORS do backend aceita a nova origem

O backend (`carteira-inteligente-api.onrender.com`) SHALL aceitar requisições com origem `https://carteira-inteligente.com` (e `https://www.carteira-inteligente.com`) para que as chamadas de API da aplicação funcionem a partir do novo domínio.

#### Scenario: Chamada de API a partir do domínio personalizado

- **WHEN** a aplicação carregada em `https://carteira-inteligente.com` chama `BackendApiService.getStocks()`
- **THEN** a resposta retorna com sucesso, sem erro de CORS no navegador

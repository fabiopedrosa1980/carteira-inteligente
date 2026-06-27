## Why

O frontend já está publicado na Vercel em `carteira-inteligente-eight.vercel.app`, mas esse endereço é difícil de divulgar e não transmite marca própria. O domínio `carteira-inteligente.com` já foi adquirido na GoDaddy e está ocioso. Conectar os dois entrega ao usuário final uma URL profissional, memorável e com HTTPS automático.

## What Changes

- Adicionar o domínio personalizado `carteira-inteligente.com` (apex) e `www.carteira-inteligente.com` ao projeto na Vercel.
- Configurar os registros DNS na GoDaddy (registro A para o apex apontando para a Vercel e registro CNAME para o `www`) conforme os valores indicados pela Vercel.
- Definir o domínio canônico (apex ou `www`) e configurar o redirect 301 do outro para o canônico.
- Garantir emissão e renovação automática do certificado TLS/SSL pela Vercel.
- Validar que `carteira-inteligente-eight.vercel.app` continua funcionando e que o novo domínio serve a mesma aplicação.

## Capabilities

### New Capabilities
- `custom-domain`: Vincula o domínio próprio `carteira-inteligente.com` (registrado na GoDaddy) ao deployment da aplicação na Vercel, incluindo configuração de DNS, política de canônico/redirect e provisionamento de HTTPS.

### Modified Capabilities
<!-- Nenhuma capability existente tem requisitos alterados; esta é uma mudança de infraestrutura/deploy. -->

## Impact

- **Infraestrutura/Deploy**: Projeto Vercel (`carteira-inteligente-eight`) ganha domínios personalizados; nenhuma mudança no código-fonte Angular é necessária.
- **DNS (GoDaddy)**: Alteração na zona DNS de `carteira-inteligente.com` (registros A e CNAME); pode haver propagação de até 48h.
- **API backend**: `BackendApiService` e `StockApiService` apontam para `carteira-inteligente-api.onrender.com`; verificar CORS no backend Go para aceitar a nova origem `https://carteira-inteligente.com`.
- **Usuário final**: Passa a acessar a aplicação pela URL de marca com HTTPS; o endereço `.vercel.app` permanece como fallback.

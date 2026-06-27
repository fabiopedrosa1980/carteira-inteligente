## Context

A aplicação Angular 21 está hospedada na Vercel (projeto `carteira-inteligente-eight`, URL atual `carteira-inteligente-eight.vercel.app`). O domínio `carteira-inteligente.com` está registrado na GoDaddy, que também é o provedor de DNS (nameservers padrão da GoDaddy). O backend roda separadamente na Render (`carteira-inteligente-api.onrender.com`) e é consumido via `BackendApiService` e `StockApiService`.

Esta é uma mudança puramente de infraestrutura/DNS: não há alteração no código Angular. O trabalho ocorre em dois painéis externos (Vercel e GoDaddy) e, possivelmente, na configuração de CORS do backend.

Restrição importante: não tenho acesso direto aos painéis da Vercel e da GoDaddy. As tarefas que envolvem esses painéis são manuais para o usuário; meu papel é fornecer os valores exatos e os comandos de verificação.

## Goals / Non-Goals

**Goals:**
- `https://carteira-inteligente.com` e `https://www.carteira-inteligente.com` servirem a aplicação atual.
- HTTPS automático via certificado gerenciado pela Vercel.
- Definir o domínio canônico e o redirect 301 do outro.
- Garantir que as chamadas de API funcionem do novo domínio (CORS).

**Non-Goals:**
- Trocar de provedor de DNS (manter GoDaddy; não migrar nameservers para a Vercel).
- Configurar e-mail no domínio (MX records).
- Alterar o hosting do backend (Render permanece).
- Qualquer mudança no código-fonte Angular além de verificação.

## Decisions

### Decisão 1: Manter DNS na GoDaddy, adicionar registros A + CNAME (não trocar nameservers)
- **Escolha**: Manter os nameservers da GoDaddy e apenas editar registros na zona DNS — registro `A` no apex (`@`) → IP da Vercel (`76.76.21.21`) e `CNAME` em `www` → `cname.vercel-dns.com`.
- **Alternativa considerada**: Apontar os nameservers do domínio para a Vercel (Vercel DNS). Rejeitada por ser mais invasiva, transferir toda a gestão de DNS para a Vercel e dificultar futuros registros (e-mail, subdomínios) gerenciados na GoDaddy.
- **Rationale**: Mudança mínima e reversível; mantém o usuário no controle do DNS na GoDaddy.

### Decisão 2: Domínio canônico = apex (`carteira-inteligente.com`), `www` redireciona
- **Escolha**: O apex é o canônico; `www.carteira-inteligente.com` redireciona com 301 para o apex (configurável no painel da Vercel via "Redirect to").
- **Alternativa considerada**: `www` como canônico. Igualmente válido; escolhido apex por ser o nome divulgado pelo usuário (`https://carteira-inteligente.com/`).
- **Rationale**: Evita conteúdo duplicado e fixa uma única URL de marca.

### Decisão 3: Verificação por DNS/HTTP, não por acesso a painéis
- **Escolha**: Validar via `dig`/`nslookup` e `curl -I` a partir da linha de comando.
- **Rationale**: É o que posso executar e verificar objetivamente; os passos de painel ficam documentados como ações do usuário.

## Risks / Trade-offs

- **Propagação de DNS pode levar até 48h** → Após editar na GoDaddy, validar incrementalmente com `dig`; não concluir a mudança como falha antes da propagação.
- **GoDaddy não permite CNAME no apex** → Por isso usamos registro `A` no apex (não CNAME); seguir os valores que a Vercel exibir, que podem diferir do IP padrão.
- **Conflito com registros existentes** (registro de "parking" da GoDaddy, `A`/`CNAME` antigos) → Remover/ajustar os registros conflitantes do apex e do `www` antes de adicionar os novos.
- **CORS do backend bloqueando a nova origem** → Conferir a config de CORS do backend Go na Render e incluir `https://carteira-inteligente.com` e `https://www.carteira-inteligente.com`; testar uma chamada real após a propagação.
- **Certificado TLS demora a emitir** → A Vercel emite automaticamente após validação do DNS; aguardar e reverificar; não forçar.

## Migration Plan

1. Adicionar os dois domínios no projeto Vercel e anotar os valores de DNS exibidos.
2. Editar a zona DNS na GoDaddy (registro A do apex + CNAME do www), removendo conflitos.
3. Aguardar propagação e validar (`dig`, painel Vercel "Valid Configuration").
4. Configurar canônico/redirect e confirmar emissão do certificado.
5. Ajustar CORS no backend se necessário e testar uma chamada de API real.

**Rollback**: Reverter os registros DNS na GoDaddy aos valores anteriores e remover os domínios do projeto Vercel; o endereço `.vercel.app` continua funcionando durante todo o processo.

## Open Questions

- Confirmar com o usuário se o canônico deve ser o apex ou o `www` (assumido apex).
- Confirmar os valores exatos de A/CNAME exibidos pela Vercel no momento da configuração (podem mudar).
- Confirmar onde/como o CORS do backend Go é configurado (variável de ambiente na Render vs. código).

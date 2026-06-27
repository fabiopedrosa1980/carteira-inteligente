## 1. Preparação e decisões

- [x] 1.1 Confirmar o domínio canônico desejado (**decidido: apex `carteira-inteligente.com`**, com `www` redirecionando 301)
- [ ] 1.2 Confirmar acesso de admin ao projeto Vercel `carteira-inteligente-eight` e à conta GoDaddy do domínio

## 2. Adicionar domínios na Vercel

- [ ] 2.1 No painel Vercel → Project Settings → Domains, adicionar `carteira-inteligente.com`
- [ ] 2.2 Adicionar também `www.carteira-inteligente.com`
- [ ] 2.3 Anotar os valores de DNS exibidos pela Vercel (IP do registro A do apex e host do CNAME do www)

## 3. Configurar DNS na GoDaddy

- [ ] 3.1 Em GoDaddy → DNS Management de `carteira-inteligente.com`, remover registros conflitantes do apex (`@`) e do `www` (parking/forwarding/registros A/CNAME antigos)
- [ ] 3.2 Criar registro `A` para `@` apontando para o IP da Vercel (ex.: `76.76.21.21`)
- [ ] 3.3 Criar registro `CNAME` para `www` apontando para o host da Vercel (ex.: `cname.vercel-dns.com`)
- [ ] 3.4 Salvar e aguardar propagação (pode levar até 48h)

## 4. Validar DNS e Vercel

- [ ] 4.1 Validar via CLI: `dig +short carteira-inteligente.com A` retorna o IP da Vercel
- [ ] 4.2 Validar via CLI: `dig +short www.carteira-inteligente.com CNAME` retorna o host da Vercel
- [ ] 4.3 Confirmar no painel Vercel que ambos os domínios mostram "Valid Configuration"

## 5. Canônico, redirect e HTTPS

- [ ] 5.1 Definir o canônico na Vercel e configurar o redirect 301 do domínio não canônico
- [ ] 5.2 Confirmar que o certificado TLS foi emitido automaticamente (sem aviso de segurança)
- [ ] 5.3 Verificar redirect HTTP→HTTPS: `curl -I http://carteira-inteligente.com` retorna 301/308 para https
- [ ] 5.4 Verificar redirect do não canônico: `curl -I https://www.carteira-inteligente.com` retorna 301 para o apex

## 6. CORS do backend e teste fim a fim

- [x] 6.1 Verificar a configuração de CORS do backend Go (Render) e incluir `https://carteira-inteligente.com` e `https://www.carteira-inteligente.com` nas origens permitidas (feito no repo `carteira-inteligente-api`, commit ff40f56; validado em produção)
- [ ] 6.2 Abrir `https://carteira-inteligente.com`, confirmar carregamento da app e ausência de erros de CORS no console ao chamar a API
- [x] 6.3 Confirmar que `carteira-inteligente-eight.vercel.app` continua funcionando como fallback (verificado: HTTP 200)

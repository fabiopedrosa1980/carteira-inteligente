## Why

Três ajustes independentes de UX e robustez: o ícone 📈 da seção "Lançamentos de Ações" duplica o ícone do logo e polui a seção; falta uma forma de o usuário sair (logout) da aplicação; e a tela de login exibe um erro indevido ("Google Sign-In não disponível") quando o script do Google ainda não terminou de carregar — pois o `<script>` do GSI é `async` e o `ngAfterViewInit` pode rodar antes de `google` existir.

## What Changes

- Remover o ícone da seção **Lançamentos de Ações** no acordeão de Meus Ativos (mantendo o rótulo); o template oculta o ícone quando vazio.
- Adicionar um **logout** na aplicação: botão no header do dashboard que chama `AuthService.signOut()` e redireciona para `/login`.
- Corrigir o **bug do erro indevido no login**: em vez de errar de imediato quando `google` está indefinido, tentar novamente (retry/poll com limite) até o script GSI carregar; só exibir erro após esgotar as tentativas.

## Capabilities

### New Capabilities
- `app-logout`: encerrar a sessão do usuário e voltar para a tela de login.
- `login-resilience`: inicialização resiliente do Google Sign-In com retry, evitando erro indevido.

### Modified Capabilities
<!-- Nenhuma capability de requisito existente é alterada. -->

## Impact

- `src/app/components/my-assets/my-assets.ts` — remover `icon` da seção `Acoes`.
- `src/app/components/my-assets/my-assets.html` — ocultar `sec-icon` quando vazio.
- `src/app/components/dashboard/dashboard.{ts,html,scss}` — botão de logout no header; injeção de `Router`; método `logout()`.
- `src/app/components/login/login.ts` — retry na inicialização do Google Sign-In.
- `AuthService.signOut()` já existe e será reutilizado.

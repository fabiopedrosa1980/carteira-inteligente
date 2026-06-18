## Context

- As seções de Meus Ativos vêm de um array em `my-assets.ts` com `icon` por seção; o template renderiza `<span class="sec-icon">{{ sec.icon }}</span>`.
- `AuthService` já expõe `signOut()` (limpa user/token e `localStorage`). O header do dashboard tem `header-left` (logo) e um `btn-theme`; o `DashboardComponent` injeta `AuthService` mas não o `Router`.
- A rota `/` é protegida por `authGuard`; `/login` é pública. O script GSI é carregado com `<script ... async>` em `index.html`, então `google` pode estar indefinido no `ngAfterViewInit` do login — hoje isso dispara `error.set(...)` imediatamente (bug do erro indevido).

## Goals / Non-Goals

**Goals:**
- Remover o ícone da seção Lançamentos de Ações (apenas essa seção).
- Botão de logout no header que encerra a sessão e volta ao login.
- Retry na inicialização do Google Sign-In para não errar antes do script carregar.

**Non-Goals:**
- Remover ícones das demais seções (FIIs, ETFs) — fora do pedido.
- Redesenhar o header ou exibir avatar/nome do usuário.
- Alterar o fluxo de autenticação além do retry.

## Decisions

**1. Ícone da seção Acoes.** Definir `icon: ''` na seção `Acoes` (ou remover o campo) em `my-assets.ts` e tornar o `sec-icon` condicional no template (`*ngIf="sec.icon"`) para não deixar espaço/gap vazio. FIIs e ETFs mantêm seus ícones.

**2. Logout no header.** Injetar `Router` no `DashboardComponent` e adicionar `logout()` que chama `auth.signOut()` e `router.navigate(['/login'])`. No HTML, adicionar um botão ao lado do `btn-theme` (agrupados, ex.: `.header-actions`), com título "Sair" e um glifo simples; estilizar reaproveitando o visual do `btn-theme`. O `authGuard` garante que, após sair, a rota protegida não seja acessível.

**3. Retry no login.** Refatorar `ngAfterViewInit` para chamar `initGoogleSignIn(attempt = 0)`. Se `typeof google === 'undefined'`, agendar nova tentativa via `setTimeout` (~200ms) até um máximo (ex.: 25 tentativas ≈ 5s); ao atingir o limite, `error.set('Google Sign-In não disponível…')`. Quando `google` existir, executar `initialize` + `renderButton` como hoje. Guardar referência para evitar múltiplas renderizações. Alternativa considerada: ouvir o evento `load` do script — descartada por não haver hook direto no componente; o poll é simples e robusto.

## Risks / Trade-offs

- [Inconsistência visual: Acoes sem ícone, FIIs/ETFs com ícone] → É o pedido explícito; fácil estender às demais seções depois se desejado.
- [Poll do login nunca encontra `google` (bloqueio real)] → Limite de tentativas garante que o erro ainda aparece após ~5s; sem loop infinito.
- [Logout sem confirmação] → Aceitável para um app pessoal; pode-se adicionar confirmação depois se necessário.

## Context

`TransactionService.add()`/`update()` chamam a API e tratam só o `next` — sem `error`. Com a validação 422 no backend (`lancamento-valida-tipo-catalogo`), uma rejeição não fecha o modal nem mostra nada: o callback `onDone` só dispara no `next`, então `saving` fica `true` para sempre. O modal já renderiza `errors.ticker` abaixo do campo de ticker, e a validação por tiers (`resolveAssetType`) já existe e roda no `save()`/`tickerTypeMismatch`.

## Goals / Non-Goals

**Goals:**
- Surfacer a mensagem de erro da API no modal e mantê-lo aberto.
- Garantir bloqueio por ticker nas seções de tipo travado, antes do envio.
- Tratar 422 como rede de segurança para corridas (cotação não resolvida).

**Non-Goals:**
- Mudar o backend (o 422 já existe).
- Reescrever a resolução de tipo em tiers (já entregue).
- Tratamento genérico de erros de outras telas (escopo: lançamento).

## Decisions

### 1. Callback `onError(msg)` nos métodos de escrita
`add()`/`update()` ganham um segundo callback opcional `onError?: (msg: string) => void`, chamado no ramo `error` do `subscribe`. Mantém a API do serviço simples e simétrica ao `onDone`, sem forçar o componente a lidar com `Observable`/`HttpErrorResponse` cru.
- *Alternativa descartada:* retornar o `Observable` e o componente assina — mais flexível, porém muda a assinatura usada por outros chamadores e vaza tipos HTTP para o componente.

### 2. Extração da mensagem do `HttpErrorResponse`
Helper que tenta, em ordem: `err.error?.error` (corpo `{"error": "..."}` do backend), `err.error?.message`, `err.message`; fallback para texto genérico ("Não foi possível salvar o lançamento."). Centraliza o parsing num único ponto.

### 3. Erro de tipo vai para `errors.ticker`
A incompatibilidade é sobre ticker × tipo, e o campo de ticker já exibe `errors.ticker`. Reusar evita novo elemento de UI. O modal seta `saving=false`, popula `errors.ticker` e não emite `close`.

### 4. Validação local nas seções travadas continua primária
O `save()` já bloqueia quando `resolveAssetType` diverge do `form.assetType` — inclusive quando travado pela seção (a validação não pula no modo travado, só no modo edição). O 422 é a rede de segurança quando o front ainda não resolveu o tipo (cotação pendente). Sem mudança de regra; só garantir que o caminho travado exercite a validação.

## Risks / Trade-offs

- **Mensagem do backend em PT técnica demais** → a mensagem do 422 já é amigável ("Ticker X é de FIIs no catálogo da B3, não condiz com o tipo Ações"); aceitável para o usuário.
- **Erro de rede genérico cair no mesmo campo** → o fallback é claro e o modal permanece aberto para nova tentativa; não há perda de dados do formulário.

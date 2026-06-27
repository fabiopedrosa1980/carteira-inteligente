## Why

Em telas pequenas (celulares estreitos), o cabeçalho do app quebra em duas linhas: a logo fica em uma linha e as ações (chip do usuário + ícones de ocultar valores, trocar tema e sair) caem para a linha de baixo. Isso desperdiça altura no topo e fica visualmente desalinhado. O `.dashboard-header` usa `flex-wrap: wrap`, então quando o conteúdo não cabe ele quebra.

## What Changes

- No mobile (telas menores), manter o cabeçalho em **uma única linha**: logo à esquerda e os ícones (ocultar valores, trocar tema, sair) à direita, sem quebra.
- Em vez de esconder elementos, **reduzir tamanhos e espaçamentos** para caber: botões-ícone menores, gaps menores e o texto da logo encolhe/trunca com reticências se necessário.
- Garantir que os ícones de ação não encolham (prioridade de espaço para eles), deixando o texto da logo ceder primeiro.

## Capabilities

### New Capabilities
- `cabecalho-mobile-uma-linha`: Define o comportamento responsivo do cabeçalho superior para manter logo e ícones de ação em uma única linha no mobile.

### Modified Capabilities
<!-- Nenhuma capability existente tem requisitos alterados (o posicionamento dos ícones em si segue o spec ocultar-valores-global). -->

## Impact

- **Arquivos**: `src/app/components/dashboard/dashboard.scss` (regras responsivas do `.dashboard-header`, `.header-left`, `.logo-text`, `.header-actions`, `.icon-btn`, `.user-chip`).
- **Sem** mudança de HTML/TS nem de lógica.
- **Sem** impacto em API, estado ou modelos.

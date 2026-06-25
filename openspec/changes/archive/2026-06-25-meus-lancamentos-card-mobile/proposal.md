## Why

Na aba "Lançamentos" (`my-assets`), o único acesso para adicionar um lançamento fica no rodapé do corpo de cada seção — invisível quando o acordeão está recolhido, exigindo expandir e rolar até o fim. Em telas estreitas os botões da tela (Limpar tudo, ações de linha, paginação) também não estão posicionados da forma mais confortável. Além disso, no Radar de proventos as tags "Melhor mês" e "Oportunidade" ocupam espaço de texto desnecessário nos cards estreitos do mobile.

## What Changes

- Adicionar um botão **"+"** (adicionar lançamento da seção) no **cabeçalho de cada acordeão** de seção (Ações / FIIs / ETFs), visível mesmo com a seção recolhida. O botão **"Adicionar"** atual do rodapé do corpo é mantido (dois pontos de acesso).
- Revisar o posicionamento dos **demais botões** da tela de Lançamentos para o melhor encaixe em mobile: "Limpar tudo" no header da página, ações de Editar/Remover por linha e a paginação por seção — garantindo alvos de toque adequados e layout contido (sem rolagem horizontal).
- No **Radar de proventos** (visão em cards), em mobile (largura ≤600px), as tags de destaque "Melhor mês" e "Oportunidade" passam a exibir **somente o ícone** (estrela / triângulo de atenção), ocultando o texto. No desktop o texto permanece.
- Na aba **"Meus Ativos"** (portfolio), adicionar um botão **olho** (ocultar/exibir) que esconde os valores em R$ dos cards de resumo (Patrimônio Total, Investido, Ganho, Variação e os cards de Dividendos). A preferência é **persistida** (localStorage) e o estado padrão é "exibindo".

## Capabilities

### New Capabilities
- `lancamentos-botao-adicionar-secao`: botão de adicionar lançamento no cabeçalho de cada seção (acordeão) da aba Lançamentos, acessível mesmo com a seção recolhida, complementando o botão do rodapé.
- `meus-ativos-ocultar-valores`: botão olho na aba "Meus Ativos" que oculta/exibe os valores monetários dos cards de resumo, com a preferência persistida.

### Modified Capabilities
- `lancamentos-mobile-grid`: posicionamento dos botões da tela (Limpar tudo, ações de linha, paginação) otimizado para mobile, mantendo o layout contido e os alvos de toque adequados.
- `radar-card-layout`: tags de destaque "Melhor mês" e "Oportunidade" exibidas somente como ícone no mobile.

## Impact

- `src/app/components/my-assets/my-assets.html` — botão "+" no cabeçalho do acordeão; ajustes de marcação dos botões.
- `src/app/components/my-assets/my-assets.scss` — estilos do botão de seção e ajustes responsivos (≤600px) de header, ações e paginação.
- `src/app/components/my-assets/my-assets.ts` — reuso de `openAdd(type)` a partir do cabeçalho (sem nova lógica de estado).
- `src/app/components/dividends-radar/dividends-radar.scss` — regra responsiva para ocultar o texto das tags `.rc-tag-top` / `.rc-tag-next` no mobile, mantendo o ícone.
- `src/app/components/dashboard/dashboard.ts` — signal `valoresOcultos` persistido em localStorage e método `toggleValores()`.
- `src/app/components/dashboard/dashboard.html` — botão olho no `.section-header` da aba "Meus Ativos"; classe condicional nos cards de resumo.
- `src/app/components/dashboard/dashboard.scss` — máscara (blur) dos valores quando ocultos e estilo do botão olho.
- Sem mudanças de API, modelos de dados ou dependências.

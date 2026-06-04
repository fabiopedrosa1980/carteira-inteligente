# Carteira Inteligente

Aplicação web para acompanhamento de dividendos de ações da B3. Exibe cotações em tempo real, histórico de dividendos, calendário de pagamentos e análise dos melhores meses para compra.

## Funcionalidades

- Dashboard com cards de ações e cotações atualizadas
- Calendário de dividendos por mês
- Análise dos melhores meses para comprar cada ação
- Adição e remoção de ativos da carteira
- Dados de preço via Yahoo Finance + Dividend Yield via Status Invest

## Estrutura do projeto

```
carteira-inteligente/   # Frontend Angular
proxy/                  # Proxy Node.js (evita CORS nas APIs externas)
```

## Pré-requisitos

- Node.js 18+
- Angular CLI 21+

## Como rodar

### 1. Proxy (necessário para dados em tempo real)

```bash
cd proxy
npm install
npm start
```

O proxy sobe em `http://localhost:3001`.

### 2. Frontend Angular

```bash
cd carteira-inteligente
npm install
ng serve
```

Acesse `http://localhost:4200`.

## Tickers na carteira padrão

`BBAS3` · `BBSE3` · `PETR4` · `ITUB3` · `BRAP4` · `CMIG4` · `CPFE3` · `CSMG3` · `ISAE4` · `CXSE3`

## Stack

- **Frontend:** Angular 21, TypeScript, SCSS
- **Proxy:** Node.js, Express
- **Dados:** Yahoo Finance API, Status Invest

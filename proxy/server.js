const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(cors());

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Carteira Inteligente — Proxy API',
    version: '1.0.0',
    description: 'Proxy que agrega dados de cotações da B3 via Yahoo Finance e Status Invest.',
  },
  servers: [{ url: 'http://localhost:3001', description: 'Local' }],
  components: {
    schemas: {
      StockQuote: {
        type: 'object',
        properties: {
          ticker:        { type: 'string',  example: 'BBAS3' },
          name:          { type: 'string',  example: 'Banco do Brasil S.A.' },
          price:         { type: 'number',  example: 19.53 },
          changePercent: { type: 'number',  example: -1.81 },
          prevClose:     { type: 'number',  example: 19.89 },
          dividendYield: { type: 'number',  example: 2.82 },
          sector:        { type: 'string',  example: 'Bancário' },
          found:         { type: 'boolean', example: true },
        },
      },
      HealthResponse: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'ok' },
          time:   { type: 'string', format: 'date-time' },
        },
      },
      Goal: {
        type: 'object',
        properties: {
          id:          { type: 'string',  example: '1718100000000' },
          name:        { type: 'string',  example: 'Renda de R$ 5.000/mês' },
          description: { type: 'string',  example: 'Atingir renda passiva mensal de 5 mil' },
          targetValue: { type: 'number',  example: 5000 },
          type:        { type: 'string',  enum: ['patrimonio', 'renda_mensal', 'preco_medio'], example: 'renda_mensal' },
          ticker:      { type: 'string',  example: 'BBAS3' },
          createdAt:   { type: 'string',  format: 'date-time' },
        },
      },
    },
  },
  paths: {
    '/api/quotes': {
      get: {
        summary: 'Cotações em lote',
        description: 'Retorna cotações para uma lista de tickers separados por vírgula.',
        parameters: [{
          name: 'tickers', in: 'query', required: true,
          schema: { type: 'string', example: 'BBAS3,BBSE3,PETR4' },
          description: 'Tickers separados por vírgula',
        }],
        responses: {
          200: {
            description: 'Lista de cotações',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/StockQuote' } } } },
          },
        },
      },
    },
    '/api/quote/{ticker}': {
      get: {
        summary: 'Cotação individual',
        description: 'Retorna a cotação de um único ticker.',
        parameters: [{
          name: 'ticker', in: 'path', required: true,
          schema: { type: 'string', example: 'BBAS3' },
          description: 'Código do ticker (ex: BBAS3)',
        }],
        responses: {
          200: {
            description: 'Cotação do ticker',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/StockQuote' } } },
          },
        },
      },
    },
    '/health': {
      get: {
        summary: 'Health check',
        description: 'Verifica se o servidor está no ar.',
        responses: {
          200: {
            description: 'Servidor operacional',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/HealthResponse' } } },
          },
        },
      },
    },
    '/api/v1/goals': {
      get: {
        summary: 'Listar metas',
        description: 'Retorna todas as metas cadastradas.',
        responses: {
          200: {
            description: 'Lista de metas',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Goal' } } } },
          },
        },
      },
      post: {
        summary: 'Criar meta',
        description: 'Cria uma nova meta.',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Goal' } } },
        },
        responses: {
          201: {
            description: 'Meta criada',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Goal' } } },
          },
        },
      },
    },
    '/api/v1/goals/{id}': {
      put: {
        summary: 'Atualizar meta',
        description: 'Atualiza uma meta existente.',
        parameters: [{
          name: 'id', in: 'path', required: true,
          schema: { type: 'string' },
          description: 'ID da meta',
        }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Goal' } } },
        },
        responses: {
          200: {
            description: 'Meta atualizada',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Goal' } } },
          },
          404: { description: 'Meta não encontrada' },
        },
      },
      delete: {
        summary: 'Remover meta',
        description: 'Remove uma meta pelo ID.',
        parameters: [{
          name: 'id', in: 'path', required: true,
          schema: { type: 'string' },
          description: 'ID da meta',
        }],
        responses: {
          204: { description: 'Meta removida' },
        },
      },
    },
  },
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const SECTOR_MAP = {
  'Financial Services': 'Bancário',
  'Banks—Diversified': 'Bancário',
  'Banks—Regional': 'Bancário',
  'Insurance—Diversified': 'Seguros',
  'Insurance': 'Seguros',
  'Oil & Gas Integrated': 'Petróleo & Gás',
  'Oil & Gas E&P': 'Petróleo & Gás',
  'Oil & Gas': 'Petróleo & Gás',
  'Other Industrial Metals & Mining': 'Mineração',
  'Steel': 'Mineração',
  'Copper': 'Mineração',
  'Utilities—Regulated Electric': 'Energia Elétrica',
  'Utilities—Diversified': 'Energia Elétrica',
  'Utilities': 'Energia Elétrica',
  'Utilities—Independent Power Producers': 'Energia Elétrica',
  'Utilities—Regulated Water': 'Saneamento',
  'Water': 'Saneamento',
  'Telecom Services': 'Telecomunicações',
  'Communication Services': 'Telecomunicações',
};

const DEFAULT_SECTORS = {
  BBAS3: 'Bancário', BBSE3: 'Seguros', PETR4: 'Petróleo & Gás',
  ITUB3: 'Bancário', BRAP4: 'Mineração', CMIG4: 'Energia Elétrica',
  CPFE3: 'Energia Elétrica', CSMG3: 'Saneamento', ISAE4: 'Energia Elétrica',
};

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml',
  'Accept-Language': 'pt-BR,pt;q=0.9',
};

async function fetchBrapi(ticker) {
  const url = `https://brapi.dev/api/quote/${ticker}`;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
      timeout: 8000,
    });
    const json = await res.json();
    const r = json?.results?.[0];
    if (!r || !r.regularMarketPrice) return null;
    const prev = r.regularMarketPreviousClose || r.regularMarketPrice;
    return {
      name: r.longName || r.shortName || ticker,
      price: r.regularMarketPrice,
      changePercent: r.regularMarketChangePercent ?? 0,
      prevClose: prev,
    };
  } catch (e) {
    console.error(`Brapi error for ${ticker}:`, e.message);
    return null;
  }
}

async function fetchYahoo(ticker) {
  const hosts = ['query2', 'query1'];
  for (const host of hosts) {
    const url = `https://${host}.finance.yahoo.com/v8/finance/chart/${ticker}.SA?interval=1d&range=1d`;
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
          'Accept': '*/*',
          'Accept-Language': 'pt-BR,pt;q=0.9',
        },
        timeout: 10000,
      });
      const json = await res.json();
      const meta = json?.chart?.result?.[0]?.meta;
      if (!meta || !meta.regularMarketPrice) continue;
      const prev = meta.chartPreviousClose || meta.regularMarketPrice;
      const changePercent = prev ? ((meta.regularMarketPrice - prev) / prev) * 100 : 0;
      return {
        name: meta.longName || meta.shortName || ticker,
        price: meta.regularMarketPrice,
        changePercent,
        prevClose: prev,
      };
    } catch (e) {
      console.error(`Yahoo ${host} error for ${ticker}:`, e.message);
    }
  }
  return null;
}

async function fetchStatusInvest(ticker) {
  const url = `https://statusinvest.com.br/acoes/${ticker.toLowerCase()}`;
  try {
    const res = await fetch(url, { headers: HEADERS, timeout: 8000 });
    const html = await res.text();

    // DY — regex confirmed working
    const dyMatch = html.match(/Dividend Yield.*?<strong[^>]*>([\d,\.]+)<\/strong>/s);
    const dy = dyMatch ? parseFloat(dyMatch[1].replace(',', '.')) : null;

    // Setor — available for logged-in users only, extract from meta/structured data
    const sectorMatch = html.match(/"sector"\s*:\s*"([^"]+)"/i)
      || html.match(/Setor<\/[^>]+>\s*<[^>]+>([A-ZÀ-Ú][^<]{2,40})/i);
    const sector = sectorMatch ? sectorMatch[1].trim() : null;

    // Price from Status Invest as fallback
    const priceMatch = html.match(/<strong[^>]*class="[^"]*value[^"]*"[^>]*>([\d,\.]+)<\/strong>/);
    const price = priceMatch ? parseFloat(priceMatch[1].replace(',', '.')) : null;

    return { dy, sector, price };
  } catch {
    return { dy: null, sector: null, price: null };
  }
}

async function resolveQuote(ticker) {
  const [brapi, si] = await Promise.all([
    fetchBrapi(ticker),
    fetchStatusInvest(ticker),
  ]);

  // brapi como primário, yahoo como fallback quando brapi falha
  const quote = brapi ?? await fetchYahoo(ticker);

  const rawSector = si?.sector || '';
  const sector = SECTOR_MAP[rawSector] || DEFAULT_SECTORS[ticker] || rawSector || 'Outro';

  return {
    ticker,
    name: quote?.name || ticker,
    price: quote?.price ?? si?.price ?? 0,
    changePercent: quote?.changePercent ?? 0,
    prevClose: quote?.prevClose ?? 0,
    dividendYield: si?.dy ?? 0,
    sector,
    found: !!(quote?.price || si?.price),
  };
}

app.get('/api/quotes', async (req, res) => {
  const tickers = (req.query.tickers || '').split(',').map(t => t.trim().toUpperCase()).filter(Boolean);
  if (!tickers.length) return res.json([]);

  const results = await Promise.allSettled(tickers.map(resolveQuote));

  const quotes = results.map((r, i) =>
    r.status === 'fulfilled'
      ? r.value
      : { ticker: tickers[i], name: tickers[i], price: 0, changePercent: 0, prevClose: 0, dividendYield: 0, sector: DEFAULT_SECTORS[tickers[i]] || 'Outro', found: false }
  );

  res.json(quotes);
});

app.get('/api/quote/:ticker', async (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  res.json(await resolveQuote(ticker));
});

app.get('/health', (_, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

const fs = require('fs');
const path = require('path');
const GOALS_FILE = path.join(__dirname, 'goals.json');

function readGoals() {
  if (!fs.existsSync(GOALS_FILE)) return [];
  return JSON.parse(fs.readFileSync(GOALS_FILE, 'utf8'));
}
function writeGoals(goals) {
  fs.writeFileSync(GOALS_FILE, JSON.stringify(goals, null, 2));
}

app.get('/api/v1/goals', (req, res) => {
  res.json(readGoals());
});

app.post('/api/v1/goals', express.json(), (req, res) => {
  const goals = readGoals();
  const goal = { ...req.body, id: Date.now().toString(), createdAt: new Date().toISOString() };
  goals.push(goal);
  writeGoals(goals);
  res.status(201).json(goal);
});

app.put('/api/v1/goals/:id', express.json(), (req, res) => {
  const goals = readGoals();
  const idx = goals.findIndex(g => g.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  goals[idx] = { ...goals[idx], ...req.body };
  writeGoals(goals);
  res.json(goals[idx]);
});

app.delete('/api/v1/goals/:id', (req, res) => {
  const goals = readGoals().filter(g => g.id !== req.params.id);
  writeGoals(goals);
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Proxy rodando em http://localhost:${PORT}`));

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(cors());
app.use(express.json());

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Carteira Inteligente — Proxy API',
    version: '1.0.0',
    description: 'Proxy local para metas de investimento.',
  },
  servers: [{ url: 'http://localhost:3001', description: 'Local' }],
  components: {
    schemas: {
      Goal: {
        type: 'object',
        properties: {
          id:          { type: 'string',  example: '1718100000000' },
          name:        { type: 'string',  example: 'Renda de R$ 5.000/mês' },
          description: { type: 'string',  example: 'Atingir renda passiva mensal de 5 mil' },
          targetValue: { type: 'number',  example: 5000 },
          type:        { type: 'string',  enum: ['patrimonio', 'renda_mensal', 'preco_medio'] },
          ticker:      { type: 'string',  example: 'BBAS3' },
          createdAt:   { type: 'string',  format: 'date-time' },
        },
      },
    },
  },
  paths: {
    '/health': {
      get: {
        summary: 'Health check',
        responses: { 200: { description: 'ok' } },
      },
    },
    '/api/v1/goals': {
      get: {
        summary: 'Listar metas',
        responses: { 200: { description: 'Lista de metas', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Goal' } } } } } },
      },
      post: {
        summary: 'Criar meta',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Goal' } } } },
        responses: { 201: { description: 'Meta criada', content: { 'application/json': { schema: { $ref: '#/components/schemas/Goal' } } } } },
      },
    },
    '/api/v1/goals/{id}': {
      put: {
        summary: 'Atualizar meta',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Goal' } } } },
        responses: { 200: { description: 'Meta atualizada' }, 404: { description: 'Não encontrada' } },
      },
      delete: {
        summary: 'Remover meta',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 204: { description: 'Removida' } },
      },
    },
  },
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/health', (_, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

const GOALS_FILE = path.join(__dirname, 'goals.json');

function readGoals() {
  if (!fs.existsSync(GOALS_FILE)) return [];
  return JSON.parse(fs.readFileSync(GOALS_FILE, 'utf8'));
}

function writeGoals(goals) {
  fs.writeFileSync(GOALS_FILE, JSON.stringify(goals, null, 2));
}

app.get('/api/v1/goals', (_, res) => res.json(readGoals()));

app.post('/api/v1/goals', (req, res) => {
  const goals = readGoals();
  const goal = { ...req.body, id: Date.now().toString(), createdAt: new Date().toISOString() };
  goals.push(goal);
  writeGoals(goals);
  res.status(201).json(goal);
});

app.put('/api/v1/goals/:id', (req, res) => {
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

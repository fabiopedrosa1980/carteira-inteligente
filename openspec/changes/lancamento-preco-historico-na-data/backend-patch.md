# Backend patch — cotação por data (`/quote/:ticker?date=`)

> Documento de coordenação para o serviço **externo** `carteira-inteligente-api` (Go).
> Não faz parte deste repo (frontend). O frontend já envia `?date=YYYY-MM-DD` quando a
> data do lançamento é anterior a hoje; falta o backend honrar o parâmetro.

## Contrato

`GET /api/v1/quote/:ticker?date=YYYY-MM-DD`

| Situação | Comportamento |
|---|---|
| `date` ausente, igual a hoje ou futura | cotação atual (comportamento atual — não muda) |
| `date` anterior a hoje | **preço de fechamento naquela data** |
| Data sem pregão (fim de semana/feriado) | fechamento do **pregão anterior mais próximo** |
| Sem dado / ticker inválido | `found: false` (mesma forma de resposta) |

A **forma da resposta permanece a mesma** (`StockQuote`: `ticker, name, sector, price, prevClose, changePercent, dividendYield, found`). Para data passada, `price` = fechamento da data; `prevClose`/`changePercent` podem vir 0 (ou o fechamento do pregão anterior, se quiser manter coerência).

## Fonte: Yahoo Finance `chart`

Para B3, o símbolo é `TICKER.SA` (ex.: `PETR4.SA`).

```
GET https://query1.finance.yahoo.com/v8/finance/chart/PETR4.SA
      ?period1=<unix>&period2=<unix>&interval=1d
```

- `period1` = início da janela (sugestão: **data − 7 dias**, para cobrir fim de semana/feriado).
- `period2` = **data + 1 dia** (limite superior exclusivo na prática).
- `interval=1d`.

Resposta (resumida):
```json
{
  "chart": {
    "result": [{
      "timestamp": [1736899200, 1736985600, ...],
      "indicators": {
        "quote": [{ "close": [38.10, 38.42, ...] }],
        "adjclose": [{ "adjclose": [38.10, 38.42, ...] }]
      }
    }],
    "error": null
  }
}
```

### Algoritmo (escolher o fechamento ≤ data pedida)

1. Validar/parsear `date` (`YYYY-MM-DD`). Se vazia ou `>= hoje` → seguir o fluxo atual de cotação.
2. Montar a janela `[date-7d, date+1d]` em Unix (UTC ok; a granularidade é diária).
3. Chamar o `chart` com `interval=1d`.
4. Percorrer `timestamp[]` em pares com `close[]`; manter o **último** ponto cujo dia (`time.Unix(ts).UTC().Format("2006-01-02")`) seja `<= date`.
5. Esse `close` é o preço. Se nenhum ponto ≤ data (ou `close` nulo) → `found: false`.

## Esboço em Go

```go
// GET /api/v1/quote/:ticker?date=YYYY-MM-DD
func (h *Handler) GetQuote(w http.ResponseWriter, r *http.Request) {
    ticker := strings.ToUpper(chi.URLParam(r, "ticker")) // ajuste ao seu router
    dateStr := r.URL.Query().Get("date")

    today := time.Now().Format("2006-01-02")
    if dateStr != "" && dateStr < today {
        if q, ok := h.quoteOnDate(ticker, dateStr); ok {
            writeJSON(w, q)
            return
        }
        writeJSON(w, StockQuote{Ticker: ticker, Found: false})
        return
    }

    // ... fluxo atual (cotação de hoje) permanece igual ...
}

func (h *Handler) quoteOnDate(ticker, dateStr string) (StockQuote, bool) {
    d, err := time.Parse("2006-01-02", dateStr)
    if err != nil {
        return StockQuote{}, false
    }
    p1 := d.AddDate(0, 0, -7).Unix()
    p2 := d.AddDate(0, 0, 1).Unix()

    url := fmt.Sprintf(
        "https://query1.finance.yahoo.com/v8/finance/chart/%s.SA?period1=%d&period2=%d&interval=1d",
        ticker, p1, p2,
    )
    resp, err := h.httpClient.Get(url) // use um client com timeout + User-Agent
    if err != nil {
        return StockQuote{}, false
    }
    defer resp.Body.Close()

    var cr chartResponse
    if err := json.NewDecoder(resp.Body).Decode(&cr); err != nil ||
        len(cr.Chart.Result) == 0 {
        return StockQuote{}, false
    }
    res := cr.Chart.Result[0]
    if len(res.Indicators.Quote) == 0 {
        return StockQuote{}, false
    }
    closes := res.Indicators.Quote[0].Close

    // Último fechamento cujo dia <= dateStr (cobre fim de semana/feriado).
    price := 0.0
    found := false
    for i, ts := range res.Timestamp {
        if i >= len(closes) {
            break
        }
        day := time.Unix(ts, 0).UTC().Format("2006-01-02")
        if day <= dateStr && closes[i] > 0 {
            price = closes[i]
            found = true
        }
    }
    if !found {
        return StockQuote{}, false
    }
    return StockQuote{
        Ticker: ticker,
        Name:   res.Meta.ShortName, // se disponível no meta; senão resolver à parte
        Price:  price,
        Found:  true,
    }, true
}

type chartResponse struct {
    Chart struct {
        Result []struct {
            Meta struct {
                ShortName string `json:"shortName"`
            } `json:"meta"`
            Timestamp  []int64 `json:"timestamp"`
            Indicators struct {
                Quote []struct {
                    Close []float64 `json:"close"`
                } `json:"quote"`
            } `json:"indicators"`
        } `json:"result"`
        Error interface{} `json:"error"`
    } `json:"chart"`
}
```

> Observações:
> - O Yahoo às vezes retorna `close` com `null` (vira 0 no slice); por isso o filtro `closes[i] > 0`.
> - Inclua `User-Agent` no request; o Yahoo costuma bloquear clients sem header.
> - `period2 = date+1d` garante que o próprio dia entre na janela.

## Edge cases

- **Hoje/futuro:** não tocar — segue a cotação atual (o frontend só envia `date` quando é passado, mas valide no backend mesmo assim).
- **Fim de semana/feriado:** o passo 4 já pega o pregão anterior por usar `<= date`.
- **Sem histórico (ticker novo / data muito antiga):** `found: false`.
- **Fuso:** trabalhar em granularidade de dia (`YYYY-MM-DD`) evita erro de borda; comparar strings de data.
- **Cache (opcional):** fechamento histórico é imutável — pode cachear por `ticker+date` indefinidamente.

## Testes (curl)

```bash
# Data passada → fechamento daquele dia
curl "$API/api/v1/quote/PETR4?date=2025-01-15"
# Sexta-feira de feriado / fim de semana → pregão anterior
curl "$API/api/v1/quote/PETR4?date=2025-04-20"   # domingo
# Hoje → cotação atual (inalterado)
curl "$API/api/v1/quote/PETR4?date=$(date +%F)"
# Sem date → cotação atual (inalterado)
curl "$API/api/v1/quote/PETR4"
```

Critério de aceite: `date` passado retorna `price` diferente do atual e coerente com o fechamento do dia (conferir no histórico do ativo); hoje/sem-date inalterado.
```

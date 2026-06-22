import { allocationByClass, deviations, concentrations } from './allocation.util';
import { Stock } from './stock.model';

function pos(ticker: string, sector: string, quantity: number, price: number): Stock {
  return {
    ticker,
    name: ticker,
    sector,
    price,
    changePercent: 0,
    dividendYield: 0,
    nota: 0,
    dividends: [],
    quantity,
    avgPrice: price,
  };
}

describe('allocation.util', () => {
  describe('allocationByClass', () => {
    it('soma saldo por classe e calcula %', () => {
      // Ações 6000, FIIs 3000, ETF 1000 → total 10000
      const stocks = [
        pos('ITSA4', 'Ações', 600, 10), // 6000
        pos('HGLG11', 'FII', 30, 100), // 3000
        pos('IVVB11', 'ETF', 10, 100), // 1000
      ];
      const r = allocationByClass(stocks);
      expect(r.patrimonio).toBeCloseTo(10000, 6);
      const map = new Map(r.byClass.map((c) => [c.classe, c.pct]));
      expect(map.get('Acoes')).toBeCloseTo(60, 6);
      expect(map.get('FIIs')).toBeCloseTo(30, 6);
      expect(map.get('ETFs')).toBeCloseTo(10, 6);
      const soma = r.byClass.reduce((s, c) => s + c.pct, 0);
      expect(soma).toBeCloseTo(100, 6);
    });

    it('ignora posições sem saldo válido', () => {
      const stocks = [pos('ITSA4', 'Ações', 100, 10), pos('XXXX3', 'Ações', 0, 10)];
      const r = allocationByClass(stocks);
      expect(r.patrimonio).toBeCloseTo(1000, 6);
    });

    it('carteira vazia → tudo zero, sem erro', () => {
      const r = allocationByClass([]);
      expect(r.patrimonio).toBe(0);
      expect(r.byClass.every((c) => c.pct === 0)).toBeTrue();
    });
  });

  describe('deviations', () => {
    const atual = [
      { classe: 'Acoes' as const, saldo: 6200, pct: 62 },
      { classe: 'FIIs' as const, saldo: 2800, pct: 28 },
      { classe: 'ETFs' as const, saldo: 1000, pct: 10 },
    ];
    const alvos = { Acoes: 50, FIIs: 40, ETFs: 10 };

    it('classe acima do alvo → status acima', () => {
      const d = deviations(atual, alvos, 10000).find((x) => x.classe === 'Acoes')!;
      expect(d.status).toBe('acima');
      expect(d.desvioPp).toBeCloseTo(12, 6);
      expect(d.montante).toBeCloseTo(1200, 6); // 12% de 10000
    });

    it('classe abaixo do alvo → status abaixo + montante para aportar', () => {
      const d = deviations(atual, alvos, 10000).find((x) => x.classe === 'FIIs')!;
      expect(d.status).toBe('abaixo');
      expect(d.montante).toBeCloseTo(1200, 6);
    });

    it('classe dentro da tolerância → no-alvo', () => {
      const d = deviations(atual, alvos, 10000).find((x) => x.classe === 'ETFs')!;
      expect(d.status).toBe('no-alvo');
    });
  });

  describe('concentrations', () => {
    it('sinaliza ativos acima do limite, ordenados', () => {
      const stocks = [
        pos('ITSA4', 'Ações', 250, 10), // 2500 = 25%
        pos('BBAS3', 'Ações', 500, 10), // 5000 = 50%
        pos('HGLG11', 'FII', 25, 100), // 2500 = 25%
      ];
      const r = concentrations(stocks, 10000, 20);
      expect(r.map((c) => c.ticker)).toEqual(['BBAS3', 'ITSA4', 'HGLG11']);
      expect(r[0].pct).toBeCloseTo(50, 6);
    });

    it('sem concentração quando todos abaixo do limite', () => {
      const stocks = [pos('A', 'Ações', 10, 10), pos('B', 'Ações', 10, 10)];
      expect(concentrations(stocks, 200, 60)).toEqual([]);
    });

    it('patrimônio zero → vazio', () => {
      expect(concentrations([], 0, 20)).toEqual([]);
    });
  });
});

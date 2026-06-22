import { classeFromSector, dpaTrailing12m, parsePvp, pvpSinal, precoTeto } from './preco-teto.util';

describe('preco-teto.util', () => {
  const today = new Date('2026-06-22');

  describe('classeFromSector', () => {
    it('mapeia sector para classe', () => {
      expect(classeFromSector('Ações')).toBe('Acoes');
      expect(classeFromSector('FII')).toBe('FIIs');
      expect(classeFromSector('ETF')).toBe('ETFs');
      expect(classeFromSector('qualquer')).toBe('Acoes');
    });
  });

  describe('dpaTrailing12m', () => {
    it('soma os proventos por cota dentro da janela de 12 meses', () => {
      const divs = [
        { value: 0.5, payDate: '2026-01-15' },
        { value: 0.3, payDate: '2025-09-10' },
        { value: 0.2, payDate: '2025-07-01' },
      ];
      expect(dpaTrailing12m(divs, today)).toBeCloseTo(1.0, 6);
    });

    it('ignora proventos pagos há mais de 12 meses', () => {
      const divs = [
        { value: 0.5, payDate: '2026-01-15' },
        { value: 9.9, payDate: '2025-06-01' }, // fora da janela (>12m)
      ];
      expect(dpaTrailing12m(divs, today)).toBeCloseTo(0.5, 6);
    });

    it('desconsidera proventos sem payDate', () => {
      const divs = [
        { value: 0.4, payDate: '2026-02-01' },
        { value: 0.4, payDate: null },
        { value: 0.4 },
      ];
      expect(dpaTrailing12m(divs, today)).toBeCloseTo(0.4, 6);
    });

    it('não depende da quantidade de cotas (é por cota)', () => {
      const divs = [{ value: 1.25, payDate: '2026-03-01' }];
      expect(dpaTrailing12m(divs, today)).toBeCloseTo(1.25, 6);
    });
  });

  describe('parsePvp / pvpSinal', () => {
    it('extrai P/VP no formato BR e classifica o sinal', () => {
      expect(parsePvp([{ label: 'P/VP', value: '0,95' }])).toBeCloseTo(0.95, 6);
      expect(parsePvp([{ label: 'PVP', value: '1,05' }])).toBeCloseTo(1.05, 6);
      expect(parsePvp([{ label: 'P/L', value: '8,0' }])).toBeNull();
      expect(parsePvp(undefined)).toBeNull();
    });

    it('classifica caro/barato/neutro', () => {
      expect(pvpSinal(1.2)).toBe('caro');
      expect(pvpSinal(0.8)).toBe('barato');
      expect(pvpSinal(1)).toBe('neutro');
      expect(pvpSinal(null)).toBeNull();
    });
  });

  describe('precoTeto', () => {
    it('ação: teto = DPA / yield e classifica compra abaixo do justo', () => {
      const r = precoTeto({ classe: 'Acoes', dpa12m: 0.6, yieldAlvo: 0.06, price: 8, margem: 0.1 });
      expect(r.teto).toBeCloseTo(10, 6); // 0.6 / 0.06
      expect(r.precoJusto).toBeCloseTo(9, 6); // 10 × 0.9
      expect(r.zona).toBe('compra'); // 8 <= 9
      expect(r.descontoPct).toBeCloseTo(-0.2, 6); // 8/10 - 1
    });

    it('zona justo entre o preço justo e o teto', () => {
      const r = precoTeto({
        classe: 'Acoes',
        dpa12m: 0.6,
        yieldAlvo: 0.06,
        price: 9.5,
        margem: 0.1,
      });
      expect(r.zona).toBe('justo'); // 9 < 9.5 <= 10
    });

    it('zona caro acima do teto', () => {
      const r = precoTeto({
        classe: 'Acoes',
        dpa12m: 0.6,
        yieldAlvo: 0.06,
        price: 11,
        margem: 0.1,
      });
      expect(r.zona).toBe('caro');
      expect(r.descontoPct).toBeCloseTo(0.1, 6);
    });

    it('sem histórico (DPA <= 0) → sem-dados, sem teto', () => {
      const r = precoTeto({ classe: 'Acoes', dpa12m: 0, yieldAlvo: 0.06, price: 10, margem: 0.1 });
      expect(r.zona).toBe('sem-dados');
      expect(r.teto).toBeNull();
      expect(r.descontoPct).toBeNull();
    });

    it('FII expõe o sinal de P/VP junto do teto', () => {
      const r = precoTeto({
        classe: 'FIIs',
        dpa12m: 9.6,
        yieldAlvo: 0.08,
        price: 90,
        margem: 0.1,
        pvp: 0.92,
      });
      expect(r.teto).toBeCloseTo(120, 6); // 9.6 / 0.08
      expect(r.pvpSinal).toBe('barato');
    });

    it('ETF → n/a, sem número', () => {
      const r = precoTeto({ classe: 'ETFs', dpa12m: 1, yieldAlvo: 0.06, price: 100, margem: 0.1 });
      expect(r.zona).toBe('na');
      expect(r.teto).toBeNull();
      expect(r.pvpSinal).toBeNull();
    });
  });
});

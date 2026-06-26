import { detectAssetTypeByName, resolveAssetType } from './asset-type.util';

describe('detectAssetTypeByName', () => {
  const acoes: [string, string][] = [
    ['TAEE11', 'Transmissora Aliança de Energia Elétrica S.A.'],
    ['SANB11', 'Banco Santander (Brasil) S.A.'],
    ['KLBN11', 'Klabin S.A.'],
    ['ALUP11', 'Alupar Investimento S.A.'],
    ['BPAC11', 'Banco BTG Pactual S.A.'],
  ];
  const fiis: [string, string][] = [
    ['MXRF11', 'Maxi Renda Fundo De Investimento Imobiliaro - FII'],
    ['HGLG11', 'Cshg Logistica - Fundo De Investimento Imobiliario'],
    ['KNRI11', 'Kinea Renda Imobiliária Fundo de Investimento Imobiliário'],
    ['XPML11', 'Xp Malls Fundo Investimentos Imobiliarios'],
    ['VISC11', 'Vinci Shopping Centers Fundo Investimento Imobiliario - Fii'],
  ];
  const etfs: [string, string][] = [
    ['BOVA11', 'ISHARES IBOVESPA CLASSE DE ÍNDICE - RESPONSABILIDADE LIMITADA'],
    ['IVVB11', 'ISHARES S&P 500 CLASSE DE ÍNDICE EM COTAS DE CLASSES DE ÍNDICE IE'],
    ['SMAL11', 'ISHARES BM&FBOVESPA SMALL CAP CLASSE DE ÍNDICE'],
    ['HASH11', 'HASHDEX NASDAQ CME CRYPTO INDEX FUNDO DE ÍNDICE'],
  ];

  it('classifica units terminadas em 11 como Ações', () => {
    for (const [t, n] of acoes) {
      expect(detectAssetTypeByName(t, n)).toBe('Acoes');
    }
  });

  it('classifica FIIs pelo nome', () => {
    for (const [t, n] of fiis) {
      expect(detectAssetTypeByName(t, n)).toBe('FIIs');
    }
  });

  it('classifica ETFs pelo nome', () => {
    for (const [t, n] of etfs) {
      expect(detectAssetTypeByName(t, n)).toBe('ETFs');
    }
  });

  it('retorna null para sufixo não-11 ou nome vazio', () => {
    expect(detectAssetTypeByName('PETR4', 'Petrobras S.A.')).toBeNull();
    expect(detectAssetTypeByName('TAEE11', '')).toBeNull();
  });
});

describe('resolveAssetType (tiers)', () => {
  it('tier 1: catálogo tem prioridade sobre nome/sufixo', () => {
    expect(resolveAssetType('BOVA11', 'ETFs', 'Nome qualquer')).toBe('ETFs');
    expect(resolveAssetType('TAEE11', 'Acoes', 'Fundo Imobiliario')).toBe('Acoes');
  });

  it('tier 2: sem catálogo, usa o nome para o 11', () => {
    expect(resolveAssetType('TAEE11', '', 'Transmissora Aliança S.A.')).toBe('Acoes');
    expect(resolveAssetType('MXRF11', undefined, 'Maxi Renda FII')).toBe('FIIs');
  });

  it('tier 3: sem catálogo nem nome, cai no sufixo (11 indeterminado)', () => {
    expect(resolveAssetType('PETR4', '', '')).toBe('Acoes');
    expect(resolveAssetType('TAEE11', '', '')).toBeNull();
  });
});

// Published research data used by the article's charts and tables.
import facts from '../../public/research/midas/verified.json';
export { facts };
export type Lang = 'ru' | 'en';
export const fmt = (n: number, lang: Lang, digits = 1) =>
  new Intl.NumberFormat(lang, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(n);

export interface HBarRow {
  label: string;
  /** Signed value in data units; bars diverge from zero (or the rule position). */
  value: number;
  display: string;
  sub?: string;
  variant?: 'solid' | 'outline' | 'faint';
}

export interface Tick {
  value: number;
  label: string;
}

export interface DumbbellRow {
  label: string;
  fixed: number;
  agent: number;
  delta: string;
}

export const modeKeys = ['fixed·price_blind', 'fixed·odds_aware', 'agent·price_blind', 'agent·odds_aware'] as const;
export const modeLabels = {
  ru: ['Фикс. контекст · без цен', 'Фикс. контекст · с ценами', 'Агент · без цен', 'Агент · с ценами'],
  en: ['Fixed context · no odds', 'Fixed context · with odds', 'Agent · no odds', 'Agent · with odds'],
};

export function charts(lang: Lang) {
  const ru = lang === 'ru';
  const number = (v: number, d = 1) => fmt(v, lang, d);
  const mode = (key: string) => modeLabels[lang][modeKeys.indexOf(key as typeof modeKeys[number])];
  const brierModes: HBarRow[] = [
    { label: ru ? 'Ранняя линия' : 'Early market', value: facts.leaderboard.market_pre.brier,
      display: number(facts.leaderboard.market_pre.brier, 4), sub: '14', variant: 'outline' },
    ...modeKeys.map((key) => ({ label: mode(key), value: facts.leaderboard.cells[key].brier,
      display: number(facts.leaderboard.cells[key].brier, 4), sub: String(facts.leaderboard.cells[key].n) })),
    { label: ru ? 'Всегда 50%' : 'Always 50%', value: .25, display: number(.25, 4), variant: 'faint' },
  ];
  const pair = facts.ablations.pairs.find(p => p.a === 'fixed·price_blind' && p.b === 'agent·price_blind')!;
  const webDeltas: DumbbellRow[] = Object.entries(pair.per_model)
    .sort((a, b) => a[1].d_ll - b[1].d_ll)
    .map(([label, p]) => ({ label, fixed: p.a.ll, agent: p.b.ll, delta: `+${number(p.d_ll, 3)}` }));
  const spirit = facts.bias.champion;
  const money: HBarRow[] = Object.entries(facts.bets.by_model)
    .sort((a, b) => b[1].roi - a[1].roi)
    .map(([label, v]) => ({ label, value: v.roi * 100, display: `${number(v.roi * 100)}%`, sub: String(v.n) }));
  return { brierModes, webDeltas, money,
    spiritModels: spirit.map(s => s.mean_p * 100), spiritMarket: spirit.map(s => s.market_p * 100),
    spiritStages: spirit.map(s => s.opp.replace('Team ', '').replace('TEAM ', '') + (s.match === 14 ? (ru ? ' · финал' : ' · final') : '')),
    spiritTicks: [0, 25, 50, 75, 100].map(value => ({ value, label: `${value}%` })),
  };
}

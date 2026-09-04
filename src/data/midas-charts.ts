// Datasets for the "12 LLM против букмекера" post-mortem charts.
// All values are transcribed from the lab report (facts.json) and formatted
// with Russian decimal commas the way they appear in the article text.

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

/* 02 · Brier by mode, against the market. */
export const brierModes: HBarRow[] = [
  { label: 'Рынок (первая линия, no-vig)', value: 0.1964, display: '0,1964', sub: '71% точность', variant: 'outline' },
  { label: 'fixed + цены', value: 0.2142, display: '0,2142', sub: '70%', variant: 'solid' },
  { label: 'fixed слепой', value: 0.2183, display: '0,2183', sub: '63%', variant: 'solid' },
  { label: 'агент + цены', value: 0.2167, display: '0,2167', sub: '66%', variant: 'solid' },
  { label: 'консенсус 12 моделей', value: 0.2223, display: '0,2223', sub: '71%', variant: 'solid' },
  { label: 'закрывающая линия', value: 0.2155, display: '0,2155', sub: '62%', variant: 'outline' },
  { label: 'агент слепой', value: 0.2557, display: '0,2557', sub: '55%', variant: 'solid' },
  { label: 'монетка (0,5 всегда)', value: 0.25, display: '0,2500', sub: '—', variant: 'faint' },
];

/* 03 · How often each model takes 1st place across bootstrap resamples (fixed · blind). */
export const bootstrapTop: HBarRow[] = [
  { label: 'glm-5.3', value: 22.7, display: '22,7%', variant: 'outline' },
  { label: 'deepseek-v4-pro', value: 19.0, display: '19,0%' },
  { label: 'minimax-3', value: 15.9, display: '15,9%' },
  { label: 'qwen3.8-max', value: 11.6, display: '11,6%' },
  { label: 'gemini-3.7-flash', value: 10.5, display: '10,5%' },
  { label: 'hy3', value: 9.1, display: '9,1%' },
  { label: 'grok-4.6', value: 6.5, display: '6,5%' },
  { label: 'kimi-k3', value: 1.9, display: '1,9%' },
  { label: 'deepseek-v4-flash', value: 1.5, display: '1,5%' },
  { label: 'gpt-5.6-terra', value: 0.5, display: '0,5%' },
  { label: 'gpt-5.6-luna', value: 0.5, display: '0,5%' },
  { label: 'gpt-5.6-sol', value: 0.2, display: '0,2%' },
];

/* 04 · Fixed context vs agent with web search (blind), log loss. */
export interface DumbbellRow {
  label: string;
  fixed: number;
  agent: number;
  delta: string;
}

export const webDeltas: DumbbellRow[] = [
  { label: 'grok-4.6', fixed: 0.646, agent: 0.694, delta: '+0,048' },
  { label: 'gemini-3.7-flash', fixed: 0.617, agent: 0.679, delta: '+0,062' },
  { label: 'gpt-5.6-sol', fixed: 0.645, agent: 0.718, delta: '+0,072' },
  { label: 'deepseek-v4-pro', fixed: 0.611, agent: 0.684, delta: '+0,073' },
  { label: 'minimax-3', fixed: 0.618, agent: 0.695, delta: '+0,077' },
  { label: 'qwen3.8-max', fixed: 0.614, agent: 0.694, delta: '+0,080' },
  { label: 'deepseek-v4-flash', fixed: 0.634, agent: 0.718, delta: '+0,084' },
  { label: 'hy3', fixed: 0.627, agent: 0.725, delta: '+0,098' },
  { label: 'glm-5.3', fixed: 0.608, agent: 0.706, delta: '+0,098' },
  { label: 'gpt-5.6-terra', fixed: 0.613, agent: 0.718, delta: '+0,105' },
  { label: 'gpt-5.6-luna', fixed: 0.596, agent: 0.704, delta: '+0,108' },
  { label: 'kimi-k3', fixed: 0.621, agent: 0.734, delta: '+0,113' },
];

/* 04 · Optimal temperature-scaling k per mode. */
export const kScale: HBarRow[] = [
  { label: 'agent · price_blind', value: 0.32, display: '0,32', variant: 'outline' },
  { label: 'fixed · price_blind', value: 1.36, display: '1,36' },
  { label: 'fixed · odds_aware', value: 1.42, display: '1,42' },
  { label: 'agent · odds_aware', value: 1.59, display: '1,59' },
];

/* 04 · Reliability curve over all 667 canonical forecasts. */
export interface ReliabilityBucket {
  /** Stated probability, %. */
  claimed: number;
  /** Realized frequency, %. */
  actual: number;
  n: number;
}

export const reliability: ReliabilityBucket[] = [
  { claimed: 19, actual: 0, n: 1 },
  { claimed: 26, actual: 6, n: 16 },
  { claimed: 36, actual: 13, n: 99 },
  { claimed: 44, actual: 30, n: 128 },
  { claimed: 55, actual: 55, n: 186 },
  { claimed: 64, actual: 40, n: 152 },
  { claimed: 74, actual: 74, n: 66 },
  { claimed: 83, actual: 100, n: 19 },
];

/* 04 · Top domains in the agents' search results. */
export const domains: HBarRow[] = [
  { label: 'youtube.com', value: 2243, display: '2 243' },
  { label: 'gosugamers.net', value: 1156, display: '1 156' },
  { label: 'liquipedia.net', value: 781, display: '781' },
  { label: 'dota2.com', value: 333, display: '333' },
  { label: 'tips.gg', value: 287, display: '287' },
  { label: 'dotesports.com', value: 278, display: '278' },
  { label: 'egamersworld.com', value: 242, display: '242' },
  { label: 'blast.tv', value: 194, display: '194' },
  { label: 'cyberscore.live', value: 182, display: '182' },
  { label: 'rdy.gg', value: 170, display: '170' },
];

/* 05 · Ensemble Brier vs number of models in the ensemble. */
export const ensembleTicks: Tick[] = [
  { value: 0.2149, label: '0,2149' },
  { value: 0.2162, label: '0,2162' },
  { value: 0.2176, label: '0,2176' },
  { value: 0.2189, label: '0,2189' },
  { value: 0.2203, label: '0,2203' },
];

export const ensembleValues = [0.2183, 0.2175, 0.2173, 0.2171, 0.2172, 0.217, 0.2169, 0.217, 0.217, 0.2169, 0.2169, 0.2169];

/* 06 · ROI by market segment (flat stakes). */
export const roiSegments: HBarRow[] = [
  { label: 'фора андердога +1.5', value: 33.1, display: '33,1%', variant: 'outline' },
  { label: 'кэф 1.00–1.50', value: 7.8, display: '7,8%', variant: 'outline' },
  { label: 'кэф 1.50–2.00', value: -0.1, display: '−0,1%' },
  { label: 'победа в серии', value: -29.9, display: '−29,9%' },
  { label: 'кэф 2.50–3.50', value: -26.7, display: '−26,7%' },
  { label: 'кэф 2.00–2.50', value: -77.5, display: '−77,5%' },
  { label: 'фора фаворита −1.5', value: -100, display: '−100,0%' },
  { label: 'кэф 3.50 и выше', value: -100, display: '−100,0%' },
];

/* 06 · ROI vs the edge the model claimed for itself. */
export const roiEdge: HBarRow[] = [
  { label: 'эдж < 0 · 9 ставок', value: -1.9, display: '−1,9%' },
  { label: 'эдж 0–5% · 91 ставка', value: -21.4, display: '−21,4%' },
  { label: 'эдж 5–15% · 208 ставок', value: -27.5, display: '−27,5%' },
  { label: 'эдж 15–30% · 131 ставка', value: -28.0, display: '−28,0%' },
  { label: 'эдж 30% и больше · 75 ставок', value: -43.0, display: '−43,0%' },
];

/* 08 · Median output tokens per match vs match Brier. */
export interface ScatterPoint {
  x: number;
  y: number;
  label?: string;
  /** Label offset from the dot, px. */
  dx?: number;
  dy?: number;
  anchor?: 'start' | 'end';
  title?: string;
}

export const lengthPoints: ScatterPoint[] = [
  { x: 3700, y: 0.05, label: 'М2', title: 'М2 · 3 700 токенов · Brier 0,05' },
  { x: 4400, y: 0.11, label: 'М5', title: 'М5 · 4 400 токенов · Brier 0,11' },
  { x: 4400, y: 0.1, label: 'М7', dx: 9, dy: 16, title: 'М7 · 4 400 токенов · Brier 0,10' },
  { x: 4500, y: 0.31, label: 'М10', title: 'М10 · 4 500 токенов · Brier 0,31' },
  { x: 5000, y: 0.24, label: 'М1', title: 'М1 · 5 000 токенов · Brier 0,24' },
  { x: 5000, y: 0.24, label: 'М8', dx: -9, anchor: 'end', title: 'М8 · 5 000 токенов · Brier 0,24' },
  { x: 5100, y: 0.15, label: 'М12', title: 'М12 · 5 100 токенов · Brier 0,15' },
  { x: 5100, y: 0.38, label: 'М3', title: 'М3 · 5 100 токенов · Brier 0,38' },
  { x: 5400, y: 0.22, label: 'М11', title: 'М11 · 5 400 токенов · Brier 0,22' },
  { x: 5400, y: 0.19, label: 'М9', title: 'М9 · 5 400 токенов · Brier 0,19' },
  { x: 5600, y: 0.29, label: 'М4', title: 'М4 · 5 600 токенов · Brier 0,29' },
  { x: 5700, y: 0.46, label: 'М14', title: 'М14 · 5 700 токенов · Brier 0,46' },
  { x: 6500, y: 0.22, label: 'М13', title: 'М13 · 6 500 токенов · Brier 0,22' },
  { x: 6600, y: 0.21, label: 'М6', title: 'М6 · 6 600 токенов · Brier 0,21' },
];

export const lengthTicksX: Tick[] = [
  { value: 3500, label: '3 500' },
  { value: 4400, label: '4 400' },
  { value: 5200, label: '5 200' },
  { value: 6000, label: '6 000' },
  { value: 6900, label: '6 900' },
];

export const lengthTicksY: Tick[] = [
  { value: 0.01, label: '0,01' },
  { value: 0.13, label: '0,13' },
  { value: 0.26, label: '0,26' },
  { value: 0.38, label: '0,38' },
  { value: 0.5, label: '0,50' },
];

/* 08 · Vocabulary: accuracy when a word appears in the rationale, vs the 63.4% base. */
export const vocabBase = 63.4;

export const vocab: HBarRow[] = [
  { label: 'upper bracket', value: 47.4 - vocabBase, display: '47,4%', sub: '38 упом.' },
  { label: 'experience', value: 51.0 - vocabBase, display: '51,0%', sub: '49 упом.' },
  { label: 'momentum', value: 52.4 - vocabBase, display: '52,4%', sub: '84 упом.' },
  { label: 'fatigue', value: 54.5 - vocabBase, display: '54,5%', sub: '22 упом.' },
  { label: 'coin', value: 55.3 - vocabBase, display: '55,3%', sub: '47 упом.' },
  { label: 'roster', value: 58.1 - vocabBase, display: '58,1%', sub: '105 упом.' },
  { label: 'draft', value: 60.5 - vocabBase, display: '60,5%', sub: '205 упом.' },
  { label: 'h2h', value: 61.1 - vocabBase, display: '61,1%', sub: '311 упом.' },
  { label: 'form', value: 63.1 - vocabBase, display: '63,1%', sub: '374 упом.' },
  { label: 'meta', value: 63.1 - vocabBase, display: '63,1%', sub: '103 упом.' },
  { label: 'sweep', value: 63.6 - vocabBase, display: '63,6%', sub: '253 упом.', variant: 'outline' },
  { label: 'lower bracket', value: 63.8 - vocabBase, display: '63,8%', sub: '47 упом.', variant: 'outline' },
  { label: 'elo', value: 66.0 - vocabBase, display: '66,0%', sub: '324 упом.', variant: 'outline' },
  { label: 'favorite', value: 66.7 - vocabBase, display: '66,7%', sub: '246 упом.', variant: 'outline' },
  { label: 'patch', value: 73.9 - vocabBase, display: '73,9%', sub: '23 упом.', variant: 'outline' },
  { label: 'gpm', value: 77.5 - vocabBase, display: '77,5%', sub: '40 упом.', variant: 'outline' },
];

/* 09 · Share of forecasts backing the team named first. */
export const anchorRows: HBarRow[] = [
  { label: 'агент · слепой', value: 71.5, display: '71,5%' },
  { label: 'агент · с ценами', value: 65.7, display: '65,7%' },
  { label: 'fixed · с ценами', value: 58.9, display: '58,9%' },
  { label: 'fixed · слепой', value: 57.1, display: '57,1%' },
  { label: 'рынок', value: 57.1, display: '57,1%', variant: 'outline' },
  { label: 'реальность', value: 42.9, display: '42,9%', variant: 'faint' },
];

/* 09 · How much more models believed in each team than the market did. */
export const brands: HBarRow[] = [
  { label: 'Nigma Galaxy', value: 13.0, display: '+13,0 п.п.', variant: 'outline' },
  { label: 'Team Liquid', value: 5.9, display: '+5,9 п.п.', variant: 'outline' },
  { label: 'TEAM VISION', value: 3.6, display: '+3,6 п.п.', variant: 'outline' },
  { label: 'Team Yandex', value: 1.3, display: '+1,3 п.п.', variant: 'outline' },
  { label: 'Iron Wing', value: -0.2, display: '−0,2 п.п.' },
  { label: 'BoomBoys', value: -5.2, display: '−5,2 п.п.' },
  { label: 'Team Spirit', value: -5.8, display: '−5,8 п.п.' },
  { label: 'Team Falcons', value: -10.1, display: '−10,1 п.п.' },
];

/* 09 · Belief in the future champion, series by series. */
export const spiritStages = ['Iron Wing', 'VISION', 'Liquid', 'BoomBoys', 'Yandex', 'ГФ: VISION'];

export const spiritModels = [62, 28, 49, 60, 47, 31];
export const spiritMarket = [49, 35, 59, 65, 69, 43];

export const spiritTicks: Tick[] = [
  { value: 20, label: '20%' },
  { value: 34, label: '34%' },
  { value: 48, label: '48%' },
  { value: 61, label: '61%' },
  { value: 75, label: '75%' },
];

/* 11 · Cost per canonical forecast vs model Brier. */
export const costPoints: ScatterPoint[] = [
  { x: 0.5, y: 0.227, label: 'hy3', title: 'hy3 · 0,5 цента · Brier 0,227' },
  { x: 0.7, y: 0.229, label: 'deepseek-v4-flash', title: 'deepseek-v4-flash · 0,7 цента · Brier 0,229' },
  { x: 1.2, y: 0.224, label: 'gpt-5.6-luna', title: 'gpt-5.6-luna · 1,2 цента · Brier 0,224' },
  { x: 1.2, y: 0.23, label: 'gpt-5.6-sol', title: 'gpt-5.6-sol · 1,2 цента · Brier 0,230' },
  { x: 1.3, y: 0.228, label: 'gpt-5.6-terra', dx: 9, dy: 16, title: 'gpt-5.6-terra · 1,3 цента · Brier 0,228' },
  { x: 1.3, y: 0.231, label: 'minimax-3', dx: 9, dy: -8, title: 'minimax-3 · 1,3 цента · Brier 0,231' },
  { x: 2.1, y: 0.223, label: 'gemini-3.7-flash', title: 'gemini-3.7-flash · 2,1 цента · Brier 0,223' },
  { x: 2.7, y: 0.217, label: 'deepseek-v4-pro', title: 'deepseek-v4-pro · 2,7 цента · Brier 0,217' },
  { x: 5.0, y: 0.226, label: 'grok-4.6', title: 'grok-4.6 · 5,0 центов · Brier 0,226' },
  { x: 7.3, y: 0.224, label: 'glm-5.3', title: 'glm-5.3 · 7,3 центов · Brier 0,224' },
  { x: 8.2, y: 0.222, label: 'qwen3.8-max', title: 'qwen3.8-max · 8,2 центов · Brier 0,222' },
  { x: 14.2, y: 0.233, label: 'kimi-k3', title: 'kimi-k3 · 14,2 цента · Brier 0,233' },
];

export const costTicksX: Tick[] = [
  { value: 0, label: '0,0' },
  { value: 3.8, label: '3,8' },
  { value: 7.6, label: '7,6' },
  { value: 11.5, label: '11,5' },
  { value: 15.3, label: '15,3' },
];

export const costTicksY: Tick[] = [
  { value: 0.215, label: '0,215' },
  { value: 0.22, label: '0,220' },
  { value: 0.225, label: '0,225' },
  { value: 0.23, label: '0,230' },
  { value: 0.235, label: '0,235' },
];

/* 02 · Main scoreboard: every model against the market, all four modes pooled. */
export const leaderboard: HBarRow[] = [
  { label: 'рынок · первая линия', value: 0.1964, display: '0,1964', sub: '71%', variant: 'outline' },
  { label: 'deepseek-v4-flash', value: 0.1983, display: '0,1983', sub: 'агент+цены' },
  { label: 'deepseek-v4-pro', value: 0.1994, display: '0,1994', sub: 'fixed+цены' },
  { label: 'grok-4.6', value: 0.2031, display: '0,2031', sub: 'агент+цены' },
  { label: 'hy3', value: 0.205, display: '0,2050', sub: 'fixed+цены' },
  { label: 'gpt-5.6-luna', value: 0.2066, display: '0,2066', sub: 'fixed+цены' },
  { label: 'qwen3.8-max', value: 0.2083, display: '0,2083', sub: 'fixed+цены' },
  { label: 'glm-5.3', value: 0.2104, display: '0,2104', sub: 'fixed·слепой' },
  { label: 'gpt-5.6-sol', value: 0.2134, display: '0,2134', sub: 'fixed+цены' },
  { label: 'gemini-3.7-flash', value: 0.2143, display: '0,2143', sub: 'fixed·слепой' },
  { label: 'minimax-3', value: 0.2145, display: '0,2145', sub: 'fixed·слепой' },
  { label: 'gpt-5.6-terra', value: 0.2154643, display: '0,2155', sub: 'fixed+цены' },
  { label: 'рынок · закрывающая', value: 0.2154733, display: '0,2155', sub: '62%', variant: 'outline' },
  { label: 'kimi-k3', value: 0.2157, display: '0,2157', sub: 'fixed·слепой' },
  { label: 'консенсус 12 моделей', value: 0.2223, display: '0,2223', sub: '71%', variant: 'outline' },
  { label: 'монетка (всегда 0,5)', value: 0.25, display: '0,2500', sub: '—', variant: 'faint' },
];

/* 06 · Virtual money lost per model, flat stakes. */
export const moneyBoard: HBarRow[] = [
  { label: 'qwen3.8-max', value: -18.4, display: '−18,4%', sub: '37 ставок' },
  { label: 'minimax-3', value: -21.3, display: '−21,3%', sub: '39' },
  { label: 'deepseek-v4-pro', value: -23.5, display: '−23,5%', sub: '47' },
  { label: 'hy3', value: -25.2, display: '−25,2%', sub: '50' },
  { label: 'gpt-5.6-luna', value: -27.3, display: '−27,3%', sub: '46' },
  { label: 'все модели вместе', value: -28.8, display: '−28,8%', sub: '514', variant: 'outline' },
  { label: 'EV-бот без рассуждений', value: -30.8, display: '−30,8%', sub: '226', variant: 'faint' },
  { label: 'grok-4.6', value: -31.0, display: '−31,0%', sub: '43' },
  { label: 'gpt-5.6-terra', value: -32.2, display: '−32,2%', sub: '44' },
  { label: 'deepseek-v4-flash', value: -32.5, display: '−32,5%', sub: '44' },
  { label: 'gemini-3.7-flash', value: -33.2, display: '−33,2%', sub: '38' },
  { label: 'gpt-5.6-sol', value: -33.7, display: '−33,7%', sub: '41' },
  { label: 'glm-5.3', value: -34.5, display: '−34,5%', sub: '41' },
  { label: 'kimi-k3', value: -35.1, display: '−35,1%', sub: '44' },
];

/* 08 · Same JSON, two answers: stated market probability vs the one implied
   by the model's own score distribution. Handicap only; winner is the outline row. */
export const headGap: HBarRow[] = [
  { label: 'grok-4.6', value: 14.0, display: '14,0 п.п.', sub: 'макс 90' },
  { label: 'deepseek-v4-pro', value: 9.1, display: '9,1', sub: 'макс 52' },
  { label: 'hy3', value: 9.0, display: '9,0', sub: 'макс 47' },
  { label: 'deepseek-v4-flash', value: 8.5, display: '8,5', sub: 'макс 56' },
  { label: 'glm-5.3', value: 8.2, display: '8,2', sub: 'макс 52' },
  { label: 'kimi-k3', value: 7.8, display: '7,8', sub: 'макс 40' },
  { label: 'gpt-5.6-sol', value: 7.5, display: '7,5', sub: 'макс 50' },
  { label: 'gpt-5.6-terra', value: 7.2, display: '7,2', sub: 'макс 53' },
  { label: 'minimax-3', value: 7.0, display: '7,0', sub: 'макс 44' },
  { label: 'qwen3.8-max', value: 6.5, display: '6,5', sub: 'макс 38' },
  { label: 'gemini-3.7-flash', value: 6.3, display: '6,3', sub: 'макс 47' },
  { label: 'gpt-5.6-luna', value: 6.3, display: '6,3', sub: 'макс 51' },
  { label: 'победитель матча · все 12', value: 0.4, display: '0,4', sub: '—', variant: 'outline' },
];

/* 09 · Predicted modal score against what actually happened. */
export const sweepBias: DumbbellRow[] = [
  { label: '2:0', fixed: 31.8, agent: 7.1, delta: '−24,7 п.п.' },
  { label: '2:1', fixed: 24.6, agent: 35.7, delta: '+11,1' },
  { label: '0:2', fixed: 21.7, agent: 28.6, delta: '+6,9' },
  { label: '1:2', fixed: 14.8, agent: 21.4, delta: '+6,6' },
];

/* ---------------------------------------------------------------------------
 * English captions for the same datasets. The numbers above stay the single
 * source of truth; only the strings around them are swapped, so the two
 * language versions of the post can never drift apart.
 * ------------------------------------------------------------------------ */

const EN_LABELS: Record<string, string> = {
  'Рынок (первая линия, no-vig)': 'Market (opening line, no-vig)',
  'рынок · первая линия': 'market · opening line',
  'рынок · закрывающая': 'market · closing',
  'закрывающая линия': 'closing line',
  'консенсус 12 моделей': 'consensus of 12 models',
  'монетка (0,5 всегда)': 'coin flip (always 0.5)',
  'монетка (всегда 0,5)': 'coin flip (always 0.5)',
  'fixed + цены': 'fixed + prices',
  'fixed слепой': 'fixed, blind',
  'агент + цены': 'agent + prices',
  'агент слепой': 'agent, blind',
  'агент · слепой': 'agent · blind',
  'агент · с ценами': 'agent · with prices',
  'fixed · с ценами': 'fixed · with prices',
  'fixed · слепой': 'fixed · blind',
  'агент+цены': 'agent+prices',
  'fixed+цены': 'fixed+prices',
  'fixed·слепой': 'fixed·blind',
  'рынок': 'market',
  'реальность': 'reality',
  'фора андердога +1.5': 'underdog +1.5 maps',
  'фора фаворита −1.5': 'favourite −1.5 maps',
  'победа в серии': 'series winner',
  'кэф 1.00–1.50': 'odds 1.00–1.50',
  'кэф 1.50–2.00': 'odds 1.50–2.00',
  'кэф 2.00–2.50': 'odds 2.00–2.50',
  'кэф 2.50–3.50': 'odds 2.50–3.50',
  'кэф 3.50 и выше': 'odds 3.50 and up',
  'эдж < 0 · 9 ставок': 'edge < 0 · 9 bets',
  'эдж 0–5% · 91 ставка': 'edge 0–5% · 91 bets',
  'эдж 5–15% · 208 ставок': 'edge 5–15% · 208 bets',
  'эдж 15–30% · 131 ставка': 'edge 15–30% · 131 bets',
  'эдж 30% и больше · 75 ставок': 'edge 30%+ · 75 bets',
  'все модели вместе': 'all models pooled',
  'EV-бот без рассуждений': 'EV bot, no reasoning',
  'победитель матча · все 12': 'match winner · all 12',
  'ГФ: VISION': 'GF: VISION',
};

/** Russian caption → English, including the numeric formatting. */
const enText = (s: string): string =>
  EN_LABELS[s] ??
  s
    .replace(/(\d),(\d)/g, '$1.$2')
    .replace(/п\.п\./g, 'pp')
    .replace(/^М(\d+)/, 'M$1')
    .replace(/(\d) (\d{3})/g, '$1,$2')
    .replace(/ токенов/g, ' tokens')
    .replace(/(\d+) упом\./, '$1 mentions')
    .replace(/(\d+) ставок|(\d+) ставки|(\d+) ставок/, (_, n) => `${n} bets`)
    .replace(/^(\d+)$/, '$1')
    .replace(/макс /, 'max ')
    .replace(/% точность/, '% accuracy')
    .replace(/ цент(а|ов)/g, '¢');

/** Same rows, English captions. Works for every dataset shape in this file. */
export const enRows = <T extends object>(rows: T[]): T[] =>
  rows.map((row) => {
    const out = { ...row } as Record<string, unknown>;
    for (const key of ['label', 'display', 'sub', 'delta', 'title']) {
      if (typeof out[key] === 'string') out[key] = enText(out[key] as string);
    }
    return out as T;
  });

export const enLabels = (labels: string[]): string[] => labels.map(enText);

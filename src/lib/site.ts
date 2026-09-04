export const site = {
  name: 'Sergey Samozhen',
  nameRu: 'Сергей Саможён',
  role: 'AI engineer / researcher',
  roleRu: 'AI-инженер / исследователь',
  description:
    'Independent research on LLM agents, evaluation systems, probabilistic forecasting and security automation.',
  descriptionRu:
    'Независимые исследования LLM-агентов, систем оценки, вероятностного прогнозирования и автоматизации безопасности.',
  email: 'ssamozhen13@gmail.com',
  github: 'https://github.com/idrevnii',
  telegram: 'https://t.me/drevnii_dev',
};

export const withBase = (path = '') => {
  const base = import.meta.env.BASE_URL;
  const clean = path.replace(/^\/+/, '');
  return `${base}${clean}`.replace(/(?<!:)\/{2,}/g, '/');
};

export const formatDate = (date: Date) =>
  date.toISOString().slice(0, 10).split('-').reverse().join('.');

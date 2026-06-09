const BASE_URL = 'https://d7tech.net';

export function getAlternates(path: string) {
  const clean = path === '/' ? '' : path;
  return {
    languages: {
      tr: `${BASE_URL}/tr${clean}`,
      en: `${BASE_URL}/en${clean}`,
      'x-default': `${BASE_URL}/tr${clean}`,
    },
  };
}

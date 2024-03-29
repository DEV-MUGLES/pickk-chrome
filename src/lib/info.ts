import { InfoCrawlResult } from '../types/info';

export const parseAll = (result: InfoCrawlResult): InfoCrawlResult => {
  if (!(result instanceof Object)) {
    throw new Error('Get invalid result');
  }
  return Object.keys(result).reduce((acc, key) => {
    return { ...acc, [key]: parseValue(key, result[key]) };
  }, {} as InfoCrawlResult);
};

export const parseValue = (key: string, value: string): string | number => {
  if (key === 'name' && value[0] === '[' && value[value.length - 1] === ']') {
    return value.slice(1, value.length - 1);
  }
  if (key === 'originalPrice' || key === 'salePrice') {
    return strToNumber(value);
  }
  return value;
};

export const parseHostName = (hostname: string): string => {
  if (hostname.includes('topten10mall.com')) {
    return 'topten10mall.com';
  }

  return hostname.replace('www.', '');
};

export const correct = (result: InfoCrawlResult): InfoCrawlResult => {
  const { imageUrl: iu, originalPrice: op, salePrice: sp } = result;

  let imageUrl = iu;
  let originalPrice = op;
  let salePrice = sp;

  if (op === 0 || sp === 0) {
    originalPrice = op + sp;
    salePrice = op + sp;
  }
  if (originalPrice < salePrice) {
    const temp = originalPrice;
    originalPrice = salePrice;
    salePrice = temp;
  }
  if (iu[0] === '/') {
    imageUrl = 'https:' + result.imageUrl;
  }
  return { ...result, imageUrl, originalPrice, salePrice };
};

export const strToNumber = (str: string): number => {
  if (typeof str !== 'string') {
    return str;
  }
  return Number(
    str.slice(0, str.indexOf('.') + 1 || str.length).replace(/[^0-9]/g, '')
  );
};

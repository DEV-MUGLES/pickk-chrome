import { Service, Inject } from 'typedi';

import { parseHostName } from '../lib';
import { OptionCrawlResult } from '../types';

import * as optionCrawlers from '../crawlers/option';
import { waitUntilData } from '../crawlers/waitUntil';

@Service()
export default class OptionCrawlService {
  constructor(@Inject('pool') private pool, @Inject('logger') private logger) {}

  public async Crawl(_url: string): Promise<OptionCrawlResult> {
    try {
      const url = encodeURI(_url);
      const host = this.getHost(url);
      const crawler = this.getCrawler(host);

      if (!crawler) {
        throw new Error('Crawler not found');
      }

      const waitUntil = waitUntilData[host] || 'domcontentloaded';

      const result = await this.pool.process(
        async (page, data) => {
          const { url, crawler, waitUntil } = data;

          await page.goto(url, {
            waitUntil,
            timeout: 0,
          });
          const result = await page.evaluate(crawler);
          return result;
        },
        { url, crawler, waitUntil }
      );
      this.logger.silly('Option-crawl for %s\n', url);
      console.log(result);

      return result;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  private getHost = (url: string): string => {
    return parseHostName(new URL(url).hostname);
  };

  private getCrawler = (host: string) => {
    const name = '_' + host.replace(/\.|-/g, '');
    return optionCrawlers[name];
  };
}

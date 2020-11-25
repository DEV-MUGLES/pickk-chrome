import { Service, Inject } from 'typedi';

import { parseHostName } from '../lib';
import { OptionCrawlResult } from '../types';

import * as optionCrawlers from '../crawlers/option';

@Service()
export default class OptionCrawlService {
  constructor(@Inject('pool') private pool, @Inject('logger') private logger) {}

  public async Crawl(_url: string): Promise<OptionCrawlResult> {
    try {
      const url = encodeURI(_url);
      const host = this.getHost(url);
      const crawler = this.getCrawler(host);

      const result = await this.pool.process(
        async (page, data) => {
          // Navigate to given Url and wait until Angular is ready
          // if it's an angular page.
          await page.goto(data.url, {
            waitUntil: 'networkidle0',
          });
          const result = await page.evaluate(data.crawler);
          return result;
        },
        { url, crawler }
      );
      this.logger.silly('Info-crawl for %s\n', url);
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

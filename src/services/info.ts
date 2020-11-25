import { Service, Inject } from 'typedi';

import { parseHostName, correct, parseAll } from '../lib';
import { InfoCrawlResult } from '../types';

import * as infoCrawlers from '../crawlers/info';

@Service()
export default class InfoCrawlService {
  constructor(@Inject('pool') private pool, @Inject('logger') private logger) {}

  public async Crawl(_url: string): Promise<InfoCrawlResult> {
    try {
      const url = encodeURI(_url);
      const host = this.getHost(url);
      const crawler = this.getCrawler(host);

      if (!crawler) {
        throw new Error('Crawler not found');
      }

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

      const temp = correct(parseAll(result));
      return temp;
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
    return infoCrawlers[name];
  };
}

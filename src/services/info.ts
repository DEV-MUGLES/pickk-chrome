import { Service, Inject } from 'typedi';

import { parseHostName, correct, parseAll } from '../lib';
import { InfoCrawlResult } from '../types';

import * as infoCrawlers from '../crawlers/info';
import { waitUntilData } from '../crawlers/waitUntil';

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

      const waitUntil = waitUntilData[host] || 'domcontentloaded';

      const result = await this.pool.process(
        async (page, data) => {
          let url_redirected = false;
          page.on('response', (response) => {
            const status = response.status();
            //[301, 302, 303, 307, 308]
            if (status >= 300 && status <= 399) {
              url_redirected = true;
            }
          });

          const { url, crawler, waitUntil } = data;
          await page.goto(url, {
            waitUntil,
          });

          if (url_redirected) {
            //if page redireced , we wait for navigation end
            await page.waitForNavigation({
              waitUntil: 'domcontentloaded',
            });
          }

          //finally , we remove listeners in case the response event fire more than once
          page.removeAllListeners('response');
          const result = await page.evaluate(crawler);
          return result;
        },
        { url, crawler, waitUntil }
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

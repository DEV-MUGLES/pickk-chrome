import { Service, Inject } from 'typedi';

import { parseHostName } from '../../lib';

import * as deliveryTrackCrawlers from '../../crawlers/delivery/track';
import { waitUntilData } from '../../crawlers/waitUntil';
import { waitSelectorData } from '../../crawlers/waitSelector';

@Service()
export default class DeliveryTrackService {
  constructor(@Inject('pool') private pool, @Inject('logger') private logger) {}

  public async Crawl(_url: string): Promise<string> {
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
          });
          await page.waitForSelector(waitSelectorData[host] || 'html');

          const result = await page.evaluate(crawler);
          return result;
        },
        { url, crawler, waitUntil }
      );
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
    return deliveryTrackCrawlers[name];
  };
}

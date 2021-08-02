import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';

import { InfoCrawlService, OptionCrawlService } from '../../services/item';
import { KrHanjinCrawlService } from '../../services/delivery';

const route = Router();

export default (app: Router) => {
  app.use('/crawl', route);

  route.get(
    '/info',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Info-Crawl endpoint with url: %s', req.url);
      try {
        const { url } = req.query;
        const infoCrawlServiceInstance = Container.get(InfoCrawlService);
        const result = await infoCrawlServiceInstance.Crawl(url.toString());
        return res.json({ ...result }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );

  route.get(
    '/option',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Option-Crawl endpoint with url: %s', req.url);
      try {
        const { url } = req.query;
        const optionCrawlServiceInstance = Container.get(OptionCrawlService);
        const result = await optionCrawlServiceInstance.Crawl(url.toString());
        return res.json({ ...result }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );

  route.get(
    '/delivery/hanjin/:trackId',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug(
        'Calling Delivery Hanjin Crawl endpoint with url: %s',
        req.url
      );

      try {
        const { trackId } = req.params;
        const result = await KrHanjinCrawlService.crawl(trackId);
        return res.json(result).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );
};

import { Router } from 'express';
import crawl from './routes/crawl';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  crawl(app);

  return app;
};

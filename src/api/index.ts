import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import crawl from './routes/crawl';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  user(app);
  crawl(app);

  return app;
};

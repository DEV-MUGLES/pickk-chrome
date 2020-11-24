import { Container } from 'typedi';

import PoolInstance from './pool';
import LoggerInstance from './logger';

export default async () => {
  try {
    await PoolInstance.launch();
    Container.set('pool', PoolInstance);
    Container.set('logger', LoggerInstance);

    LoggerInstance.info('✌️ Pool injected into container');

    return {
      pool: PoolInstance,
    };
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};

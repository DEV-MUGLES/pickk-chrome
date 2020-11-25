import { createPool } from 'generic-pool';
import defaultPuppeteer, { Page } from 'puppeteer';
import fs from 'fs';
import path from 'path';

const Helpers = {
  createPool,
  debug: console.log,
  defaultPuppeteer,
  defaultPuppeteerArgs: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-infobars',
    '--window-position=0,0',
    '--ignore-certifcate-errors',
    '--ignore-certifcate-errors-spki-list',
    '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
  ],
  poolFactory: {
    async create() {
      const { onPageCreated = null } = this.options;
      const page = await this.browser
        .newPage()
        .catch((ex) => Helpers.debug('create page error: %s', ex));
      if (page) {
        if (typeof onPageCreated === 'function') {
          try {
            await onPageCreated.call(this, page);
            Helpers.debug('page is created');
          } catch (ex) {
            Helpers.debug('onPageCreated error: %s', ex);
          }
        }
      }
      return page;
    },
    async destroy(page) {
      const { onPageDestroy = null } = this.options;
      if (page) {
        if (typeof onPageDestroy === 'function') {
          try {
            await onPageDestroy.call(this, page);
            Helpers.debug('onPageDestroy done');
          } catch (ex) {
            Helpers.debug('onPageDestroy error: %s', ex);
          }
        }
        if (!page.isClosed()) {
          await page.close();
        }
        Helpers.debug('page is destroyed');
      }
    },
    async validate(page) {
      const { onValidate = null } = this.options;
      let response = false;
      if (page) {
        if (typeof onValidate === 'function') {
          try {
            response = await onValidate.call(this, page);
            Helpers.debug('onValidate done: %s', response);
          } catch (ex) {
            Helpers.debug('onValidate error: %s', ex);
          }
        } else {
          response = true;
        }
      }
      return Promise.resolve(response);
    },
  },
};

class Pool {
  pool: any;
  options: any;
  browser: any;

  constructor(options = {}) {
    this.browser = null;
    this.options =
      typeof options === 'object' && !!options && !Array.isArray(options)
        ? options
        : {};
    this.pool = null;
  }

  async launch() {
    const {
      poolOptions = {},
      puppeteer = Helpers.defaultPuppeteer,
      puppeteerOptions = {},
    } = this.options;
    puppeteerOptions.args =
      puppeteerOptions.args || Helpers.defaultPuppeteerArgs;
    this.browser = await puppeteer
      .launch(puppeteerOptions)
      .catch((ex) => Helpers.debug('browser create error: %s', ex));

    if (this.browser) {
      Helpers.debug('browser is created with: %j', puppeteerOptions);
      this.pool = Helpers.createPool(
        {
          create: Helpers.poolFactory.create.bind(this),
          destroy: Helpers.poolFactory.destroy.bind(this),
          validate: Helpers.poolFactory.validate.bind(this),
        },
        poolOptions
      );
    }

    if (this.pool) {
      Helpers.debug('pool is created with: %j', poolOptions);
      this.pool.on('factoryCreateError', (ex) =>
        Helpers.debug('pool.factoryCreate error: %s', ex)
      );
      this.pool.on('factoryDestroyError', (ex) =>
        Helpers.debug('pool.factoryDestroy error: %s', ex)
      );
    } else {
      Helpers.debug('pool is not created');
    }
  }

  async process(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handler: (page: Page, ...args: any[]) => Promise<any>,
    ...args
  ) {
    if (!this.pool) {
      Helpers.debug(
        'pool is not found. Did you forgot to call launch() method?'
      );
      return;
    }
    const result = await this.pool
      .use((page) => handler(page, ...args, this.pool))
      .catch((ex) => Helpers.debug('process error: %s', ex));

    return result;
  }
}

const preloadFile = fs.readFileSync(
  path.join(__dirname, '../lib/preload.js'),
  'utf8'
);

const poolLoader = new Pool({
  poolOptions: {
    min: 3,
    max: 20,
  },
  puppeteerOptions: {
    headless: true,
    ignoreHTTPSErrors: true,
    userDataDir: './tmp',
  },
  onPageCreated: async (page: Page) => {
    await page.evaluateOnNewDocument(preloadFile);
  },
});

export default poolLoader;

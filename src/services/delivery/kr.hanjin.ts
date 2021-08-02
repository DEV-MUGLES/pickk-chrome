import puppeteer from 'puppeteer';

import { _hanjincokr } from '../../crawlers/delivery';

// 한진택배 운송장번호 조회 url
const HANJIN_URL =
  'https://www.hanjin.co.kr/kor/CMS/DeliveryMgr/WaybillSch.do?mCode=MN038';

const crawl = async (trackId: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(HANJIN_URL, { waitUntil: 'networkidle2' });
  await page.type('#wblnumText', trackId);
  await page.click('input.btn-serch');
  await page.waitForNavigation();
  const result = await page.evaluate(_hanjincokr);
  return result;
};

const KrHanjinCrawlService = {
  crawl,
};

export default KrHanjinCrawlService;

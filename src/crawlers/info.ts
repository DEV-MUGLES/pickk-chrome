export const _29cmcokr = () => {
  const name = document.querySelector(
    'div.item_detail_view > ui-detail-order > div.detail_order_area > div.prd_info > div.info > div'
  ).textContent;

  const imageUrlElement = document.querySelector(
    'div.detail_item > div.item_img_view > div > ruler-swiper-container > div > div.swiper-container > div > ruler-swiper-slide > div > div > ruler-blazy > img'
  );

  const imageUrl =
    imageUrlElement.getAttribute('data-blazy') ||
    imageUrlElement.getAttribute('src');

  const brandKor = document.querySelector(
    'div.item_detail_view > div.prd_brand_area h1.kor'
  ).textContent;

  const originalPrice = document.querySelector(
    'div.detail_order_area > div.prd_price div.sale div:nth-child(2) span.num'
  )?.textContent;

  const salePrice = document.querySelector(
    'div.detail_order_area > div.prd_price div.sale span.num'
  )?.textContent;

  return {
    name: name.replace('\n', '').trim(),
    brandKor,
    imageUrl,
    salePrice: salePrice?.slice(salePrice.indexOf('%') + 1),
    originalPrice: originalPrice?.slice(originalPrice.indexOf('%') + 1) || 0,
  };
};

export const _hivercokr = () => {
  const name = (document.getElementsByClassName(
    'detail_title'
  )[0] as HTMLDivElement).textContent;
  const brandKor = document.querySelector('strong.store-name').textContent;
  const imageUrl = document
    .querySelector('div.swiper-wrapper')
    .innerHTML.split('&quot;')[1];
  const salePrice = document
    .querySelector('strong.current-price')
    .textContent.split('원')[0]
    .replace(/[^\d]+/g, '');
  const originalPrice = document.querySelector('.detail_price del').textContent;

  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _ssfshopcom = () => {
  const brands = {
    '8seconds': '에잇세컨즈',
    Beanpole: '빈폴',
    'Beanpole Accessory': '빈폴 악세사리',
    'Beanpole Golf': '빈폴 골프',
    'Beanpole Kids': '빈폴 키즈',
    'Beanpole Ladies': '빈폴 레이디스',
    'Beanpole Men': '빈폴 맨',
    'Beanpole Sport': '빈폴 스포츠',
    Galaxy: '갤럭시',
    'Galaxy Lifestyle': '갤럭시 라이프스타일',
    HEARTIST: '하티스트',
    'Juun.j': '준지',
    KUHO: '쿠호',
    'kuho plus': '쿠호 플러스',
    LEBEIGE: '르베이지',
    MELISSA: '멜리사',
    MVIO: '엠비오',
    OIAUER: '오이아우어',
    Rogatis: '로가디스',
    '10 Corso Como': '10 꼬르소 꼬모',
    ami: '아미',
    Aspesi: '아스페시',
    Auralee: '아우라리',
    'BAO BAO ISSEY MIYAKE': '바오 바오 이세이 미야케',
    'Barena Venezia': '바레나 베네치아',
    BROOKS: '부룩스',
    'CANADA GOOSE': '캐나다 구스',
    Danton: '단톤',
    GRANIT: '그라니트',
    'Helmut Lang': '헬무트 랭',
    'James Perse': '제임스 퍼스',
    Lansmere: '란스미어',
    'Maison Kitsuné': '메종 키츠네',
    'PLEATS PLEASE ISSEY MIYAKE': '플리츠 플리즈 이세이 미야케',
    'Rag & Bone': '랙앤본',
    'RICK OWENS': '릭 오웬스',
    Spalwart: '스파워트',
    'Studio Nicholson': '스튜디오 니콜슨',
    SUITSUPPLY: '수트서플라이',
    Theory: '띠어리',
    'Tory Burch': '토리 버치',
    'PLAY COMME des GARCONS': '플레이 꼼데 가르송',
  };

  const name = (document.getElementById('goodDtlTitle') as HTMLHeadingElement)
    .innerText;
  const brandKor =
    brands[
      (document.getElementsByClassName('brand')[0]
        .children[0] as HTMLAnchorElement).text
        .split('>')[0]
        .trim()
    ];
  const imageUrl = (document.getElementsByClassName('lslide')[0].children[0]
    .children[0] as HTMLImageElement).src;
  const priceList = (document.getElementsByClassName(
    'price'
  )[0] as HTMLDivElement).innerText.split(/ | |\n/);
  const salePrice = priceList[0];
  const originalPrice = priceList[1] || salePrice;
  const isSoldout =
    document.getElementById('restockSoldOut').style.display !== 'none';

  const images = [];
  const imageEles = document
    .getElementById('about')
    .getElementsByTagName('img');
  for (let i = 0; i < imageEles.length; ++i) {
    const imageEle = imageEles.item(i);
    images.push(imageEle.getAttribute('src'));
  }

  return {
    name,
    brandKor,
    imageUrl,
    salePrice,
    originalPrice,
    isSoldout,
    images,
  };
};

export const _matchesfashioncom = () => {
  const name = (document.getElementsByClassName(
    'pdp-description'
  )[0] as HTMLSpanElement).innerText.trim();
  const brandKor = (document.getElementById('breadcrumb').children[0]
    .children[2].children[0] as HTMLAnchorElement).text.trim();
  const imageUrl = document
    .querySelector('meta[property="og:image"]')
    .getAttribute('content');
  const originalPrice = document
    .querySelector('.pdp-price strike')
    .textContent.replace(/[^\d]+/g, '');
  const salePrice = document
    .querySelector('.pdp-price__hilite')
    .textContent.split('$')[1];
  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _lfmallcokr = () => {
  const name = document
    .querySelector('meta[property="og:description"]')
    .getAttribute('content');
  const brandKor = document
    .querySelector('meta[name="keywords"]')
    .getAttribute('content')
    .split(',')[1];
  const imageUrl = document
    .querySelector('meta[property="og:image"]')
    .getAttribute('content');
  const originalPrice = document
    .querySelector('meta[property="rb:originalPrice"]')
    .getAttribute('content');
  const salePrice = document
    .querySelector('meta[property="rb:salePrice"]')
    .getAttribute('content');
  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _nikecom = () => {
  const name = document.querySelector('h1.title-wrap > span.tit').textContent;
  const brandKor = '나이키';
  const imageUrl = document
    .querySelector('meta[property="og:image"]')
    .getAttribute('content');
  const originalPrice =
    document.querySelector('div.price-wrap span.price-sale')?.textContent || 0;
  const salePrice = document.querySelector('div.price-wrap span.price > strong')
    .textContent;
  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _onthelookcokr = () => {
  const name = (document.getElementsByClassName(
    'sc-jdfcpN'
  )[0] as HTMLDivElement).innerText;

  const brandKor = (document.getElementsByClassName(
    'sc-bIqbHp'
  )[0] as HTMLDivElement).innerText;
  const imageUrl = (document.getElementsByClassName(
    'sc-fkyLDJ'
  )[0] as HTMLImageElement).src;
  const originalPrice = (document.getElementsByClassName('sc-hMrMfs')[0]
    .children[0] as HTMLDivElement).innerText;
  const salePrice = (document.getElementsByClassName('sc-eopZyb')[0]
    .children[0] as HTMLDivElement).innerText;
  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _lookpincokr = () => {
  const name = document.querySelector('span.ProductDetailDesktop_title__3AQr4')
    .textContent;
  const brandKor = (document.getElementsByClassName(
    'StoreRowWithBookmark_name__rw46l'
  )[0] as HTMLSpanElement).innerText;
  const imageUrl = document
    .querySelector('.ProductDetailDesktop_imageTab__IBM1k picture')
    .innerHTML.split(' ')[1]
    .substring(5)
    .split('"')[0];
  const salePrice = document
    .querySelector('span.ProductDetailDesktop_price__7vSoT')
    .textContent.replace(/[^\d]+/g, '');
  const originalPrice = document.querySelector(
    '.ProductDetailDesktop_prevPrice__3Eb37'
  ).textContent;
  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _g9cokr = () => {
  const name = (document.getElementById('subjText4') as HTMLElement).innerText;
  const brandKor = (document.getElementById('subjText3') as HTMLSpanElement)
    .innerText;
  const imageUrl = (document.getElementById('goodsImage') as HTMLImageElement)
    .src;
  const originalPrice = (document.getElementById('subjText4') as HTMLElement)
    .innerText;
  const salePrice = originalPrice;
  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _kolonmallcom = () => {
  const name = (document.querySelector(
    'div.info-group > form > div.title'
  ) as HTMLDivElement).textContent;
  const title = (document.querySelector('title') as HTMLTitleElement)
    .textContent;
  const brandKor = title.slice(title.indexOf('_') + 1).trim();
  const imageUrl = (document.querySelector(
    '#kolon-content > article > div.head-info-wrap > div.thumb-group > div.thumb.swiper-container.swiper-container-initialized.swiper-container-horizontal > div.swiper-wrapper > div > div > img.base'
  ) as HTMLImageElement).src;
  const salePrice =
    document
      .querySelector('div.info-group > form > div.price > strong')
      ?.textContent.replace(/[^\d]+/g, '') || '0';
  const originalPrice =
    document
      .querySelector('div.info-group > form > div.price > del')
      ?.textContent.replace(/[^\d]+/g, '') ||
    '0' ||
    '0';
  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _hiphopercom = () => {
  const name = (document.querySelector('#getItemName') as HTMLDivElement)
    .textContent;
  const brandKor = (document.querySelector('#getBrandName') as HTMLDivElement)
    .textContent;
  const imageUrl = (document.querySelector(
    'body > div:nth-child(2) > main > section.viewdetail.clear > div.imgs.on_w > div.visual > a > img'
  ) as HTMLImageElement).src;
  const salePrice =
    document.querySelector(
      'body > div:nth-child(2) > main > section.viewdetail.clear > div.info > dl:nth-child(3) > dd.price_txt > strong'
    )?.textContent || '0';
  const originalPrice =
    document.querySelector(
      'body > div:nth-child(2) > main > section.viewdetail.clear > div.info > dl:nth-child(3) > dd.dis_f.ai_c > del'
    )?.textContent || '0';

  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _hyundaihmallcom = () => {
  const name = (document.querySelector(
    'h3.pdtTitle'
  ) as HTMLHeadingElement)?.textContent
    ?.replace(/\n/gi, '')
    .trim();
  const brandKor = '현대몰';
  const imageUrl = (document.querySelector(
    '#prd_ipzoom > div._frm_input > img._img_input._active'
  ) as HTMLImageElement)?.src;
  const salePrice =
    document.querySelector(
      '#content > div > div.pdr_wrap > div.prdInfo_wrap > div.priceCont > p.finalPrice.number.hasDC > strong'
    )?.textContent || '0';
  const originalPrice =
    document.querySelector(
      '#content > div > div.pdr_wrap > div.prdInfo_wrap > div.priceCont > p:nth-child(1) > span > strong'
    )?.textContent || '0';

  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _ssensecom = () => {
  const name = document
    .querySelector('meta[name="twitter:title"]')
    .getAttribute('content')
    .split('-')[1]
    .trim();
  const brandKor = document
    .querySelector('meta[name="twitter:data2"]')
    .getAttribute('content');
  const imageUrl = document
    .querySelector('meta[property="og:image"]')
    .getAttribute('content');
  const salePrice = document
    .querySelector('meta[name="twitter:data1"]')
    .getAttribute('content')
    .split(' ')[0]
    .slice(1);

  const originalPrice = document
    .querySelector('meta[name="twitter:data1"]')
    .getAttribute('content')
    .split(' ')[0]
    .slice(1);

  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _guccicom = () => {
  const name = document
    .querySelector('meta[property="og:title"]')
    .getAttribute('content');
  const brandKor = '구찌';
  const imageUrl = document
    .querySelector('#accordion-product-details > picture > img')
    .getAttribute('srcset');

  const originalPrice =
    document.querySelector('#markedDown_full_Price')?.textContent || 0;
  const salePrice = document.querySelector('#markedDown_full_Price')
    .textContent;
  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _diorcom = () => {
  const name = document.querySelector(
    'div.product-titles > h1 > span.multiline-text.product-titles-title'
  ).textContent;
  const brandKor = '디올';
  const imageUrl = document
    .querySelector('meta[property="og:image"]')
    .getAttribute('content');

  const originalPrice =
    document.querySelector('span.price-line')?.textContent || 0;
  const salePrice = document.querySelector('span.price-line').textContent;
  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _stoneislandcom = () => {
  const name = document.querySelector('#item__product-info-title > span > span')
    .textContent;
  const brandKor = '스톤아일랜드';
  const imageUrl = document
    .querySelector('meta[name="twitter:image"]')
    .getAttribute('content');
  const originalPrice = document.querySelector('.price > span.value')
    .textContent;
  const salePrice = document.querySelector('.price > span.value').textContent;
  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _bottegavenetacom = () => {
  const name = document
    .querySelector('meta[property="og:title"]')
    .getAttribute('content');
  const brandKor = '보테가베네타';
  const imageUrl = document
    .querySelector('meta[property="og:image"]')
    .getAttribute('content');
  const originalPrice = document.querySelector('.price > span.value')
    .textContent;
  const salePrice = document.querySelector('.price > span.value').textContent;
  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _krmcmworldwidecom = () => {
  const name = document
    .querySelector('meta[property="og:title"]')
    .getAttribute('content');
  const brandKor = 'MCM';
  const imageUrl = document
    .querySelector('meta[property="og:image"]')
    .getAttribute('content');
  const originalPrice = document.querySelector(
    '.product-price > span.price-sales'
  ).textContent;
  const salePrice = document.querySelector('.product-price > span.price-sales')
    .textContent;
  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _www2hmcom = () => {
  const name = document
    .querySelector('meta[property="og:title"]')
    .getAttribute('content')
    .split('-')[0]
    .trim();
  const brandKor = 'H&M';
  const imageUrl =
    'https://' +
    document.querySelector('meta[name="og:image"]').getAttribute('content');
  const salePrice = document
    .querySelector('#product-price > div > span')
    .textContent.replace(/[^\d]+/g, '');
  const originalPrice =
    document
      .querySelector('#product-price > div > del')
      ?.textContent.replace(/[^\d]+/g, '') || salePrice;

  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _playercokr = () => {
  const name = document.querySelector('h3.hidden-xs').textContent;
  const brandKor = document.querySelector(
    '#detail > div.content > div.brand-intro.hidden-xs.mt-0 > div > p:nth-child(1) > a > span > span'
  ).textContent;
  const imageUrl = document
    .querySelector('meta[property="og:image"]')
    .getAttribute('content');
  const salePrice = document
    .querySelector('dl.price-with-sale > dd > span')
    .textContent.replace(/[^\d]+/g, '');
  const originalPrice =
    document
      .querySelector('#frmOrder > div > div.price-info > dl > dd > p')
      ?.textContent.replace(/[^\d]+/g, '') || salePrice;

  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

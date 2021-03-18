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
  const imageUrl = document
    .querySelector('meta[property="og:image"]')
    .getAttribute('content');
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
  const originalPrice = (
    document.querySelector('.pdp-price strike') ||
    document.querySelector('.pdp-price')
  ).textContent
    .split('/')[0]
    .replace(/[^\d]+/g, '');
  const salePrice = document
    .querySelector('.pdp-price__hilite')
    ?.textContent.replace(/[^\d]+/g, '');
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
  const name = document.querySelector('title').textContent;
  const brandKor =
    (document.getElementsByClassName(
      'StoreRowWithBookmark_name__rw46l'
    )[0] as HTMLSpanElement)?.innerText || '룩핀';
  const imageUrl = document
    .querySelector('meta[property="og:image"]')
    .getAttribute('content');
  const salePrice = document
    .querySelector('meta[property="og:description"]')
    .getAttribute('content')
    .replace(/[^\d]+/g, '');
  const originalPrice =
    document.querySelector('.ProductDetailDesktop_prevPrice__3Eb37')
      ?.textContent || salePrice;
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
  const brands = {
    CUSTOMELLOW: '커스텀멜로우',
    SERIES: '시리즈',
    COURONNE: '쿠론',
    'KOLON SPORT': '코오롱스포츠',
    HEAD: '헤드',
    'SUECOMMA BONNIE': '슈콤마보니',
  };

  const name = (document.querySelector('div.title') as HTMLDivElement)
    .textContent;
  const title = (document.querySelector('title') as HTMLTitleElement)
    .textContent;
  const brandEng = title.slice(title.indexOf('_') + 1).trim();
  const brandKor = brands[brandEng] || brandEng;

  const imageUrl = document
    .querySelector('meta[property="og:image"]')
    .getAttribute('content');
  const salePrice =
    document
      .querySelector('div.price strong')
      ?.textContent.replace(/[^\d]+/g, '') || '0';
  const originalPrice =
    document
      .querySelector('div.price del')
      ?.textContent.replace(/[^\d]+/g, '') ||
    '0' ||
    '0';
  return {
    name,
    brandKor,
    imageUrl,
    salePrice,
    originalPrice,
  };
};

export const _hiphopercom = () => {
  const name = (document.querySelector('#getItemName') as HTMLDivElement)
    .textContent;
  const brandKor = (document.querySelector('#getBrandName') as HTMLDivElement)
    .textContent;
  const imageUrl = document
    .querySelector('.thumbnails a > img')
    .getAttribute('src');
  const salePrice =
    document.querySelector('dd.price_txt > strong')?.textContent || '0';
  const originalPrice =
    document.querySelector('dd.dis_f.ai_c > del')?.textContent || '0';

  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _hyundaihmallcom = () => {
  const name = (document.querySelector(
    'h3.pdtTitle'
  ) as HTMLHeadingElement)?.textContent
    ?.replace(/\n/gi, '')
    .trim();
  const brandKor = '현대몰';
  const imageUrl = document
    .querySelector('meta[property="og:image"]')
    .getAttribute('content');
  const salePrice =
    document.querySelector('p.finalPrice.number.hasDC > strong')?.textContent ||
    '0';
  const originalPrice =
    document.querySelector('div.priceCont strong')?.textContent || '0';

  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _ssensecom = () => {
  const brands = {
    'A.P.C.': '아페쎄',
    'Alexander McQueen': '알렉산더 맥퀸',
    'Acne Studios': '아크네 스튜디오',
    'ADER error': '아더에러',
    'adidas Originals': '아디다스 오리지널스',
    Balenciaga: '발렌시아가',
    Balmain: '발망',
    Burberry: '버버리',
    'Calvin Klein Underwear': '캘빈클라인 언더웨어',
    'Carhartt Work In Progress': '칼하트WIP',
    'Coach 1941': '코치',
    Converse: '컨버스',
    'Dolce & Gabbana': '돌체앤가바나',
    'Dr. Martens': '닥터마틴',
    Fendi: '펜디',
    Givenchy: '지방시',
    Gucci: '구찌',
    Kenzo: '겐조',
    Ksubi: '수비',
    Lacoste: '라코스테',
    "Levi's": '리바이스',
    'Maison Kitsuné': '메종 키츠네',
    'Maison Margiela': '메종 마르지엘라',
    MCQ: '멕큐',
    'New Balance': '뉴발란스',
    Nike: '나이키',
    'Paul Smith': '폴스미스',
    'Raf Simons': '라프 시몬스',
    'Reebok Classics': '리복 클래식',
    'Saint Laurent': '입생로랑',
    Valentino: '발렌티노',
    Vans: '반스',
    Versace: '베르사체',
  };

  const name = document
    .querySelector('meta[name="twitter:title"]')
    .getAttribute('content')
    .split('-')[1]
    .trim();
  const brandEng = document
    .querySelector('meta[name="twitter:data2"]')
    .getAttribute('content');
  const brandKor = brands[brandEng] || brandEng;
  const imageUrl = document
    .querySelector('img.product-detail')
    .getAttribute('data-srcset');
  const salePrice = document
    .querySelector('meta[name="twitter:data1"]')
    .getAttribute('content')
    .replace(/[^\d]+/g, '');
  const originalPrice =
    document
      .querySelector('h2.pdp-product-title__price--sale-amount-tag')
      ?.textContent.replace(/[^\d]+/g, '') || salePrice;

  return {
    name,
    brandKor,
    imageUrl,
    salePrice,
    originalPrice,
  };
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
  const name = document.querySelector('#detail div.heading-title h3')
    .textContent;
  const brandKor = document.querySelector('div.brand-intro span span')
    .textContent;
  const imageUrl = document
    .querySelector('meta[property="og:image"]')
    .getAttribute('content');
  const salePrice = document
    .querySelector('dl.price-with-sale span')
    .textContent.replace(/[^\d]+/g, '');
  const originalPrice =
    document
      .querySelector('div.price-info dd > p')
      ?.textContent.replace(/[^\d]+/g, '') || salePrice;

  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _coupangcom = () => {
  const name = document
    .querySelector('meta[property="og:title"]')
    .getAttribute('content');
  const brandKor = document
    .querySelector('a.prod-brand-name')
    .getAttribute('data-brand-name');

  const imageUrl = document
    .querySelector('meta[property="og:image"]')
    .getAttribute('content');
  const originalPrice = document.querySelector('span.origin-price').textContent;
  const salePrice = document.querySelector('span.total-price > strong')
    .textContent;

  return {
    name,
    brandKor: brandKor || '쿠팡',
    imageUrl,
    salePrice,
    originalPrice,
  };
};

export const _onthespotcokr = () => {
  const name = document.querySelector('div.prod-name').textContent;
  const brandKor = document.querySelector('a.btn-brand').textContent;

  const imageUrl = document
    .querySelector('meta[property="og:image"]')
    .getAttribute('content');

  const salePrice = document.querySelector('span.price-cost').textContent;

  const originalPrice = document.querySelector(
    'span[data-product="normal-price-amount"]'
  ).textContent;

  return {
    name,
    brandKor,
    imageUrl,
    salePrice,
    originalPrice,
  };
};

export const _musinsaapppagelink = () => {
  const name = document
    .querySelector('h2.prd-title')
    ?.textContent.replace(/\n/gi, '')
    .trim();
  const brandKor = document
    .querySelector('meta[property="product:brand"]')
    .getAttribute('content');
  const imageUrl = document
    .querySelector('meta[property="og:image"]')
    .getAttribute('content');
  const salePrice = document
    .querySelector('meta[property="product:price:amount"]')
    .getAttribute('content');
  const originalPrice = document
    .querySelector('meta[property="product:price:normal_price"]')
    .getAttribute('content');

  return {
    name,
    brandKor,
    imageUrl,
    salePrice,
    originalPrice,
  };
};

export const _shopdescentekoreacokr = () => {
  const name = document
    .querySelector('meta[property="recopick:title"]')
    .getAttribute('content');
  const brandKor = document.querySelector('div.goods-info_title--brand')
    .textContent;
  const imageUrl = document
    .querySelector('meta[property="recopick:image"]')
    .getAttribute('content');
  const originalPrice = document
    .querySelector('meta[property="recopick:price"]')
    .getAttribute('content');
  const salePrice = document
    .querySelector('meta[property="recopick:sale_price"]')
    .getAttribute('content');

  return {
    name,
    brandKor,
    imageUrl,
    salePrice,
    originalPrice,
  };
};

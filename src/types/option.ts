export type OptionCrawlResult = {
  values: { [name: string]: string[] };
  isSoldOut: number[][];
  itemIsSoldOut?: boolean;
  optionPriceVariants: priceVariant[];
  productPriceVariants: priceVariant[];
};

export type priceVariant = {
  option: number[];
  price: number;
};

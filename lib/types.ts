export type ItemKey = "chai" | "coffee" | "meal" | "bread" | "transit" | "cinema";

export type Region = "Asia" | "Middle East" | "Africa" | "Europe" | "Americas" | "Oceania";

export interface Country {
  code: string; // ISO 3166-1 alpha-2, lowercase
  name: string;
  city: string;
  region: Region | string;
  currency: string; // ISO 4217
  symbol: string;
  tea: string; // local name for the everyday cup of tea
  meal: string; // a typical everyday meal
  prices: Record<ItemKey, number>; // in local currency
  wage: number | null; // minimum wage per hour, local currency
}

/** "home" = in the visitor's currency, "usd" = US dollars, "work" = minutes of minimum-wage work */
export type Measure = "home" | "usd" | "work";

export interface Rates {
  rates: Record<string, number>; // units of currency per 1 USD
  updated: string | null;
  live: boolean;
}

import type { Country, ItemKey } from "./types";

export interface Item {
  key: ItemKey;
  label: string;
  /** Short noun for headlines: "a cup of chai" */
  phrase: string;
  /** Name shown for a specific country (e.g. its local tea or meal). */
  localName: (c: Country) => string;
}

export const ITEMS: Item[] = [
  { key: "chai", label: "Chai", phrase: "a cup of chai", localName: (c) => c.tea },
  { key: "coffee", label: "Coffee", phrase: "a cappuccino", localName: () => "Cappuccino" },
  { key: "meal", label: "Meal", phrase: "a simple meal", localName: (c) => c.meal },
  { key: "bread", label: "Bread", phrase: "a loaf of bread", localName: () => "Loaf of bread" },
  { key: "transit", label: "Bus ride", phrase: "a bus ride", localName: () => "One-way ticket" },
  { key: "cinema", label: "Cinema", phrase: "a movie ticket", localName: () => "Cinema ticket" },
];

export const itemByKey = (k: ItemKey) => ITEMS.find((i) => i.key === k)!;

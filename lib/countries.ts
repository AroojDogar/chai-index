// Typical local prices (in each country's own currency) for a simple everyday basket.
// These are indicative estimates compiled for this project, not official statistics.
// Prices vary a lot by city and venue — edit any value here and the whole site updates.
// wage = national minimum wage per hour in local currency (null = no national minimum wage).

import type { Country } from "./types";

export const COUNTRIES: Country[] = [
  {
    "code": "pk",
    "name": "Pakistan",
    "city": "Lahore",
    "region": "Asia",
    "currency": "PKR",
    "symbol": "Rs",
    "tea": "Doodh patti",
    "meal": "Chicken biryani",
    "prices": {
      "chai": 90,
      "coffee": 695,
      "meal": 610,
      "bread": 165,
      "transit": 42,
      "cinema": 970
    },
    "wage": 175
  },
  {
    "code": "in",
    "name": "India",
    "city": "Mumbai",
    "region": "Asia",
    "currency": "INR",
    "symbol": "₹",
    "tea": "Masala chai",
    "meal": "Thali",
    "prices": {
      "chai": 16.5,
      "coffee": 250,
      "meal": 220,
      "bread": 60,
      "transit": 34,
      "cinema": 335
    },
    "wage": 55
  },
  {
    "code": "bd",
    "name": "Bangladesh",
    "city": "Dhaka",
    "region": "Asia",
    "currency": "BDT",
    "symbol": "৳",
    "tea": "Cha",
    "meal": "Kacchi biryani",
    "prices": {
      "chai": 15.0,
      "coffee": 270,
      "meal": 245,
      "bread": 75,
      "transit": 31,
      "cinema": 405
    },
    "wage": 60
  },
  {
    "code": "lk",
    "name": "Sri Lanka",
    "city": "Colombo",
    "region": "Asia",
    "currency": "LKR",
    "symbol": "Rs",
    "tea": "Kiri tea",
    "meal": "Rice & curry",
    "prices": {
      "chai": 100,
      "coffee": 725,
      "meal": 660,
      "bread": 165,
      "transit": 100,
      "cinema": 1300
    },
    "wage": 105
  },
  {
    "code": "np",
    "name": "Nepal",
    "city": "Kathmandu",
    "region": "Asia",
    "currency": "NPR",
    "symbol": "Rs",
    "tea": "Chiya",
    "meal": "Dal bhat",
    "prices": {
      "chai": 39,
      "coffee": 310,
      "meal": 340,
      "bread": 125,
      "transit": 39,
      "cinema": 465
    },
    "wage": 95
  },
  {
    "code": "cn",
    "name": "China",
    "city": "Beijing",
    "region": "Asia",
    "currency": "CNY",
    "symbol": "¥",
    "tea": "Green tea",
    "meal": "Beef noodles",
    "prices": {
      "chai": 13.5,
      "coffee": 27,
      "meal": 30,
      "bread": 10.5,
      "transit": 3.35,
      "cinema": 47
    },
    "wage": 23
  },
  {
    "code": "jp",
    "name": "Japan",
    "city": "Tokyo",
    "region": "Asia",
    "currency": "JPY",
    "symbol": "¥",
    "tea": "Sencha",
    "meal": "Ramen",
    "prices": {
      "chai": 555,
      "coffee": 630,
      "meal": 1000,
      "bread": 255,
      "transit": 190,
      "cinema": 2100
    },
    "wage": 1200
  },
  {
    "code": "kr",
    "name": "South Korea",
    "city": "Seoul",
    "region": "Asia",
    "currency": "KRW",
    "symbol": "₩",
    "tea": "Yuja tea",
    "meal": "Bibimbap",
    "prices": {
      "chai": 5400,
      "coffee": 6000,
      "meal": 9400,
      "bread": 3800,
      "transit": 1300,
      "cinema": 14000
    },
    "wage": 9900
  },
  {
    "code": "id",
    "name": "Indonesia",
    "city": "Jakarta",
    "region": "Asia",
    "currency": "IDR",
    "symbol": "Rp",
    "tea": "Teh manis",
    "meal": "Nasi goreng",
    "prices": {
      "chai": 8900,
      "coffee": 43000,
      "meal": 39000,
      "bread": 21000,
      "transit": 3800,
      "cinema": 54000
    },
    "wage": 34000
  },
  {
    "code": "my",
    "name": "Malaysia",
    "city": "Kuala Lumpur",
    "region": "Asia",
    "currency": "MYR",
    "symbol": "RM",
    "tea": "Teh tarik",
    "meal": "Nasi lemak",
    "prices": {
      "chai": 2.5,
      "coffee": 12.5,
      "meal": 12.0,
      "bread": 4.2,
      "transit": 2.5,
      "cinema": 19.0
    },
    "wage": 9.65
  },
  {
    "code": "th",
    "name": "Thailand",
    "city": "Bangkok",
    "region": "Asia",
    "currency": "THB",
    "symbol": "฿",
    "tea": "Cha yen",
    "meal": "Pad thai",
    "prices": {
      "chai": 32,
      "coffee": 70,
      "meal": 65,
      "bread": 45,
      "transit": 32,
      "cinema": 190
    },
    "wage": 48
  },
  {
    "code": "vn",
    "name": "Vietnam",
    "city": "Ho Chi Minh City",
    "region": "Asia",
    "currency": "VND",
    "symbol": "₫",
    "tea": "Trà đá",
    "meal": "Phở",
    "prices": {
      "chai": 10000,
      "coffee": 47000,
      "meal": 52000,
      "bread": 31000,
      "transit": 7800,
      "cinema": 91000
    },
    "wage": 25000
  },
  {
    "code": "ph",
    "name": "Philippines",
    "city": "Manila",
    "region": "Asia",
    "currency": "PHP",
    "symbol": "₱",
    "tea": "Milk tea",
    "meal": "Chicken adobo",
    "prices": {
      "chai": 85,
      "coffee": 160,
      "meal": 170,
      "bread": 70,
      "transit": 14.0,
      "cinema": 285
    },
    "wage": 85
  },
  {
    "code": "sg",
    "name": "Singapore",
    "city": "Singapore",
    "region": "Asia",
    "currency": "SGD",
    "symbol": "S$",
    "tea": "Teh C",
    "meal": "Chicken rice",
    "prices": {
      "chai": 1.55,
      "coffee": 5.95,
      "meal": 5.8,
      "bread": 2.95,
      "transit": 1.7,
      "cinema": 14.0
    },
    "wage": null
  },
  {
    "code": "kz",
    "name": "Kazakhstan",
    "city": "Almaty",
    "region": "Asia",
    "currency": "KZT",
    "symbol": "₸",
    "tea": "Kazakh milk tea",
    "meal": "Beshbarmak",
    "prices": {
      "chai": 550,
      "coffee": 1400,
      "meal": 3200,
      "bread": 275,
      "transit": 160,
      "cinema": 2300
    },
    "wage": 430
  },
  {
    "code": "au",
    "name": "Australia",
    "city": "Sydney",
    "region": "Oceania",
    "currency": "AUD",
    "symbol": "A$",
    "tea": "English breakfast",
    "meal": "Meat pie & chips",
    "prices": {
      "chai": 4.75,
      "coffee": 4.9,
      "meal": 23,
      "bread": 3.45,
      "transit": 4.3,
      "cinema": 22
    },
    "wage": 23
  },
  {
    "code": "nz",
    "name": "New Zealand",
    "city": "Auckland",
    "region": "Oceania",
    "currency": "NZD",
    "symbol": "NZ$",
    "tea": "Tea",
    "meal": "Fish & chips",
    "prices": {
      "chai": 5.05,
      "coffee": 5.7,
      "meal": 24,
      "bread": 3.35,
      "transit": 4.2,
      "cinema": 20
    },
    "wage": 23
  },
  {
    "code": "ae",
    "name": "UAE",
    "city": "Dubai",
    "region": "Middle East",
    "currency": "AED",
    "symbol": "AED",
    "tea": "Karak chai",
    "meal": "Shawarma meal",
    "prices": {
      "chai": 2.0,
      "coffee": 18.5,
      "meal": 26,
      "bread": 5.9,
      "transit": 5.15,
      "cinema": 44
    },
    "wage": null
  },
  {
    "code": "sa",
    "name": "Saudi Arabia",
    "city": "Riyadh",
    "region": "Middle East",
    "currency": "SAR",
    "symbol": "SAR",
    "tea": "Karak chai",
    "meal": "Kabsa",
    "prices": {
      "chai": 3.0,
      "coffee": 17.0,
      "meal": 26,
      "bread": 3.75,
      "transit": 4.1,
      "cinema": 49
    },
    "wage": null
  },
  {
    "code": "qa",
    "name": "Qatar",
    "city": "Doha",
    "region": "Middle East",
    "currency": "QAR",
    "symbol": "QAR",
    "tea": "Karak chai",
    "meal": "Machboos",
    "prices": {
      "chai": 1.8,
      "coffee": 17.5,
      "meal": 29,
      "bread": 5.1,
      "transit": 2.9,
      "cinema": 40
    },
    "wage": 8.75
  },
  {
    "code": "tr",
    "name": "Türkiye",
    "city": "Istanbul",
    "region": "Middle East",
    "currency": "TRY",
    "symbol": "₺",
    "tea": "Çay",
    "meal": "Döner",
    "prices": {
      "chai": 25,
      "coffee": 170,
      "meal": 295,
      "bread": 19.5,
      "transit": 39,
      "cinema": 295
    },
    "wage": 120
  },
  {
    "code": "jo",
    "name": "Jordan",
    "city": "Amman",
    "region": "Middle East",
    "currency": "JOD",
    "symbol": "JD",
    "tea": "Shai bil na'na'",
    "meal": "Falafel plate",
    "prices": {
      "chai": 0.5,
      "coffee": 2.5,
      "meal": 2.15,
      "bread": 0.45,
      "transit": 0.5,
      "cinema": 6.4
    },
    "wage": 1.4
  },
  {
    "code": "eg",
    "name": "Egypt",
    "city": "Cairo",
    "region": "Africa",
    "currency": "EGP",
    "symbol": "E£",
    "tea": "Shai",
    "meal": "Koshari",
    "prices": {
      "chai": 13.0,
      "coffee": 105,
      "meal": 85,
      "bread": 15.5,
      "transit": 10.5,
      "cinema": 185
    },
    "wage": 37
  },
  {
    "code": "ma",
    "name": "Morocco",
    "city": "Casablanca",
    "region": "Africa",
    "currency": "MAD",
    "symbol": "MAD",
    "tea": "Mint tea",
    "meal": "Tagine",
    "prices": {
      "chai": 8.1,
      "coffee": 14.5,
      "meal": 45,
      "bread": 2.7,
      "transit": 7.65,
      "cinema": 55
    },
    "wage": 17.0
  },
  {
    "code": "ng",
    "name": "Nigeria",
    "city": "Lagos",
    "region": "Africa",
    "currency": "NGN",
    "symbol": "₦",
    "tea": "Tea",
    "meal": "Jollof rice",
    "prices": {
      "chai": 800,
      "coffee": 4000,
      "meal": 4000,
      "bread": 1700,
      "transit": 530,
      "cinema": 5300
    },
    "wage": 360
  },
  {
    "code": "gh",
    "name": "Ghana",
    "city": "Accra",
    "region": "Africa",
    "currency": "GHS",
    "symbol": "GH₵",
    "tea": "Tea",
    "meal": "Waakye",
    "prices": {
      "chai": 7.05,
      "coffee": 35,
      "meal": 41,
      "bread": 14.0,
      "transit": 4.7,
      "cinema": 60
    },
    "wage": 2.7
  },
  {
    "code": "ke",
    "name": "Kenya",
    "city": "Nairobi",
    "region": "Africa",
    "currency": "KES",
    "symbol": "KSh",
    "tea": "Chai",
    "meal": "Nyama choma",
    "prices": {
      "chai": 50,
      "coffee": 335,
      "meal": 390,
      "bread": 80,
      "transit": 80,
      "cinema": 650
    },
    "wage": 65
  },
  {
    "code": "et",
    "name": "Ethiopia",
    "city": "Addis Ababa",
    "region": "Africa",
    "currency": "ETB",
    "symbol": "Br",
    "tea": "Shai",
    "meal": "Injera & tibs",
    "prices": {
      "chai": 24,
      "coffee": 65,
      "meal": 325,
      "bread": 95,
      "transit": 24,
      "cinema": 325
    },
    "wage": null
  },
  {
    "code": "za",
    "name": "South Africa",
    "city": "Johannesburg",
    "region": "Africa",
    "currency": "ZAR",
    "symbol": "R",
    "tea": "Rooibos",
    "meal": "Bunny chow",
    "prices": {
      "chai": 27,
      "coffee": 32,
      "meal": 150,
      "bread": 16.5,
      "transit": 20.0,
      "cinema": 85
    },
    "wage": 27
  },
  {
    "code": "gb",
    "name": "United Kingdom",
    "city": "London",
    "region": "Europe",
    "currency": "GBP",
    "symbol": "£",
    "tea": "Builder's tea",
    "meal": "Fish & chips",
    "prices": {
      "chai": 2.25,
      "coffee": 3.5,
      "meal": 13.5,
      "bread": 1.3,
      "transit": 2.4,
      "cinema": 11.5
    },
    "wage": 13.0
  },
  {
    "code": "ie",
    "name": "Ireland",
    "city": "Dublin",
    "region": "Europe",
    "currency": "EUR",
    "symbol": "€",
    "tea": "Breakfast tea",
    "meal": "Irish stew",
    "prices": {
      "chai": 2.7,
      "coffee": 4.0,
      "meal": 18.0,
      "bread": 1.8,
      "transit": 2.25,
      "cinema": 11.5
    },
    "wage": 14.5
  },
  {
    "code": "fr",
    "name": "France",
    "city": "Paris",
    "region": "Europe",
    "currency": "EUR",
    "symbol": "€",
    "tea": "Thé",
    "meal": "Croque-monsieur",
    "prices": {
      "chai": 3.4,
      "coffee": 3.9,
      "meal": 15.0,
      "bread": 1.15,
      "transit": 2.15,
      "cinema": 11.5
    },
    "wage": 12.5
  },
  {
    "code": "de",
    "name": "Germany",
    "city": "Berlin",
    "region": "Europe",
    "currency": "EUR",
    "symbol": "€",
    "tea": "Tee",
    "meal": "Schnitzel",
    "prices": {
      "chai": 2.95,
      "coffee": 3.55,
      "meal": 14.5,
      "bread": 1.95,
      "transit": 3.3,
      "cinema": 11.5
    },
    "wage": 14.5
  },
  {
    "code": "nl",
    "name": "Netherlands",
    "city": "Amsterdam",
    "region": "Europe",
    "currency": "EUR",
    "symbol": "€",
    "tea": "Verse munt",
    "meal": "Stamppot",
    "prices": {
      "chai": 3.05,
      "coffee": 3.55,
      "meal": 16.0,
      "bread": 1.6,
      "transit": 3.4,
      "cinema": 13.5
    },
    "wage": 15.0
  },
  {
    "code": "es",
    "name": "Spain",
    "city": "Madrid",
    "region": "Europe",
    "currency": "EUR",
    "symbol": "€",
    "tea": "Té",
    "meal": "Paella",
    "prices": {
      "chai": 1.95,
      "coffee": 2.15,
      "meal": 13.5,
      "bread": 1.25,
      "transit": 1.6,
      "cinema": 8.9
    },
    "wage": 9.2
  },
  {
    "code": "it",
    "name": "Italy",
    "city": "Rome",
    "region": "Europe",
    "currency": "EUR",
    "symbol": "€",
    "tea": "Tè",
    "meal": "Pizza margherita",
    "prices": {
      "chai": 1.95,
      "coffee": 1.6,
      "meal": 8.9,
      "bread": 1.7,
      "transit": 1.8,
      "cinema": 8.9
    },
    "wage": null
  },
  {
    "code": "pt",
    "name": "Portugal",
    "city": "Lisbon",
    "region": "Europe",
    "currency": "EUR",
    "symbol": "€",
    "tea": "Chá",
    "meal": "Bacalhau",
    "prices": {
      "chai": 1.45,
      "coffee": 1.6,
      "meal": 9.8,
      "bread": 1.25,
      "transit": 1.8,
      "cinema": 7.6
    },
    "wage": 6.05
  },
  {
    "code": "gr",
    "name": "Greece",
    "city": "Athens",
    "region": "Europe",
    "currency": "EUR",
    "symbol": "€",
    "tea": "Mountain tea",
    "meal": "Souvlaki",
    "prices": {
      "chai": 2.25,
      "coffee": 3.4,
      "meal": 10.5,
      "bread": 1.05,
      "transit": 1.25,
      "cinema": 8.9
    },
    "wage": 6.15
  },
  {
    "code": "ch",
    "name": "Switzerland",
    "city": "Zurich",
    "region": "Europe",
    "currency": "CHF",
    "symbol": "CHF",
    "tea": "Tee",
    "meal": "Rösti",
    "prices": {
      "chai": 4.55,
      "coffee": 5.0,
      "meal": 25,
      "bread": 2.85,
      "transit": 3.5,
      "cinema": 19.0
    },
    "wage": null
  },
  {
    "code": "se",
    "name": "Sweden",
    "city": "Stockholm",
    "region": "Europe",
    "currency": "SEK",
    "symbol": "kr",
    "tea": "Te",
    "meal": "Köttbullar",
    "prices": {
      "chai": 33,
      "coffee": 41,
      "meal": 140,
      "bread": 26,
      "transit": 38,
      "cinema": 140
    },
    "wage": null
  },
  {
    "code": "no",
    "name": "Norway",
    "city": "Oslo",
    "region": "Europe",
    "currency": "NOK",
    "symbol": "kr",
    "tea": "Te",
    "meal": "Fiskesuppe",
    "prices": {
      "chai": 45,
      "coffee": 50,
      "meal": 220,
      "bread": 35,
      "transit": 46,
      "cinema": 160
    },
    "wage": null
  },
  {
    "code": "dk",
    "name": "Denmark",
    "city": "Copenhagen",
    "region": "Europe",
    "currency": "DKK",
    "symbol": "kr",
    "tea": "Te",
    "meal": "Smørrebrød",
    "prices": {
      "chai": 30,
      "coffee": 35,
      "meal": 125,
      "bread": 20.0,
      "transit": 25,
      "cinema": 105
    },
    "wage": null
  },
  {
    "code": "pl",
    "name": "Poland",
    "city": "Warsaw",
    "region": "Europe",
    "currency": "PLN",
    "symbol": "zł",
    "tea": "Herbata",
    "meal": "Pierogi",
    "prices": {
      "chai": 9.9,
      "coffee": 13.5,
      "meal": 34,
      "bread": 4.95,
      "transit": 4.55,
      "cinema": 30
    },
    "wage": 32
  },
  {
    "code": "us",
    "name": "United States",
    "city": "New York",
    "region": "Americas",
    "currency": "USD",
    "symbol": "$",
    "tea": "Chai latte",
    "meal": "Burger & fries",
    "prices": {
      "chai": 3.5,
      "coffee": 5.2,
      "meal": 20,
      "bread": 3.6,
      "transit": 2.9,
      "cinema": 15.0
    },
    "wage": 7.25
  },
  {
    "code": "ca",
    "name": "Canada",
    "city": "Toronto",
    "region": "Americas",
    "currency": "CAD",
    "symbol": "C$",
    "tea": "Tea",
    "meal": "Poutine",
    "prices": {
      "chai": 3.6,
      "coffee": 5.5,
      "meal": 25,
      "bread": 4.15,
      "transit": 3.45,
      "cinema": 18.0
    },
    "wage": 17.5
  },
  {
    "code": "mx",
    "name": "Mexico",
    "city": "Mexico City",
    "region": "Americas",
    "currency": "MXN",
    "symbol": "MX$",
    "tea": "Té",
    "meal": "Tacos al pastor",
    "prices": {
      "chai": 29,
      "coffee": 60,
      "meal": 125,
      "bread": 40,
      "transit": 5.45,
      "cinema": 80
    },
    "wage": 38
  },
  {
    "code": "br",
    "name": "Brazil",
    "city": "São Paulo",
    "region": "Americas",
    "currency": "BRL",
    "symbol": "R$",
    "tea": "Chá mate",
    "meal": "Feijoada",
    "prices": {
      "chai": 8.05,
      "coffee": 12.0,
      "meal": 33,
      "bread": 9.05,
      "transit": 4.75,
      "cinema": 30
    },
    "wage": 6.45
  },
  {
    "code": "co",
    "name": "Colombia",
    "city": "Bogotá",
    "region": "Americas",
    "currency": "COP",
    "symbol": "COL$",
    "tea": "Aromática",
    "meal": "Bandeja paisa",
    "prices": {
      "chai": 3900,
      "coffee": 6600,
      "meal": 16000,
      "bread": 4300,
      "transit": 2500,
      "cinema": 15000
    },
    "wage": 5500
  },
  {
    "code": "pe",
    "name": "Peru",
    "city": "Lima",
    "region": "Americas",
    "currency": "PEN",
    "symbol": "S/",
    "tea": "Té",
    "meal": "Ceviche",
    "prices": {
      "chai": 4.15,
      "coffee": 8.95,
      "meal": 21,
      "bread": 5.2,
      "transit": 1.7,
      "cinema": 17.0
    },
    "wage": 5.35
  },
  {
    "code": "cl",
    "name": "Chile",
    "city": "Santiago",
    "region": "Americas",
    "currency": "CLP",
    "symbol": "CLP$",
    "tea": "Té",
    "meal": "Empanadas",
    "prices": {
      "chai": 2200,
      "coffee": 3400,
      "meal": 8900,
      "bread": 1900,
      "transit": 940,
      "cinema": 6900
    },
    "wage": 3100
  }
];

/** Fallback USD exchange rates (Oct 2026), used only if the live rates API is unreachable. */
export const FALLBACK_RATES: Record<string, number> = {
  "PKR": 277.1,
  "INR": 96.38,
  "BDT": 123.14,
  "LKR": 330.44,
  "NPR": 154.19,
  "CNY": 6.71,
  "JPY": 157.98,
  "KRW": 1342.77,
  "IDR": 17892.58,
  "MYR": 4.2,
  "THB": 32.0,
  "VND": 25966.23,
  "PHP": 57.0,
  "SGD": 1.29,
  "AUD": 1.44,
  "NZD": 1.68,
  "AED": 3.6725,
  "SAR": 3.75,
  "QAR": 3.64,
  "TRY": 49.16,
  "EGP": 52.43,
  "MAD": 9.0,
  "NGN": 1330.99,
  "KES": 129.75,
  "ZAR": 16.65,
  "ETB": 161.34,
  "GHS": 11.75,
  "GBP": 0.756,
  "EUR": 0.892,
  "CHF": 0.831,
  "SEK": 9.4,
  "NOK": 10.0,
  "DKK": 6.65,
  "PLN": 3.8,
  "JOD": 0.709,
  "KZT": 456.3,
  "USD": 1.0,
  "CAD": 1.38,
  "MXN": 18.11,
  "BRL": 5.02,
  "CLP": 988.73,
  "COP": 3286.0,
  "PEN": 3.45
};

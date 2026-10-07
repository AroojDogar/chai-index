import { FALLBACK_RATES } from "./countries";
import type { Rates } from "./types";

// Free, key-less daily exchange rates (ExchangeRate-API open access endpoint).
const RATES_URL = "https://open.er-api.com/v6/latest/USD";

export const FALLBACK: Rates = { rates: FALLBACK_RATES, updated: null, live: false };

export async function fetchRates(signal?: AbortSignal): Promise<Rates> {
  const res = await fetch(RATES_URL, { signal });
  if (!res.ok) throw new Error(`Rates request failed (${res.status})`);
  const data = (await res.json()) as {
    result: string;
    rates?: Record<string, number>;
    time_last_update_utc?: string;
  };
  if (data.result !== "success" || !data.rates) throw new Error("Rates unavailable");
  // Keep fallback values for any currency the API doesn't return.
  return { rates: { ...FALLBACK_RATES, ...data.rates }, updated: data.time_last_update_utc ?? null, live: true };
}

"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import Hero from "@/components/Hero";
import RateTicker from "@/components/RateTicker";
import Ranking from "@/components/Ranking";
import FaceOff from "@/components/FaceOff";
import Teleporter from "@/components/Teleporter";
import Reveal from "@/components/Reveal";
import { COUNTRIES } from "@/lib/countries";
import { FALLBACK, fetchRates } from "@/lib/rates";
import type { Country, ItemKey, Measure, Rates } from "@/lib/types";

const byCode = (code: string | null) => COUNTRIES.find((c) => c.code === code?.toLowerCase());
const DEFAULT_HOME = byCode("pk")!;

function otherDefault(home: Country, preferred: string[]) {
  return byCode(preferred.find((p) => p !== home.code) ?? "gb")!;
}

export default function Home() {
  const [home, setHomeState] = useState<Country>(DEFAULT_HOME);
  const [item, setItem] = useState<ItemKey>("chai");
  const [measure, setMeasure] = useState<Measure>("home");
  const [rates, setRates] = useState<Rates>(FALLBACK);
  const [rateState, setRateState] = useState<"loading" | "live" | "offline">("loading");
  const [b, setB] = useState<Country>(otherDefault(DEFAULT_HOME, ["gb", "us"]));
  const [a, setA] = useState<Country>(DEFAULT_HOME);
  const [target, setTarget] = useState<Country>(otherDefault(DEFAULT_HOME, ["de", "gb"]));

  // Restore from a shared link: ?home=pk&item=chai
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const h = byCode(p.get("home"));
    const it = p.get("item") as ItemKey | null;
    if (h) setHome(h);
    if (it && ["chai", "coffee", "meal", "bread", "transit", "cinema"].includes(it)) setItem(it);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const q = new URLSearchParams({ home: home.code, item });
    window.history.replaceState(null, "", `?${q}`);
  }, [home, item]);

  // Live exchange rates (refreshed hourly while the page is open)
  useEffect(() => {
    const ctrl = new AbortController();
    const load = () =>
      fetchRates(ctrl.signal)
        .then((r) => {
          setRates(r);
          setRateState("live");
        })
        .catch((e) => e?.name !== "AbortError" && setRateState("offline"));
    load();
    const id = setInterval(load, 60 * 60_000);
    return () => {
      ctrl.abort();
      clearInterval(id);
    };
  }, []);

  function setHome(c: Country) {
    setHomeState(c);
    setA(c);
    setB((prev) => (prev.code === c.code ? otherDefault(c, ["gb", "us"]) : prev));
    setTarget((prev) => (prev.code === c.code ? otherDefault(c, ["de", "gb"]) : prev));
  }

  const updated = rates.updated ? new Date(rates.updated) : null;

  return (
    <>
      <header className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-4 py-5 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm text-ink-2 md:flex" aria-label="Sections">
          <a href="#index" className="hover:text-ink">The index</a>
          <a href="#faceoff" className="hover:text-ink">Face-off</a>
          <a href="#teleport" className="hover:text-ink">Salary teleporter</a>
          <a href="#method" className="hover:text-ink">Method</a>
        </nav>
        <span className="flex items-center gap-2 rounded-full border border-line bg-cream/70 px-3 py-1.5 font-mono text-[11px] text-ink-2"
          title={updated ? `Rates updated ${updated.toUTCString()}` : "Using built-in rates"}>
          <span className={`h-2 w-2 rounded-full ${rateState === "live" ? "bg-cardamom" : rateState === "loading" ? "animate-pulse bg-saffron" : "bg-dust"}`} />
          {rateState === "live" ? "Live rates" : rateState === "loading" ? "Fetching rates" : "Offline rates"}
        </span>
      </header>

      <RateTicker home={home} rates={rates} />

      <main className="mx-auto max-w-[1240px] space-y-20 px-4 pb-20 sm:px-8 lg:space-y-28">
        <Hero home={home} onHome={setHome} item={item} onItem={setItem} rates={rates} />

        <Reveal>
          <Ranking home={home} item={item} onItem={setItem} measure={measure} onMeasure={setMeasure} rates={rates} />
        </Reveal>

        <Reveal>
          <FaceOff a={a} b={b} onA={setA} onB={setB} rates={rates} />
        </Reveal>

        <Reveal>
          <Teleporter home={home} target={target} onTarget={setTarget} rates={rates} />
        </Reveal>

        <Reveal as="section" id="method" className="grid gap-8 border-t border-line pt-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="label">Method &amp; honesty</p>
            <h2 className="display mt-2 text-4xl font-medium">How the numbers work</h2>
          </div>
          <div className="grid gap-5 text-[15px] leading-relaxed text-ink-2 sm:grid-cols-2">
            <p>
              <strong className="text-ink">Prices</strong> are typical everyday prices in one major city per country, in local
              currency — a street or café tea, a cappuccino, a simple local meal, a loaf of bread, a one-way public transport ticket
              and a cinema ticket. They are indicative estimates, not official statistics, and real prices vary by neighbourhood.
            </p>
            <p>
              <strong className="text-ink">Exchange rates</strong> update daily from a free public API{" "}
              {updated ? `(last update ${updated.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })})` : ""}.
              Because local prices stay put while currencies move, the converted prices shift as rates change.
            </p>
            <p>
              <strong className="text-ink">Minutes of work</strong> use each country&apos;s national minimum wage per hour. Countries
              without a national minimum wage (such as Singapore, the UAE or the Nordics) are listed separately.
            </p>
            <p>
              <strong className="text-ink">The salary teleporter</strong> is a simplified purchasing-power estimate based only on
              this basket. It leaves out rent, taxes and healthcare, so treat it as a fun starting point, not financial advice.
            </p>
          </div>
        </Reveal>
      </main>

      <footer className="border-t border-line bg-cream/50">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-4 py-8 text-sm text-ink-2 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Logo />
          <p>
            Designed &amp; built by{" "}
            <a href="https://github.com/AroojDogar" target="_blank" rel="noreferrer" className="text-ink underline decoration-saffron underline-offset-4">
              Arooj Dogar
            </a>{" "}
            · Rates by{" "}
            <a href="https://www.exchangerate-api.com" target="_blank" rel="noreferrer" className="underline underline-offset-4">ExchangeRate-API</a>
            {" "}· Flags by{" "}
            <a href="https://flagpedia.net" target="_blank" rel="noreferrer" className="underline underline-offset-4">Flagpedia</a>
          </p>
        </div>
      </footer>
    </>
  );
}

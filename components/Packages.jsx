"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import SectionHeader from "./SectionHeader";
import { packages } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1];
const aud = (n) => "$" + n.toLocaleString("en-AU");
const perWalk = (n) => "$" + n.toFixed(2);

export default function Packages() {
  const [duration, setDuration] = useState(packages.defaultDuration);
  const [dogs, setDogs] = useState("1");

  const rows = packages.matrix[dogs][duration];
  const durLabel = packages.durations.find((d) => d.id === duration).label;

  return (
    <section id="packages" className="section-pad relative overflow-hidden bg-forest">
      <div className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-gold/[0.06] blur-3xl" />

      <div className="container-luxe relative">
        <SectionHeader
          light
          eyebrow={packages.eyebrow}
          title={packages.title}
          sub={packages.sub}
          maxWidth="max-w-2xl"
        />

        {/* Controls */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col gap-8 border-y border-cream/12 py-8 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
            <div role="group" aria-label="Choose walk length">
              <p className="eyebrow mb-3">Walk length</p>
              <div className="flex flex-wrap gap-2">
                {packages.durations.map((d) => {
                  const active = duration === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDuration(d.id)}
                      aria-pressed={active}
                      className={`btn-base min-h-[44px] rounded-full border px-5 py-2 !tracking-[0.1em] transition-all duration-300 ${
                        active
                          ? "border-gold bg-gold text-forest"
                          : "border-cream/25 text-cream/70 hover:border-cream/60 hover:text-cream"
                      }`}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div role="group" aria-label="Number of dogs">
              <p className="eyebrow mb-3">Dogs</p>
              <div className="inline-flex rounded-full border border-cream/25 p-1">
                {[
                  ["1", "1 Dog"],
                  ["2", "2 Dogs"],
                ].map(([val, label]) => {
                  const active = dogs === val;
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setDogs(val)}
                      aria-pressed={active}
                      className={`btn-base min-h-[40px] rounded-full px-5 py-2 !tracking-[0.1em] transition-all duration-300 ${
                        active ? "bg-cream text-forest" : "text-cream/65 hover:text-cream"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        <p className="sr-only" aria-live="polite">
          Showing {durLabel} walk packages for {dogs === "2" ? "two dogs" : "one dog"}.
        </p>

        {/* Tier cards */}
        <div className="mt-10 grid items-start gap-6 lg:mt-14 lg:grid-cols-3 lg:gap-7">
          {packages.tiers.map((tier, i) => {
            const [price, save] = rows[i];
            const was = price + save;
            const pct = Math.round((save / was) * 100);
            const popular = tier.badge === "Most Popular";

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                className={`relative flex h-full flex-col rounded-[4px] border p-8 lg:p-9 ${
                  popular
                    ? "border-gold bg-cream text-forest shadow-gold lg:-mt-3 lg:mb-3"
                    : "border-cream/15 bg-cream/[0.04] text-cream"
                }`}
              >
                {popular && (
                  <span className="absolute -top-3 left-8 inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-forest">
                    <span aria-hidden="true">★</span> Most Popular
                  </span>
                )}

                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold">
                    {tier.name} Package
                  </h3>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 font-sans text-[11px] font-medium uppercase tracking-[0.12em] ${
                      popular ? "bg-forest/10 text-forest/70" : "bg-cream/10 text-cream/70"
                    }`}
                  >
                    {pct}% off
                  </span>
                </div>

                <p
                  className={`mt-1.5 font-sans text-[13px] font-light ${
                    popular ? "text-forest/60" : "text-cream/55"
                  }`}
                >
                  {tier.walks} walks &times; {durLabel}
                  {dogs === "2" ? " · 2 dogs" : ""}
                </p>

                <div className="mt-7 flex items-end gap-2.5">
                  <span className="font-display text-[2.75rem] font-semibold leading-none">
                    {aud(price)}
                  </span>
                  <span
                    className={`mb-1 font-sans text-sm line-through ${
                      popular ? "text-forest/40" : "text-cream/40"
                    }`}
                  >
                    {aud(was)}
                  </span>
                </div>

                <p
                  className={`mt-3 font-sans text-[13px] ${
                    popular ? "text-forest/70" : "text-cream/65"
                  }`}
                >
                  <span
                    className={`font-medium ${popular ? "text-forest" : "text-gold"}`}
                  >
                    Save {aud(save)}
                  </span>
                  <span className="mx-2 opacity-40">·</span>
                  {perWalk(price / tier.walks)} per walk
                </p>

                <ul className="mt-7 flex flex-1 flex-col gap-2.5">
                  {packages.includes.map((inc) => (
                    <li
                      key={inc}
                      className={`flex items-start gap-2.5 font-sans text-[14px] font-light ${
                        popular ? "text-forest/80" : "text-cream/80"
                      }`}
                    >
                      <span className="mt-0.5 text-gold" aria-hidden="true">
                        ✓
                      </span>
                      {inc}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`btn-base mt-8 rounded-full px-7 py-3.5 transition-transform hover:scale-[1.03] active:scale-95 ${
                    popular
                      ? "bg-forest text-cream hover:bg-forest-soft"
                      : "border border-cream/30 text-cream hover:border-gold hover:text-gold"
                  }`}
                  aria-label={`${packages.cta}: ${tier.name} package, ${tier.walks} walks of ${durLabel}${
                    dogs === "2" ? " for 2 dogs" : ""
                  }, ${aud(price)}`}
                >
                  {packages.cta}
                </a>
              </motion.div>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl font-sans text-[13px] font-light leading-relaxed text-cream/50">
            {packages.footnote}
          </p>
          <p className="mt-4 font-sans text-[14px] font-light text-cream/75">
            {packages.customLead}{" "}
            <a
              href="#contact"
              className="link-underline font-medium text-gold hover:text-gold-soft"
            >
              {packages.customCta}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { Reveal } from "./Reveal";
import { reviews, business } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1];

function Stars({ className = "" }) {
  return (
    <span className={`text-gold ${className}`} aria-label="Rated 5 out of 5 stars">
      <span aria-hidden="true">★★★★★</span>
    </span>
  );
}

export default function Reviews() {
  const featured = reviews.items.find((r) => r.featured);
  const rest = reviews.items.filter((r) => r !== featured);

  return (
    <section id="reviews" className="section-pad relative overflow-hidden bg-forest">
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-gold/[0.07] blur-3xl" />

      <div className="container-luxe relative">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <SectionHeader
            eyebrow={reviews.eyebrow}
            title={reviews.title}
            sub={reviews.sub}
            light
            maxWidth="max-w-xl"
          />

          <Reveal delay={0.1}>
            <div className="flex items-center gap-6 rounded-[4px] border border-cream/15 bg-cream/[0.04] p-7 backdrop-blur-sm lg:justify-self-end">
              <p className="font-display text-6xl font-semibold leading-none text-cream">
                {reviews.rating}
              </p>
              <div>
                <div className="text-lg tracking-[0.15em]">
                  <Stars />
                </div>
                <p className="mt-1.5 font-sans text-[13px] font-light text-cream/70">
                  {reviews.ratingMeta}
                </p>
                <p className="mt-1 font-sans text-[12px] font-light tracking-wide text-cream/45">
                  <span className="mr-1 font-semibold text-cream/80">G</span>
                  {reviews.ratingSource}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Featured pull-quote */}
        {featured && (
          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="mt-14 rounded-[4px] border border-gold/25 bg-cream/[0.05] p-8 sm:p-12 lg:mt-16"
          >
            <Stars className="text-base tracking-[0.2em]" />
            <blockquote className="mt-5 font-display text-xl font-normal italic leading-relaxed text-cream sm:text-2xl sm:leading-relaxed">
              &ldquo;{featured.text}&rdquo;
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-3 border-t border-cream/12 pt-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 font-display text-base font-semibold text-gold">
                {featured.name.charAt(0)}
              </span>
              <span>
                <span className="block font-display text-base font-semibold text-cream">
                  {featured.name}
                </span>
                <span className="block font-sans text-[12px] font-light tracking-wide text-cream/45">
                  {featured.when}
                </span>
              </span>
            </figcaption>
          </motion.figure>
        )}

        {/* Supporting reviews */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:mt-7 lg:grid-cols-3 lg:gap-7">
          {rest.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease, delay: (i % 3) * 0.07 }}
              className="flex h-full flex-col rounded-[4px] border border-cream/10 bg-cream/[0.03] p-7 transition-colors duration-500 hover:border-gold/30"
            >
              <Stars className="text-[13px] tracking-[0.18em]" />
              <blockquote className="mt-3 flex-1 font-sans text-[15px] font-light leading-relaxed text-cream/85">
                {r.text}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-cream/10 pt-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream/10 font-display text-sm font-semibold text-cream/80">
                  {r.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-display text-[15px] font-semibold text-cream">
                    {r.name}
                  </span>
                  <span className="block font-sans text-[12px] font-light tracking-wide text-cream/45">
                    {r.when}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex justify-center">
            <a
              href={business.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base rounded-full border border-cream/30 px-8 py-4 text-cream transition-all hover:scale-[1.03] hover:border-gold hover:text-gold active:scale-95"
            >
              {reviews.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

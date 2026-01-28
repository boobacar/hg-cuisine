import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  ChefHat,
  Plane,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell } from "../components/PageShell";
import { SectionHeading } from "../components/SectionHeading";
import { HomeGallery } from "../components/HomeGallery";
import { site } from "../data/site";

const featureCards = [
  {
    icon: ChefHat,
    title: "Private Dining",
    desc: "An intimate restaurant-quality experience at home—tailored menu, plating, and pacing.",
  },
  {
    icon: Sparkles,
    title: "Bespoke Catering",
    desc: "Refined bites, family-style spreads, or plated service—always elevated and consistent.",
  },
  {
    icon: CalendarDays,
    title: "Events & Celebrations",
    desc: "From milestone dinners to brand gatherings—smooth logistics and polished presentation.",
  },
] as const;

const testimonials = [
  {
    quote:
      "Every course felt intentional—beautiful flavors, flawless timing, and a calm presence in the kitchen.",
    name: "Private dinner host",
    tag: "Host",
    title: "Intimate tasting for 12",
  },
  {
    quote:
      "Our guests kept asking who catered. The food looked luxurious and tasted even better.",
    name: "Event coordinator",
    tag: "Planner",
    title: "Brand cocktail soirée",
  },
  {
    quote:
      "The menu was customized for dietary needs without sacrificing any elegance. Seamless from start to finish.",
    name: "Birthday celebration",
    tag: "Celebration",
    title: "Milestone dinner",
  },
] as const;

const reassurance = [
  {
    icon: ShieldCheck,
    label: "Private chef",
    desc: "Restaurant-level at home",
  },
  {
    icon: Sparkles,
    label: "Event-ready",
    desc: "Polished catering execution",
  },
  {
    icon: Plane,
    label: "Available for travel",
    desc: "New York • Tri-State • Travel",
  },
] as const;

export default function Home() {
  const leadTestimonial = testimonials[0];
  const otherTestimonials = testimonials.slice(1);

  return (
    <PageShell>
      <section className="grain relative overflow-hidden bg-hero-glow">
        <div className="container-pad py-7 sm:py-7 lg:py-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 xl:col-span-5">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="mb-4 inline-block font-display text-xl text-gold-600"
              >
                My signature dish - likely Lobster Bisque or Mac n Cheese
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="badge"
              >
                {site.contactName} • {site.locationLabel}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                className="mt-5 font-display text-5xl tracking-tight text-ink-950 sm:text-6xl"
              >
                Luxury dining,
                <span className="text-balance block">
                  A thoughtfully curated, premium planning experience.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
                className="mt-5 max-w-xl text-base leading-relaxed text-ink-900/75 sm:text-lg"
              >
                HG Cuisine crafts elevated private dining and bespoke catering
                with thoughtful menus, refined presentation, and warm
                hospitality—so your guests feel cared for from the first pour to
                the final bite.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <Link to="/booking" className="btn-gold">
                  Request a booking <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/services" className="btn-ghost">
                  Explore services
                </Link>
              </motion.div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  { k: "Tailored", v: "Menus designed for you" },
                  { k: "Polished", v: "Restaurant-level execution" },
                  { k: "Effortless", v: "Clear planning & timelines" },
                ].map((s) => (
                  <div
                    key={s.k}
                    className="rounded-xl2 border border-ink-900/10 bg-ivory-50/70 p-4 shadow-soft"
                  >
                    <p className="text-sm font-medium text-ink-950">{s.k}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-900/70">
                      {s.v}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 xl:col-span-7">
              <div className="grid gap-6">
                <div className="relative overflow-hidden rounded-[28px] border border-gold-400 bg-ink-900 shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
                  <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-gold-500/12 via-transparent to-taupe-300/18 blur-3xl" />
                  <img
                    src="/images/hero-plating.jpg"
                    alt="Plated fine-dining dish with modern presentation"
                    className="aspect-[5/6] h-full w-full object-cover"
                    loading="lazy"
                  />

                  <div className="absolute inset-x-5 top-5 flex flex-col gap-2">
                    <div className="flex flex-wrap gap-2">
                      {["Private dining", "Bespoke catering", "Events"].map(
                        (pill) => (
                          <span
                            key={pill}
                            className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-ivory-50 backdrop-blur-md"
                          >
                            {pill}
                          </span>
                        ),
                      )}
                    </div>

                    <div className="flex-shrink-0 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-ivory-100 backdrop-blur-md text-center">
                      {site.locationLabel}
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-6 bottom-6 hidden flex-col gap-4 sm:flex">
                      <div className="floating-shot">
                        <img
                          src="/images/service-moment.jpg"
                          alt="Chef preparing a plate"
                          className="h-full w-full rounded-2xl object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="floating-shot">
                        <img
                          src="/images/table-setting.jpg"
                          alt="Table setting with candles"
                          className="h-full w-full rounded-2xl object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <div className="absolute -right-4 top-8 hidden sm:block">
                      <div className="floating-shot rotate-3">
                        <img
                          src="/images/plating-detail.jpg"
                          alt="Fine dining plating detail"
                          className="h-full w-full rounded-2xl object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-ivory-100/40 bg-ivory-50/80 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.15)] backdrop-blur-xl">
                  <p className="font-display text-xl text-ink-950">
                    The HG Signature
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-900/70">
                    Modern, minimal, luxurious—designed with intention, executed
                    with calm precision.
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      {
                        title: "Menu design",
                        text: "Seasonal and centered on your tastes.",
                      },
                      {
                        title: "Seamless service",
                        text: "Confident pacing and polished presentation.",
                      },
                      {
                        title: "Clean finish",
                        text: "Your space reset, guests still glowing.",
                      },
                    ].map((i) => (
                      <div
                        key={i.title}
                        className="rounded-xl2 border border-ink-900/10 bg-white/70 p-3"
                      >
                        <p className="text-xs font-medium text-ink-950">
                          {i.title}
                        </p>
                        <p className="mt-1 text-[12px] leading-relaxed text-ink-900/70">
                          {i.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink-900/5 bg-ivory-50/70 py-4 backdrop-blur-md">
        <div className="container-pad">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {reassurance.map((r) => (
              <div
                key={r.label}
                className="flex items-center gap-3 rounded-full bg-white/70 px-4 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              >
                <r.icon className="h-5 w-5 text-gold-600" />
                <div>
                  <p className="text-sm font-medium text-ink-950">{r.label}</p>
                  <p className="text-[11px] uppercase tracking-[0.08em] text-ink-900/60">
                    {r.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-pad py-14 sm:py-18">
        <SectionHeading
          eyebrow="Experiences"
          title="Designed to impress—crafted to feel effortless."
          description="Choose the style of service that fits your moment. Every experience includes thoughtful planning, customized menus, and elevated presentation."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featureCards.map((f) => (
            <motion.div
              key={f.title}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="card experience-card p-6"
            >
              <f.icon className="h-6 w-6 text-gold-600" />
              <p className="mt-4 font-display text-xl text-ink-950">
                {f.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-900/70">
                {f.desc}
              </p>
              <Link to="/services" className="link-inline mt-5 text-sm">
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-ivory-50 py-14 sm:py-18">
        <div className="container-pad">
          <SectionHeading
            eyebrow="Process"
            title="A thoughtfully curated, premium planning experience."
            description="From first message to final course, the process is designed to be clear, collaborative, and refined."
          />

          <div className="timeline-grid mt-10 grid gap-6 lg:grid-cols-2">
            {[
              {
                n: "01",
                t: "Inquire",
                d: "Share your date, guest count, and vision. We’ll confirm availability and next steps.",
              },
              {
                n: "02",
                t: "Curate",
                d: "We craft a menu around your preferences, dietary needs, and the tone of the occasion.",
              },
              {
                n: "03",
                t: "Execute",
                d: "On-site service with restaurant-level pacing and clean, composed presentation.",
              },
              {
                n: "04",
                t: "Savor",
                d: "Enjoy your guests while everything is handled—down to the final reset.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="timeline-card relative overflow-hidden rounded-xl2 border border-ink-900/10 bg-white/75 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.12)] backdrop-blur"
              >
                <div className="flex items-start gap-4">
                  <div className="timeline-badge">{s.n}</div>
                  <div>
                    <p className="text-sm font-semibold text-ink-950">{s.t}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-900/70">
                      {s.d}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeGallery />

      <section className="container-pad py-14 sm:py-18">
        <SectionHeading
          eyebrow="Kind words"
          title="Guests remember the feeling."
          description="A few notes that capture the experience HG Cuisine is built for."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="quote-card quote-highlight relative overflow-hidden rounded-xl2 border border-ink-900/10 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.16)]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge bg-white/10 text-ivory-50">
                {leadTestimonial.tag}
              </span>
              <span className="text-xs uppercase tracking-[0.14em] text-ivory-100/70">
                {leadTestimonial.title}
              </span>
            </div>
            <p className="mt-4 text-lg leading-relaxed text-ivory-100">
              “{leadTestimonial.quote}”
            </p>
            <p className="mt-4 text-sm font-semibold text-ivory-100">
              {leadTestimonial.name}
            </p>
            <p className="text-xs uppercase tracking-[0.16em] text-ivory-100/70">
              HG Cuisine guest
            </p>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_42%),radial-gradient(circle_at_80%_10%,rgba(184,144,71,0.25),transparent_45%)]" />
          </div>

          <div className="grid gap-4">
            {otherTestimonials.map((t) => (
              <div
                key={t.name}
                className="quote-card relative overflow-hidden rounded-xl2 border border-ink-900/10 bg-white/80 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
              >
                <div className="flex items-center gap-2">
                  <span className="badge w-fit bg-ink-900/5 text-ink-900/70">
                    {t.tag}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-ink-900/50">
                    {t.title}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-900/80">
                  “{t.quote}”
                </p>
                <p className="mt-3 text-sm font-medium text-ink-950">
                  {t.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="cta-panel relative mt-12 flex flex-col items-start justify-between gap-4 overflow-hidden rounded-xl2 border border-ink-900/10 p-8 text-ivory-100 sm:flex-row sm:items-center">
          <div className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen">
            <div className="absolute -left-10 -top-16 h-48 w-48 rounded-full bg-gold-500/30 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-gold-300/25 blur-3xl" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_40%),radial-gradient(circle_at_80%_40%,rgba(255,255,255,0.08),transparent_35%)]" />
          <div>
            <p className="badge border-white/15 bg-white/5 text-ivory-100">
              Ready when you are
            </p>
            <p className="mt-4 font-display text-2xl">
              Let’s design your next “wow.”
            </p>
            <p className="mt-2 text-sm text-ivory-100/75">
              Tell us the date and guest count—we’ll take it from there.
            </p>
          </div>
          <Link to="/booking" className="btn-gold">
            Request a booking <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

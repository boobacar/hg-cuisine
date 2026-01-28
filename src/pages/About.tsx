import { Link } from "react-router-dom";
import { PageShell } from "../components/PageShell";
import { SectionHeading } from "../components/SectionHeading";

export default function About() {
  return (
    <PageShell>
      <section className="grain bg-hero-glow">
        <div className="container-pad grid gap-10 py-16 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <p className="badge">About Chef Ghanney</p>

            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-900/70 sm:text-base">
              Excellence in the kitchen isn't luck, it's passion, dedication,
              and a deep respect for the craft.
            </p>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-900/70 sm:text-base">
              I didn't choose this path easily. While my career led me through
              medicine and federal service, my hands always found their way back
              to the kitchen. What started as a young boy helping my mother
              prepare traditional Ghanaian dishes has evolved into a culinary
              journey that bridges two worlds: the rich, bold flavors of West
              Africa and the comfort of American classics.
            </p>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-900/70 sm:text-base">
              Today, as a Ghanaian-American chef, I pour my heart into every
              plate. Whether I'm executing traditional jollof rice that honors
              my West African roots or crafting elevated American dishes that
              bring people together, my mission is simple: create memorable
              experiences through food.
            </p>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-900/70 sm:text-base">
              At HG Cuisine, you're not just hiring a chef, you're inviting a
              storyteller to your table. Every private dinner, every catered
              event, every carefully plated dish is my way of honoring the women
              who taught me, the cultures that shaped me, and the communities I
              serve.
            </p>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-900/70 sm:text-base">
              Let's create something extraordinary together.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/services" className="btn-primary">
                Explore services
              </Link>
              <Link to="/booking" className="btn-gold">
                Request a booking
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card relative overflow-hidden p-0">
              <img
                src="/images/chef-portrait.jpg"
                alt="Chef Henry Ghanney portrait"
                className="aspect-[5/6] h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/15 via-transparent to-taupe-300/20" />
              <div className="relative p-8">
                <p className="font-display text-2xl text-ink-950">
                  Henry Ghanney
                </p>
                <p className="mt-2 text-sm text-ink-900/70">
                  Founder • Chef • Curator
                </p>
                <div className="mt-6 grid gap-3">
                  {[
                    "Seasonal ingredients and clean flavor layering.",
                    "Intentional plating and composed pacing.",
                    "Respectful, low-footprint service in your space.",
                    "A spotless finish—kitchen reset included.",
                  ].map((t) => (
                    <div
                      key={t}
                      className="rounded-xl2 border border-ink-900/10 bg-ivory-100/60 p-4 text-sm text-ink-900/75"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-pad py-14 sm:py-18">
        <SectionHeading
          eyebrow="Philosophy"
          title="Elevated food is only half the story."
          description="The real luxury is how it feels: calm energy, confident execution, and hospitality that makes guests feel genuinely cared for."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              t: "Clean, minimal design",
              d: "Menus and presentation are refined—never cluttered—so every detail feels intentional.",
            },
            {
              t: "Modern technique",
              d: "A contemporary approach to classics, with seasonal inspiration and balanced flavors.",
            },
            {
              t: "Luxury, made warm",
              d: "Polished service without stiffness—guests feel relaxed, welcomed, and delighted.",
            },
          ].map((c) => (
            <div key={c.t} className="card p-6">
              <p className="font-display text-xl text-ink-950">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-900/70">
                {c.d}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

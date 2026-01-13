import { Link } from "react-router-dom";
import { PageShell } from "../components/PageShell";
import { SectionHeading } from "../components/SectionHeading";
import DomeGallery from "../components/DomeGallery";

const galleryImages = [
  "/images/pic1.jpg",
  "/images/pic2.jpg",
  "/images/pic3.jpg",
  "/images/pic4.jpg",
  "/images/pic5.jpg",
  "/images/pic6.jpg",
  "/images/pic7.jpg",
  "/images/pic8.jpg",

  "/images/plating-detail.jpg",
  "/images/service-moment.jpg",
  "/images/table-setting.jpg",
  "/images/hero-plating.jpg",
  "/images/chef-portrait.jpg",
];

const services = [
  {
    title: "Private Dining",
    desc: "A multi-course experience in your home with refined plating, pacing, and a spotless finish.",
    includes: [
      "Menu consultation + customization",
      "On-site preparation and service",
      "Dietary accommodations",
      "Kitchen reset included",
    ],
  },
  {
    title: "Bespoke Catering",
    desc: "Elevated catering for gatherings—perfectly portioned, beautifully presented, and easy to host.",
    includes: [
      "Passed bites or curated stations",
      "Family-style spreads or plated options",
      "Setup styling (minimal + modern)",
      "Clear pickup/delivery timelines",
    ],
  },
  {
    title: "Events & Celebrations",
    desc: "Milestones, engagements, intimate brand events—executed with calm precision and refined flow.",
    includes: [
      "Timeline + guest flow planning",
      "Coordinated service style",
      "Vendor-friendly collaboration",
      "Optional add-ons by request",
    ],
  },
] as const;

export default function Services() {
  return (
    <PageShell>
      <section className="grain bg-hero-glow">
        <div className="container-pad py-7 sm:py-9">
          <SectionHeading
            eyebrow="Services"
            title="Choose the experience. We’ll handle the rest."
            description="HG Cuisine offers private dining and bespoke catering with a luxury feel—clean, modern, and designed to impress without stress."
          />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/booking" className="btn-gold">
              Request a booking
            </Link>
            <Link to="/contact" className="btn-ghost">
              Ask a question
            </Link>
          </div>
        </div>
      </section>

      <section className="container-pad py-14 sm:py-18">
        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="card p-6">
              <p className="font-display text-2xl text-ink-950">{s.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-900/70">
                {s.desc}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-ink-900/75">
                {s.includes.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold-600" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
              <Link to="/booking" className="btn-primary mt-6 w-full">
                Inquire about {s.title.toLowerCase()}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ivory-50 py-14 sm:py-18 border-y border-ink-900/5">
        <div className="container-pad">
          <SectionHeading
            eyebrow="Trust"
            title="Selected clients & partners"
            description="We have had the honor of serving distinguished organizations and community pillars."
          />
          <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-8 text-center">
            {[
              "Complex Family Style Food Festival",
              "Fire Department of the City of New York Engine 308/Battalion 51",
              "KIN Apparel, Inc.",
              "Alpha Phi Alpha Fraternity, Inc.",
              "The Black Alumni Council of Columbia University",
              "Corporate events, Private Dinners, Birthday Celebrations, etc",
            ].map((client) => (
              <div
                key={client}
                className="flex items-center justify-center rounded-xl border border-ink-900/10 bg-white/60 px-6 py-4 shadow-sm backdrop-blur-sm"
              >
                <span className="font-display text-sm text-ink-900 sm:text-base">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-pad py-14 sm:py-18">
        <SectionHeading
          eyebrow="Gallery"
          title="Visual mood"
          description="Luxury table sets, plated courses, and quiet service moments to match the HG Cuisine experience."
        />
        <div className="mt-8 -mx-4 sm:-mx-0 h-[600px] relative">
          <DomeGallery images={galleryImages} />
        </div>
      </section>

      <section className="bg-ivory-50 py-14 sm:py-18">
        <div className="container-pad">
          <SectionHeading
            eyebrow="Notes"
            title="What to expect"
            description="A few details that keep the experience smooth and premium."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                t: "Menu flexibility",
                d: "Each menu is curated for your preferences, dietary needs, and the flow of the occasion.",
              },
              {
                t: "Clear communication",
                d: "You’ll receive a simple confirmation with timing, guest count, and service style—no guessing.",
              },
              {
                t: "Luxury finish",
                d: "We respect your space. Expect a spotless kitchen reset and a calm, composed service presence.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-xl2 border border-ink-900/10 p-6"
              >
                <p className="text-sm font-medium text-ink-950">{c.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-900/70">
                  {c.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

import { PageShell } from "../components/PageShell";
import { SectionHeading } from "../components/SectionHeading";
import { Accordion } from "../components/ui/Accordion";

const faqs = [
  {
    q: "How far in advance should I book?",
    a: "For the best availability, reach out 2–4 weeks ahead. Last-minute requests are welcome when the calendar allows—send the date and guest count.",
  },
  {
    q: "Do you accommodate dietary restrictions?",
    a: "Yes. Menus can be curated for allergies, vegetarian/vegan preferences, gluten-free needs, and other restrictions—without sacrificing luxury or flavor.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve New York City, Washington D.C., Maryland, Virginia, Philadelphia, Delaware, and New Jersey. Travel to other locations is available by request.",
  },
  {
    q: "Do you offer tastings?",
    a: "Tastings can be arranged for larger events depending on timing and scope. For most private dinners, we curate the menu collaboratively based on your preferences.",
  },
  {
    q: "How does pricing work?",
    a: "Pricing depends on guest count, service style, menu complexity, and travel. After your inquiry, you’ll receive a clear quote and timeline.",
  },
  {
    q: "What is the booking process?",
    a: "Submit a request with your date, guest count, and vision. We confirm availability, curate the menu, and finalize details. A deposit may be required to secure the date.",
  },
] as const;

export default function FAQ() {
  return (
    <PageShell>
      <section className="grain bg-hero-glow">
        <div className="container-pad py-16 sm:py-20">
          <SectionHeading
            eyebrow="FAQ"
            title="Answers, upfront."
            description="A few quick details to keep planning simple. If you don’t see your question, send a note and we’ll reply quickly."
          />
        </div>
      </section>

      <section className="container-pad py-14 sm:py-18">
        <Accordion items={[...faqs]} />
      </section>
    </PageShell>
  );
}

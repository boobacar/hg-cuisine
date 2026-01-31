import { Mail, Send } from "lucide-react";
import { useState } from "react";
import { PageShell } from "../components/PageShell";
import { SectionHeading } from "../components/SectionHeading";
import { site } from "../data/site";
import { sendForm } from "../lib/sendForm";

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  return (
    <PageShell>
      <section className="grain bg-hero-glow">
        <div className="container-pad py-16 sm:py-20">
          <SectionHeading
            eyebrow="Contact"
            title="Tell us what you’re planning."
            description="Share your date, guest count, and the vibe. We’ll respond with next steps and availability."
          />
        </div>
      </section>

      <section className="container-pad grid gap-10 py-14 sm:py-18 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="card p-6 h-full content-center">
            <p className="font-display text-xl text-ink-950">Send a message</p>
            <p className="mt-2 text-sm text-ink-900/70">
              This message goes straight to {site.email}. No email app required.
            </p>

            <form
              className="mt-6 grid gap-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setStatus("sending");
                setError(null);
                const result = await sendForm({
                  _subject: "HG Cuisine — Contact",
                  _template: "table",
                  _captcha: "false",
                  form: "Contact",
                  name: form.name,
                  email: form.email,
                  phone: form.phone,
                  message: form.message,
                });
                if (result.ok) {
                  setStatus("success");
                  setForm({ name: "", email: "", phone: "", message: "" });
                } else {
                  setStatus("error");
                  setError(
                    result.error || "Something went wrong. Please try again.",
                  );
                }
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  <span className="text-ink-900/70">Name</span>
                  <input
                    className="h-11 rounded-xl2 border border-ink-900/10 bg-ivory-100 px-4 text-ink-950 outline-none ring-gold-500/40 focus:ring-2"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  <span className="text-ink-900/70">Email</span>
                  <input
                    className="h-11 rounded-xl2 border border-ink-900/10 bg-ivory-100 px-4 text-ink-950 outline-none ring-gold-500/40 focus:ring-2"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="you@email.com"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm">
                <span className="text-ink-900/70">Phone (optional)</span>
                <input
                  className="h-11 rounded-xl2 border border-ink-900/10 bg-ivory-100 px-4 text-ink-950 outline-none ring-gold-500/40 focus:ring-2"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(123) 456-7890"
                />
              </label>

              <label className="grid gap-2 text-sm">
                <span className="text-ink-900/70">Message</span>
                <textarea
                  className="min-h-36 resize-y rounded-xl2 border border-ink-900/10 bg-ivory-100 px-4 py-3 text-ink-950 outline-none ring-gold-500/40 focus:ring-2"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Tell us what you’re planning (date, guest count, service style, vibe)..."
                />
              </label>

              <button
                type="submit"
                className="btn-gold w-full"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send"}{" "}
                <Send className="h-4 w-4" />
              </button>
              {status === "success" && (
                <p className="text-center text-xs text-emerald-700">
                  Message sent. We will reply shortly.
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-xs text-red-700">
                  {error || "Unable to send right now."}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="card p-6">
            <p className="font-display text-xl text-ink-950">Direct contact</p>
            <p className="mt-2 text-sm text-ink-900/70">
              Prefer a quick message? Reach out directly.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 rounded-xl2 border border-ink-900/10 bg-ivory-100/60 p-4 text-sm text-ink-950 hover:bg-ivory-100"
              >
                <Mail className="h-4 w-4 text-gold-700" />
                {site.email}
              </a>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-ink-900/70">
              If you’d like your inquiries routed into a CRM or email platform,
              we can connect this form to your preferred tool.
            </p>
          </div>
          <div className="card mt-3">
            <img
              className="rounded-xl"
              src="/galery/74008900.webp"
              alt="chef henry"
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

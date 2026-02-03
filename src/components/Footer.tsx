import { useState } from "react";
import { Link } from "react-router-dom";
import { navLinks, site } from "../data/site";
import { Logo } from "./Logo";
import { sendForm } from "../lib/sendForm";

import {
  IconCode,
  IconPhone,
  IconMail,
  IconGlobe,
  IconX,
} from "@tabler/icons-react";

export function Footer() {
  const [lead, setLead] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const [isSignatureModalOpen, setSignatureModalOpen] = useState(false);

  return (
    <footer className="border-t border-ink-900/10 bg-ivory-50">
      <div className="container-pad grid gap-10 py-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-900/70">
            HG Cuisine creates elevated dining experiences with refined menus,
            warm hospitality, and seamless execution—so you can focus on your
            guests.
          </p>
          <p className="mt-4 text-sm text-ink-900/70">
            <span className="font-medium text-ink-900">Contact:</span>{" "}
            <a className="link-inline text-sm" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-display text-sm tracking-wide text-ink-950">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-900/70">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link className="link-inline text-sm" to={l.to}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h3 className="font-display text-sm tracking-wide text-ink-950">
            Stay in the loop
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-ink-900/70">
            Drop your email and we'll follow up with menus, availability, or a
            quick intro call. Sends directly to {site.email}.
          </p>
          <form
            className="mt-4 space-y-3"
            onSubmit={async (e) => {
              e.preventDefault();
              setStatus("sending");
              setError(null);
              const result = await sendForm({
                _subject: "HG Cuisine — Lead capture",
                _template: "table",
                _captcha: "false",
                form: "Footer lead",
                name: lead.name,
                email: lead.email,
              });
              if (result.ok) {
                setStatus("success");
                setLead({ name: "", email: "" });
              } else {
                setStatus("error");
                setError(
                  result.error || "Something went wrong. Please try again.",
                );
              }
            }}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className="h-11 rounded-xl2 border border-ink-900/10 bg-white px-4 text-sm text-ink-950 outline-none ring-gold-500/40 focus:ring-2"
                placeholder="Name (optional)"
                value={lead.name}
                onChange={(e) => setLead({ ...lead, name: e.target.value })}
              />
              <input
                className="h-11 rounded-xl2 border border-ink-900/10 bg-white px-4 text-sm text-ink-950 outline-none ring-gold-500/40 focus:ring-2"
                placeholder="Email"
                type="email"
                required
                value={lead.email}
                onChange={(e) => setLead({ ...lead, email: e.target.value })}
              />
            </div>
            <button type="submit" className="btn-gold w-full sm:w-auto">
              {status === "sending" ? "Sending..." : "Send my details"}
            </button>
            {status === "success" && (
              <p className="text-xs text-emerald-700">
                Sent. We'll reach out soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-xs text-red-700">
                {error || "Unable to send right now."}
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="border-t border-ink-900/10">
        <div className="container-pad flex flex-col gap-2 py-6 text-xs text-ink-900/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.locationLabel}</p>
        </div>
      </div>

      <div className="my-4 flex items-center justify-center text-sm text-black/40">
        Designed by
        <button
          onClick={() => setSignatureModalOpen(true)}
          className="ml-1 animate-bounce font-bold text-brand-orange hover:underline"
        >
          Fallcon Tech
        </button>
      </div>

      {/* Signature Modal */}
      {isSignatureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-white/30 p-8 text-center shadow-2xl shadow-brand-orange/10">
            <button
              onClick={() => setSignatureModalOpen(false)}
              className="absolute right-4 top-4 text-white/40 transition hover:text-white"
            >
              <IconX className="h-5 w-5" />
            </button>

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-black/10 text-white">
              <IconCode className="h-10 w-10" />
            </div>

            <div className="space-y-4 text-sm text-white/80">
              <div className="flex items-center justify-center gap-2">
                <IconPhone className="h-4 w-4 text-brand-orange" />
                <a
                  href="tel:+221776260020"
                  className="transition hover:text-brand-orange hover:underline"
                >
                  +221 77 626 00 20
                </a>
              </div>
              <div className="flex items-center justify-center gap-2">
                <IconMail className="h-4 w-4 text-brand-orange" />
                <a
                  href="mailto:info@fallcontech.com"
                  className="transition hover:text-brand-orange hover:underline"
                >
                  info@fallcontech.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-2">
                <IconGlobe className="h-4 w-4 text-brand-orange" />
                <a
                  href="https://www.fallcontech.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-brand-orange hover:underline"
                >
                  www.fallcontech.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

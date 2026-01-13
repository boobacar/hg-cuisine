import { Link } from "react-router-dom";
import { cn } from "../lib/cn";
import logo from "../assets/logo.jpeg";

export function Logo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-100",
        className
      )}
    >
      <div className="relative grid h-9 w-9 place-items-center rounded-full bg-ink-900 shadow-soft">
        <img className="rounded-full" src={logo} alt="logo" />
        <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-gold-500/30" />
      </div>
      <span className="leading-tight">
        <span className="block font-display font-bold text-base tracking-wide text-ink-950">
          HG Cuisine
        </span>
        <span className="block text-xs text-ink-900/70">
          Private dining & catering
        </span>
      </span>
    </Link>
  );
}

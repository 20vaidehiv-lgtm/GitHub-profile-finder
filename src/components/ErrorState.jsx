import { Link } from "@tanstack/react-router";
import { Gauge, SearchX, WifiOff } from "lucide-react";

const VARIANTS = {
  not_found: {
    icon: SearchX,
    title: "No such developer",
    tone: "text-destructive",
  },
  rate_limited: {
    icon: Gauge,
    title: "GitHub is rate limiting us",
    tone: "text-chart-4",
  },
  error: {
    icon: WifiOff,
    title: "Something went wrong",
    tone: "text-destructive",
  },
};

export default function ErrorState({ status = "error", message, onRetry }) {
  const variant = VARIANTS[status] || VARIANTS.error;
  const Icon = variant.icon;

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-20">
      <div className="rounded-2xl border border-border/80 bg-card/60 p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
          <Icon className={`h-5 w-5 ${variant.tone}`} />
        </span>
        <h1 className="mt-5 font-display text-xl font-semibold tracking-tight">{variant.title}</h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {message || "We couldn't load that profile. Please try again."}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.99] sm:w-auto"
            >
              Try again
            </button>
          )}
          <Link
            to="/"
            className="w-full rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:w-auto"
          >
            Search another developer
          </Link>
        </div>
      </div>
    </div>
  );
}
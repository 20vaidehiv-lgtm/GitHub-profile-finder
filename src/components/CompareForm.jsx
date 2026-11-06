import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { GitCompareArrows } from "lucide-react";

export default function CompareForm({ initialA = "", initialB = "" }) {
  const navigate = useNavigate();
  const [first, setFirst] = useState(initialA);
  const [second, setSecond] = useState(initialB);
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const a = first.trim().replace(/^@/, "");
    const b = second.trim().replace(/^@/, "");

    if (!a || !b) {
      setError("Enter two GitHub usernames to compare.");
      return;
    }
    if (a.toLowerCase() === b.toLowerCase()) {
      setError("Pick two different developers.");
      return;
    }
    setError("");
    navigate({ to: "/compare", search: { a, b } });
  };

  const fieldClasses =
    "w-full rounded-xl border border-border bg-card/80 px-3 py-2.5 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/60";

  return (
    <div className="rounded-2xl border border-border/80 bg-card/50 p-4">
      <form onSubmit={submit} className="sm:flex sm:items-end sm:gap-3">
        <div className="flex-1">
          <label
            htmlFor="compare-first"
            className="mb-1.5 block text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
          >
            First developer
          </label>
          <input
            id="compare-first"
            value={first}
            onChange={(event) => {
              setFirst(event.target.value);
              if (error) setError("");
            }}
            placeholder="torvalds"
            spellCheck={false}
            autoCapitalize="none"
            className={fieldClasses}
          />
        </div>

        <div className="hidden pb-3 text-xs text-muted-foreground sm:block">vs</div>

        <div className="mt-3 flex-1 sm:mt-0">
          <label
            htmlFor="compare-second"
            className="mb-1.5 block text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
          >
            Second developer
          </label>
          <input
            id="compare-second"
            value={second}
            onChange={(event) => {
              setSecond(event.target.value);
              if (error) setError("");
            }}
            placeholder="gaearon"
            spellCheck={false}
            autoCapitalize="none"
            className={fieldClasses}
          />
        </div>

        <button
          type="submit"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.99] sm:mt-0 sm:w-auto"
        >
          <GitCompareArrows className="h-4 w-4" />
          Compare
        </button>
      </form>

      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}
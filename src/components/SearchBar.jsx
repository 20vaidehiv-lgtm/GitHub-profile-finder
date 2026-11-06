import { useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchBar({
  initialValue = "",
  onSearch,
  placeholder = "Search a GitHub username…",
  compact = false,
  autoFocus = false,
}) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const username = value.trim().replace(/^@/, "");
    if (!username) {
      setError("Enter a GitHub username to search.");
      return;
    }
    setError("");
    onSearch(username);
  };

  return (
    <form onSubmit={submit} className="w-full">
      <div
        className={cn(
          "flex items-center gap-2 border border-border bg-card/80 backdrop-blur transition-colors focus-within:border-primary/60",
          compact ? "rounded-xl p-1.5" : "rounded-2xl p-2 shadow-2xl shadow-black/20"
        )}
      >
        <Search className={cn("shrink-0 text-muted-foreground", compact ? "ml-1.5 h-4 w-4" : "ml-2 h-[18px] w-[18px]")} />
        <input
          value={value}
          autoFocus={autoFocus}
          onChange={(event) => {
            setValue(event.target.value);
            if (error) setError("");
          }}
          placeholder={placeholder}
          aria-label="GitHub username"
          spellCheck={false}
          autoCapitalize="none"
          className={cn(
            "min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground/70",
            compact ? "px-1 py-1.5 text-sm" : "px-1.5 py-2.5 text-[15px]"
          )}
        />
        {value && (
          <button
            type="button"
            onClick={() => setValue("")}
            aria-label="Clear search"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        <button
          type="submit"
          className={cn(
            "shrink-0 rounded-xl bg-primary font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]",
            compact ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm sm:px-5"
          )}
        >
          Search
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </form>
  );
}
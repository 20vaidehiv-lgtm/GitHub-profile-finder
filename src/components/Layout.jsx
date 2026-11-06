import { Link, useRouterState } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { label: "Search", to: "/" },
  { label: "Compare", to: "/compare" },
];

export default function Layout({ children }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:gap-5 sm:px-5">
          <Link to="/" aria-label="GitHub Profile Finder home" className="group flex shrink-0 items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-inset ring-primary/25 transition-colors group-hover:bg-primary/20">
              <Github className="h-[18px] w-[18px]" />
            </span>
            <span className="hidden font-display text-[15px] font-semibold tracking-tight sm:inline">
              Profile<span className="text-muted-foreground">Finder</span>
            </span>
          </Link>

          <nav className="ml-auto flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = item.to === "/" ? pathname === "/" || pathname.startsWith("/user") : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Live data from the GitHub REST API. No account needed.</p>
          <p className="font-mono">explore · compare · understand</p>
        </div>
      </footer>
    </div>
  );
}
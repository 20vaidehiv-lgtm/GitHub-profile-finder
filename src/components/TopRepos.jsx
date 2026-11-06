import { Layers } from "lucide-react";
import RepoCard from "@/components/RepoCard";

export default function TopRepos({ repos = [], reposLoaded = true }) {
  return (
    <section>
      <div className="flex items-baseline justify-between gap-3 pb-3">
        <h2 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Top repositories
        </h2>
        <span className="text-[11px] text-muted-foreground/70">by stars</span>
      </div>

      {!reposLoaded ? (
        <div className="rounded-2xl border border-border/80 bg-card/60 p-6 text-sm text-muted-foreground">
          Repository information is unavailable right now. Profile details above are up to date.
        </div>
      ) : repos.length === 0 ? (
        <div className="flex items-start gap-3 rounded-2xl border border-border/80 bg-card/60 p-6">
          <Layers className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No public repositories found for this account yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {repos.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      )}
    </section>
  );
}
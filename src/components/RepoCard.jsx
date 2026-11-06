import { ArrowUpRight, GitFork, Star } from "lucide-react";
import { formatCompact } from "@/lib/format";

export default function RepoCard({ repo }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-border/80 bg-card/60 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="truncate font-mono text-[13px] font-medium text-foreground">{repo.name}</h3>
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:text-primary" />
      </div>

      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
        {repo.description || "No description available."}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-4 text-[11px] text-muted-foreground">
        {repo.language ? (
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {repo.language}
          </span>
        ) : (
          <span className="text-muted-foreground/70">Not specified</span>
        )}
        <span className="flex items-center gap-1">
          <Star className="h-3 w-3" />
          {formatCompact(repo.stars)}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="h-3 w-3" />
          {formatCompact(repo.forks)}
        </span>
      </div>
    </a>
  );
}
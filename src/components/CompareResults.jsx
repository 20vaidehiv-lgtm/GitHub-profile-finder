import { ExternalLink, Star } from "lucide-react";
import { formatCompact, formatFull } from "@/lib/format";

function metricRows(first, second) {
  const rows = [
    { label: "Repositories", a: first.user.publicRepos, b: second.user.publicRepos },
    { label: "Followers", a: first.user.followers, b: second.user.followers },
    { label: "Following", a: first.user.following, b: second.user.following },
    { label: "Public gists", a: first.user.publicGists, b: second.user.publicGists },
  ];
  if (first.reposLoaded && second.reposLoaded) {
    rows.push({ label: "Total stars", a: first.totalStars, b: second.totalStars });
  }
  return rows;
}

function Side({ profile, failed }) {
  if (failed) {
    return (
      <div className="rounded-2xl border border-border/80 bg-card/40 p-4 text-center">
        <div className="mx-auto h-16 w-16 rounded-2xl border border-dashed border-border" />
        <p className="mt-3 text-sm font-medium text-foreground">Not available</p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{profile.message}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/80 bg-card/60 p-4 text-center">
      <img
        src={profile.user.avatar}
        alt={`${profile.user.name} avatar`}
        width={64}
        height={64}
        className="mx-auto h-16 w-16 rounded-2xl border border-border object-cover"
      />
      <p className="mt-3 truncate font-display text-sm font-semibold">{profile.user.name}</p>
      <a
        href={profile.user.profileUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-0.5 inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-primary"
      >
        @{profile.user.username}
        <ExternalLink className="h-2.5 w-2.5" />
      </a>
    </div>
  );
}

export default function CompareResults({ first, second }) {
  const firstOk = first?.status === "ok";
  const secondOk = second?.status === "ok";

  if (!firstOk || !secondOk) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Side profile={firstOk ? first : { message: first?.message }} failed={!firstOk} />
        <Side profile={secondOk ? second : { message: second?.message }} failed={!secondOk} />
      </div>
    );
  }

  const rows = metricRows(first, second);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Side profile={first} failed={false} />
        <Side profile={second} failed={false} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/80 bg-card/50">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-border/70 px-4 py-3 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <span className="truncate text-right font-mono normal-case tracking-normal">
            @{first.user.username}
          </span>
          <span>Metric</span>
          <span className="truncate text-left font-mono normal-case tracking-normal">
            @{second.user.username}
          </span>
        </div>

        {rows.map((row) => {
          const aWins = row.a > row.b;
          const bWins = row.b > row.a;
          return (
            <div
              key={row.label}
              className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-border/40 px-4 py-3 last:border-b-0"
            >
              <span
                title={formatFull(row.a)}
                className={`text-right font-display text-base font-semibold tabular-nums ${
                  aWins ? "text-primary" : "text-foreground"
                }`}
              >
                {formatCompact(row.a)}
              </span>
              <span className="px-2 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                {row.label}
              </span>
              <span
                title={formatFull(row.b)}
                className={`text-left font-display text-base font-semibold tabular-nums ${
                  bWins ? "text-primary" : "text-foreground"
                }`}
              >
                {formatCompact(row.b)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[first, second].map((profile) => (
          <div key={profile.user.username} className="rounded-2xl border border-border/80 bg-card/60 p-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Top repository</p>
            {profile.topRepos.length ? (
              <a
                href={profile.topRepos[0].url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-border/60 px-3 py-2.5 transition-colors hover:border-primary/40"
              >
                <span className="min-w-0 truncate font-mono text-[13px]">{profile.topRepos[0].name}</span>
                <span className="flex shrink-0 items-center gap-1 text-[11px] text-muted-foreground">
                  <Star className="h-3 w-3" />
                  {formatCompact(profile.topRepos[0].stars)}
                </span>
              </a>
            ) : (
              <p className="mt-2 text-[13px] text-muted-foreground">No public repositories.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
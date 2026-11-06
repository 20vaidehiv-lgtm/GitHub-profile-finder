import { Link } from "@tanstack/react-router";
import { Building2, CalendarDays, ExternalLink, Link as LinkIcon, MapPin, Twitter } from "lucide-react";
import { formatJoined } from "@/lib/format";

export default function ProfileHeader({ user }) {
  const joined = formatJoined(user.createdAt);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/60 p-5 sm:p-6">
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
        <img
          src={user.avatar}
          alt={`${user.name} avatar`}
          width={80}
          height={80}
          loading="eager"
          className="h-20 w-20 shrink-0 rounded-2xl border border-border object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h1 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{user.name}</h1>
            <span className="font-mono text-xs text-muted-foreground">@{user.username}</span>
          </div>

          {user.bio && (
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted-foreground sm:text-sm">{user.bio}</p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            {user.company && (
              <span className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" />
                {user.company}
              </span>
            )}
            {user.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {user.location}
              </span>
            )}
            {user.blog && (
              <a
                href={user.blog}
                target="_blank"
                rel="noreferrer"
                className="flex max-w-[220px] items-center gap-1.5 truncate transition-colors hover:text-primary"
              >
                <LinkIcon className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{user.blog.replace(/^https?:\/\//, "")}</span>
              </a>
            )}
            {user.twitter && (
              <a
                href={`https://twitter.com/${user.twitter}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:text-primary"
              >
                <Twitter className="h-3.5 w-3.5" />
                @{user.twitter}
              </a>
            )}
            {joined && (
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                Joined {joined}
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <a
            href={user.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.99]"
          >
            View on GitHub
            <ExternalLink className="h-3 w-3" />
          </a>
          <Link
            to="/"
            className="inline-flex items-center rounded-xl border border-border px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            New search
          </Link>
        </div>
      </div>
    </section>
  );
}
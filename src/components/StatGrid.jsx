import { FileCode2, FolderGit2, UserPlus, Users } from "lucide-react";
import { formatCompact, formatFull } from "@/lib/format";

const STAT_CONFIG = [
  { key: "publicRepos", label: "Repositories", icon: FolderGit2 },
  { key: "followers", label: "Followers", icon: Users },
  { key: "following", label: "Following", icon: UserPlus },
  { key: "publicGists", label: "Public gists", icon: FileCode2 },
];

export default function StatGrid({ user }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {STAT_CONFIG.map(({ key, label, icon: Icon }) => (
        <div
          key={key}
          className="group rounded-2xl border border-border/80 bg-card/60 p-4 transition-colors hover:border-border hover:bg-card"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              {label}
            </span>
            <Icon className="h-3.5 w-3.5 text-muted-foreground/70 transition-colors group-hover:text-primary" />
          </div>
          <p
            className="mt-3 font-display text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl"
            title={formatFull(user[key])}
          >
            {formatCompact(user[key])}
          </p>
        </div>
      ))}
    </div>
  );
}
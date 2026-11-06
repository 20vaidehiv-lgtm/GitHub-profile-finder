import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="h-3 w-3 animate-spin rounded-full border border-muted-foreground/40 border-t-primary" />
        Fetching GitHub profile…
      </div>

      <div className="mt-8 rounded-2xl border border-border/80 bg-card/60 p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <Skeleton className="h-20 w-20 shrink-0 rounded-2xl" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-3.5 w-full max-w-md" />
            <div className="flex gap-3 pt-1">
              <Skeleton className="h-3.5 w-20" />
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-3.5 w-16" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[86px] rounded-2xl" />
        ))}
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[132px] rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
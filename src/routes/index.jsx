import { createFileRoute } from "@tanstack/react-router";
import { getGithubProfile } from "@/lib/server-fns";
import CompareForm from "@/components/CompareForm";
import CompareResults from "@/components/CompareResults";
import ProfileSkeleton from "@/components/ProfileSkeleton";

export const Route = createFileRoute("/compare")({
  validateSearch: (search) => ({
    a: typeof search.a === "string" && search.a ? search.a : undefined,
    b: typeof search.b === "string" && search.b ? search.b : undefined,
  }),
  loaderDeps: ({ search }) => ({ a: search.a, b: search.b }),
  loader: async ({ deps }) => {
    if (!deps.a || !deps.b) return null;
    const [first, second] = await Promise.all([
      getGithubProfile({ data: { username: deps.a } }),
      getGithubProfile({ data: { username: deps.b } }),
    ]);
    return { first, second };
  },
  pendingComponent: ProfileSkeleton,
  component: ComparePage,
  head: () => ({
    meta: [
      { title: "Compare developers · GitHub Profile Finder" },
      {
        name: "description",
        content: "Put two GitHub profiles side by side and compare followers, repositories and total stars.",
      },
    ],
  }),
});

function ComparePage() {
  const data = Route.useLoaderData();
  const { a, b } = Route.useSearch();

  return (
    <div className="relative mx-auto w-full max-w-4xl px-5 py-10">
      <div className="pointer-events-none absolute left-1/2 top-[-120px] h-64 w-[min(620px,90vw)] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative">
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Compare developers</h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Two GitHub profiles, side by side. The higher value in each row is highlighted.
        </p>

        <div className="mt-6">
          <CompareForm key={`${a || ""}-${b || ""}`} initialA={a || ""} initialB={b || ""} />
        </div>

        <div className="mt-6">
          {data ? (
            <CompareResults first={data.first} second={data.second} />
          ) : (
            <div className="rounded-2xl border border-dashed border-border/70 p-10 text-center">
              <p className="text-sm text-muted-foreground">
                Enter two usernames above to see their stats compared.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
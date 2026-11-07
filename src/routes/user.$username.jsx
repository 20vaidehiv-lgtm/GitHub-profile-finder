import { useEffect } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { getGithubProfile } from "@/lib/server-fns";
import ProfileDashboard from "@/components/ProfileDashboard";
import ProfileSkeleton from "@/components/ProfileSkeleton";
import ErrorState from "@/components/ErrorState";
import { addRecentSearch } from "@/lib/recentSearches";

export const Route = createFileRoute("/user/$username")({
  loader: ({ params }) => getGithubProfile({ data: { username: params.username } }),
  head: ({ params }) => ({
    meta: [
      { title: `${params.username} · GitHub Profile Finder` },
      {
        name: "description",
        content: `GitHub profile, top repositories and programming language breakdown for ${params.username}.`,
      },
    ],
  }),
  pendingComponent: ProfileSkeleton,
  component: UserProfilePage,
});

function UserProfilePage() {
  const data = Route.useLoaderData();
  const router = useRouter();

  useEffect(() => {
    if (data?.status === "ok") addRecentSearch(data.user.username);
  }, [data]);

  if (!data || data.status !== "ok") {
    return (
      <ErrorState
        status={data?.status || "error"}
        message={data?.message}
        onRetry={() => router.invalidate()}
      />
    );
  }

  return <ProfileDashboard data={data} />;
}
import ProfileHeader from "@/components/ProfileHeader";
import StatGrid from "@/components/StatGrid";
import TopRepos from "@/components/TopRepos";
import LanguageChart from "@/components/LanguageChart";

export default function ProfileDashboard({ data }) {
  const { user, topRepos, languages, repoCount, reposLoaded } = data;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:py-10">
      <div className="space-y-4">
        <ProfileHeader user={user} />
        <StatGrid user={user} />
        <div className="grid gap-4 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <TopRepos repos={topRepos} reposLoaded={reposLoaded} />
          </div>
          <div className="lg:col-span-2">
            <LanguageChart languages={languages} repoCount={repoCount} />
          </div>
        </div>
      </div>
    </div>
  );
}
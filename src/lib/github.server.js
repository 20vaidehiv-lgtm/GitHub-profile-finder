import { secrets } from "base44:runtime";

const GITHUB_API = "https://api.github.com";
const USERNAME_PATTERN = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

function buildHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "github-profile-finder",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  try {
    const token = secrets.get("GITHUB_TOKEN");
    if (token) headers.Authorization = `Bearer ${token}`;
  } catch {
    /* token not configured — public rate limits apply */
  }
  return headers;
}

async function githubGet(path) {
  const response = await fetch(`${GITHUB_API}${path}`, { headers: buildHeaders() });

  if (response.ok) {
    return { ok: true, data: await response.json() };
  }

  if (response.status === 404) {
    return { ok: false, status: "not_found" };
  }

  if (response.status === 403 || response.status === 429) {
    const remaining = response.headers.get("x-ratelimit-remaining");
    if (response.status === 429 || remaining === "0") {
      return { ok: false, status: "rate_limited" };
    }
  }

  return { ok: false, status: "error" };
}

function normalizeUrl(value) {
  if (!value) return null;
  const url = String(value).trim();
  if (!url) return null;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function countLanguages(repos) {
  const counts = new Map();
  for (const repo of repos) {
    if (!repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) || 0) + 1);
  }
  const total = Array.from(counts.values()).reduce((sum, count) => sum + count, 0);
  return Array.from(counts.entries())
    .map(([name, count]) => ({
      name,
      count,
      percent: total ? Math.round((count / total) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

function normalizeRepo(repo) {
  return {
    name: repo.name,
    description: repo.description || null,
    language: repo.language || null,
    stars: repo.stargazers_count || 0,
    forks: repo.forks_count || 0,
    url: repo.html_url,
  };
}

export async function fetchGithubProfile(rawUsername) {
  const username = String(rawUsername || "").trim();

  if (!USERNAME_PATTERN.test(username)) {
    return {
      status: "not_found",
      username,
      message: `"${username || "That"}" isn't a valid GitHub username.`,
    };
  }

  let userResult;
  let reposResult;

  try {
    [userResult, reposResult] = await Promise.all([
      githubGet(`/users/${encodeURIComponent(username)}`),
      githubGet(`/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated&type=owner`),
    ]);
  } catch {
    return {
      status: "error",
      username,
      message: "Couldn't reach GitHub. Check your connection and try again.",
    };
  }

  if (!userResult.ok) {
    if (userResult.status === "not_found") {
      return {
        status: "not_found",
        username,
        message: `No GitHub account found for "${username}". Check the spelling and try again.`,
      };
    }
    if (userResult.status === "rate_limited") {
      return {
        status: "rate_limited",
        username,
        message: "GitHub's public request limit has been reached. It resets within the hour — try again shortly.",
      };
    }
    return {
      status: "error",
      username,
      message: "GitHub didn't respond properly. Please try again in a moment.",
    };
  }

  const profile = userResult.data || {};
  const rawRepos = reposResult.ok && Array.isArray(reposResult.data) ? reposResult.data : [];
  const repos = rawRepos.map(normalizeRepo);
  const sorted = [...repos].sort((a, b) => b.stars - a.stars || a.name.localeCompare(b.name));

  return {
    status: "ok",
    user: {
      username: profile.login,
      name: profile.name || profile.login,
      avatar: profile.avatar_url,
      bio: profile.bio || null,
      location: profile.location || null,
      company: profile.company || null,
      blog: normalizeUrl(profile.blog),
      twitter: profile.twitter_username || null,
      followers: profile.followers || 0,
      following: profile.following || 0,
      publicRepos: profile.public_repos || 0,
      publicGists: profile.public_gists || 0,
      profileUrl: profile.html_url,
      createdAt: profile.created_at || null,
    },
    reposLoaded: reposResult.ok,
    repoCount: repos.length,
    totalStars: repos.reduce((sum, repo) => sum + repo.stars, 0),
    totalForks: repos.reduce((sum, repo) => sum + repo.forks, 0),
    topRepos: sorted.slice(0, 4),
    languages: countLanguages(repos),
  };
}
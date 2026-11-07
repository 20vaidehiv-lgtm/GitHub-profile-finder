import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { fetchGithubProfile } from "./github.server";

export const getServerInfo = createServerFn({ method: "GET" }).handler(async () => ({
  renderedAt: new Date().toISOString(),
}));

export const getGithubProfile = createServerFn({ method: "GET" })
  .validator(z.object({ username: z.string().trim().min(1).max(64) }))
  .handler(({ data }) => fetchGithubProfile(data.username));
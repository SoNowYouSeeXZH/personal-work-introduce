import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "my-app";
const isUserOrOrgPage = repositoryName.endsWith(".github.io");
const basePath = isGitHubPages && !isUserOrOrgPage ? `/${repositoryName}` : undefined;

const nextConfig: NextConfig = {
  ...(isGitHubPages ? { output: "export" as const } : {}),
  trailingSlash: isGitHubPages,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: isGitHubPages,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

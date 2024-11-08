import fetch from "node-fetch";
import fs from "fs";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPOS = [
  "OpenElements/BenchScape",
  "OpenElements/hedera-enterprise",
  "OpenElements/open-elements-website",
];

const HEADERS = {
  Accept: "application/vnd.github.v3+json",
  Authorization: `token ${GITHUB_TOKEN}`,
};

async function fetchGoodFirstIssues(repo) {
  const url = `https://api.github.com/repos/${repo}/issues?labels=good%20first%20issue&state=open`;

  try {
    const response = await fetch(url, { headers: HEADERS });
    if (!response.ok) {
      throw new Error(
        `Error fetching data from ${repo}: ${response.statusText}`
      );
    }

    const issues = await response.json();
    return issues.map((issue) => ({
      title: issue.title,
      url: issue.html_url,
      created_at: issue.created_at,
      repo: repo,
    }));
  } catch (error) {
    console.error(`Error fetching from ${repo}:`, error);
    return [];
  }
}

async function main() {
  const allIssues = [];
  for (const repo of REPOS) {
    const issues = await fetchGoodFirstIssues(repo);
    allIssues.push(...issues);
  }
  fs.writeFileSync("./data/issues.json", JSON.stringify(allIssues, null, 2));
  console.log("Issues successfully saved!");
}

main();

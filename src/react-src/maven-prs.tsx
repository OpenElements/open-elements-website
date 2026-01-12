import React, {useEffect, useState} from 'react';

type PR = {
  title: string;
  url: string;
  repository: string;
  status: string;
};

export default function MavenPRs({status}: { status?: string }) {
  const [prs, setPrs] = useState<PR[] | null>(null);

  useEffect(() => {

    async function fetchPRs() {
      const projectRes = await fetch('https://open-elements-open-data.koyeb.app/projects');
      const projects = await projectRes.json();

      // Use given UUIDs or fallback to default Maven + Maven Plugins
      const relevantUuids = [
        'Project-maven', // Apache Maven
        'Project-maven-plugins'  // Maven Plugins
      ];

      const relevantProjects = projects.filter((p: any) => relevantUuids.includes(p.uuid));
      if (relevantProjects.length === 0) {
        setPrs([]);
        return;
      }

      // Combine all matchingRepos from all relevant projects
      const matchingPatterns = relevantProjects.flatMap((p: any) => p.matchingRepos);

      const matchesRepo = (org: string, repo: string) => {
        return matchingPatterns.some((pattern: string) => {
          if (pattern.includes('*')) {
            const [pOrg, pRepo] = pattern.split('/');
            return pRepo === '*' && pOrg === org;
          } else {
            const [pOrg, pRepo] = pattern.split('/');
            return pOrg === org && pRepo === repo;
          }
        });
      };

      // Fetch pull requests
      const res = await fetch('https://open-elements-open-data.koyeb.app/pullrequests');
      const allPRs = await res.json();

      // Filter and sort
      const filtered = allPRs
      .filter((pr: any) => {
        const belongsToProject = (pr.open || pr.merged) && matchesRepo(pr.org, pr.repository);
        const statusMatches =
            !status ||
            (status === 'open' && pr.open) ||
            (status === 'merged' && pr.merged);
        return belongsToProject && statusMatches;
      })
      .map((pr: any): PR => ({
        title: pr.title,
        url: `https://github.com/${pr.org}/${pr.repository}/pull/${pr.gitHubId}`,
        repository: `${pr.org}/${pr.repository}`,
        status: pr.merged ? 'merged' : 'open',
      }))
      .sort((a: PR, b: PR) => a.repository.localeCompare(b.repository));

      setPrs(filtered);
    }

    fetchPRs();
  }, []);

  if (!prs) return <div>Keine Pull Requests gefunden</div>;

  return (
      <div className="grid gap-4">
        {prs.map((pr, idx) => (
            <div
                key={idx}
                className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-center">
                <a
                    href={pr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-blue-600 hover:underline"
                >
                  {pr.title}
                </a>
                <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                        pr.status === 'merged'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                    }`}
                >
            {pr.status}
          </span>
              </div>
              <div className="mt-1 text-sm text-gray-500">{pr.repository}</div>
            </div>
        ))}
      </div>
  );
}
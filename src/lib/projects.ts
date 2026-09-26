export const PROJECTS = [
  {
    project: 'maven',
    name: 'Apache Maven',
    logo: '/support-care/component-logos/apache-maven.svg',
    teamLabelKey: 'supportAndCare',
  },
  {
    project: 'junit',
    name: 'JUnit',
    logo: '/support-care/component-logos/junit.svg',
    teamLabelKey: 'supportAndCare',
  },
  {
    project: 'hiero',
    name: 'Hiero',
    logo: '/illustrations/logo-hiero.svg',
    teamLabelKey: 'openElements',
  },
] as const;

export function getProject(project: string) {
  return PROJECTS.find(p => p.project === project);
}

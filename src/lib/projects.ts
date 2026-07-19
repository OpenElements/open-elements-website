export const PROJECTS = [
  {
    project: 'maven',
    name: 'Apache Maven',
    logo: '/support-care/component-logos/apache-maven.svg',
  },
  {
    project: 'junit',
    name: 'JUnit',
    logo: '/support-care/component-logos/junit.svg',
  },
] as const;

export function getProject(project: string) {
  return PROJECTS.find(p => p.project === project);
}

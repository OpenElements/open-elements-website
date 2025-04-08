import {build} from 'esbuild';

const components = [
  {
    entry: 'maven-prs-wrapper.tsx',
    out: 'maven-prs.js'
  }
];

await Promise.all(components.map(({entry, out}) =>
    build({
      entryPoints: [`./${entry}`],
      bundle: true,
      format: 'iife',
      outfile: `../static/js/${out}`,
      define: {
        'process.env.NODE_ENV': '"production"'
      }
    })
));

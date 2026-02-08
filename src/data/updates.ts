import type { Update } from '@/types/updates';

/**
 * Updates data for the changelog page.
 * Add new updates at the beginning of the array.
 * Mark the most recent update with `isLatest: true`.
 */
export const updatesData: Update[] = [
  {
    version: 'v0.1.8',
    date: 'NOVEMBER, 2025',
    month: 'NOV',
    isLatest: true,
    overview: [
      'Pretium augue urna sit vulputate in. Venenatis amet dui augue et interdum. Dolor feugiat morbi pellentesque in at ullamcorper. Quis imperdiet sit ipsum et sodales amet urna.',
      'Pretium augue urna sit vulputate in. Venenatis amet dui augue et interdum. Dolor feugiat morbi pellentesque in at ullamcorper. Quis imperdiet sit ipsum et sodales amet urna.',
    ],
    sections: [
      {
        title: 'Refactored Documentation:',
        collapsible: true,
        items: [
          { text: 'docs: added changelog conflict resolution examples to docs/common_issues.md' },
          {
            text: 'docs: added "One Issue Per Pull Request" section to examples/sdk_developers/common_issues.md.',
          },
          { text: 'docs: update pyproject.toml maintainers list.' },
          { text: 'docs: added to README a social follow section' },
          { text: 'docs: added changelog conflict resolution examples to docs/common_issues.md' },
          {
            text: 'docs: added "One Issue Per Pull Request" section to examples/sdk_developers/common_issues.md.',
          },
          { text: 'docs: update pyproject.toml maintainers list.' },
          { text: 'docs: added to README a social follow section' },
        ],
      },
      {
        title: 'Bug Fixes:',
        icon: 'red',
        items: [
          {
            text: 'Pharetra sed pellentesque pretium euismod risus iaculis netus. Ac scelerisque posuere viverra sit. Consequat in odio sed tempus faucibus risus. Malesuada turpis nisi lorem volutpat ullamcorper magna.',
          },
          {
            text: 'Pharetra sed pellentesque pretium euismod risus iaculis netus. Ac scelerisque posuere viverra sit. Consequat in odio sed tempus faucibus risus. Malesuada turpis nisi lorem volutpat ullamcorper magna.',
          },
        ],
      },
      {
        title: 'New Fixes:',
        icon: 'green',
        items: [
          {
            text: 'Pharetra sed pellentesque pretium euismod risus iaculis netus. Ac scelerisque posuere viverra sit. Consequat in odio sed tempus faucibus risus. Malesuada turpis nisi lorem volutpat ullamcorper magna.',
          },
          {
            text: 'Nunc quis nec urna pellentesque. Mus tempor placerat at lacinia nulla justo iaculis bibendum pretium. Dis ullamcorper scelerisque eget ultricies fermentum fermentum nisi. Eu auctor lorem sed nisl elit posuere purus est.',
          },
          {
            text: 'Quam enim rhoncus fames et vitae enim molestie tellus. Pulvinar eget diam vestibulum pellentesque sit fringilla ornare augue pellentesque. Consequat nec at proin et vitae elit. Vitae ut cursus suspendisse elementum euismod sit.',
          },
          {
            text: 'Purus habitant consectetur vulputate gravida. Lacus in neque fermentum viverra eros viverra. Dui odio urna nunc volutpat. In nunc arcu augue eu eu tellus.',
          },
        ],
      },
      {
        title: 'New Features:',
        icon: 'purple',
        collapsible: true,
        items: [
          {
            text: 'Quis quam pellentesque at sed in sed orci. Purus varius non arcu cursus malesuada convallis nisl sem pulvinar.',
          },
          { text: 'Nisl commodo quis blandit nibh. Odio mauris id eget quis tempor.' },
          { text: 'Sed gravida morbi elit a sit. Nec non amet tortor purus neque amet libero.' },
          {
            text: 'Consequat consectetur cras neque mattis. In quam aliquam mattis ut risus risus dis proin lorem.',
          },
          {
            text: 'Quis quam pellentesque at sed in sed orci. Purus varius non arcu cursus malesuada convallis nisl sem pulvinar.',
          },
          { text: 'Nisl commodo quis blandit nibh. Odio mauris id eget quis tempor.' },
          { text: 'Sed gravida morbi elit a sit. Nec non amet tortor purus neque amet libero.' },
          {
            text: 'Consequat consectetur cras neque mattis. In quam aliquam mattis ut risus risus dis proin lorem.',
          },
        ],
      },
      {
        title: "What's Changed",
        icon: 'star',
        items: [
          {
            text: 'Eleifend nunc dui ullamcorper lectus at sociis. Gravida eget velit amet at tortor duis. Convallis id pellentesque aenean orci vestibulum arcu nisi arcu. Egestas nulla ullamcorper vulputate venenatis.',
          },
          {
            text: 'Feugiat convallis quam leo faucibus tristique sed vitae. Enim lectus consectetur eu facilisi nullam. Ut leo morbi condimentum sed. Quis nibh ornare mi orci morbi sed.',
          },
          {
            text: 'Sit senectus nulla ullamcorper pretium ac vitae. Sem interdum elementum viverra in. Sit sit tincidunt libero vestibulum amet consectetur mi. Nulla etiam urna placerat id diam.',
          },
        ],
      },
    ],
    assets: 2,
    tags: ['Tortor', 'Tellus', 'Mattis', 'Luctus', 'Tellus'],
    contributors: Array(23).fill({
      name: 'Contributor',
      avatar: 'https://cdn.pixabay.com/photo/2025/04/02/18/48/background-9509852_1280.jpg',
      url: '#',
    }),
    contributorNote:
      'Tellus massa commodo at neque eget morbi mus porta mauris. Ac elementum natoque massa arcu tellus lorem eu hac amet.',
  },
  {
    version: 'v0.1.7',
    date: 'OKTOBER, 2025',
    month: 'OKT',
    sections: [
      {
        title: "What's Changed",
        icon: 'star',
        items: [
          {
            text: 'Eleifend nunc dui ullamcorper lectus at sociis. Gravida eget velit amet at tortor duis. Convallis id pellentesque aenean orci vestibulum arcu nisi arcu. Egestas nulla ullamcorper vulputate venenatis.',
          },
          {
            text: 'Feugiat convallis quam leo faucibus tristique sed vitae. Enim lectus consectetur eu facilisi nullam. Ut leo morbi condimentum sed. Quis nibh ornare mi orci morbi sed.',
          },
          {
            text: 'Sit senectus nulla ullamcorper pretium ac vitae. Sem interdum elementum viverra in. Sit sit tincidunt libero vestibulum amet consectetur mi. Nulla etiam urna placerat id diam.',
          },
        ],
      },
    ],
    assets: 2,
    contributors: Array(5).fill({
      name: 'Contributor',
      avatar: 'https://cdn.pixabay.com/photo/2025/04/02/18/48/background-9509852_1280.jpg',
      url: '#',
    }),
    contributorNote:
      'Tellus massa commodo at neque eget morbi mus porta mauris. Ac elementum natoque massa arcu tellus lorem eu hac amet.',
  },
  {
    version: 'v0.1.6',
    date: 'August, 2025',
    month: 'AUG',
    sections: [
      {
        title: "What's Changed",
        icon: 'star',
        items: [
          {
            text: 'Eleifend nunc dui ullamcorper lectus at sociis. Gravida eget velit amet at tortor duis. Convallis id pellentesque aenean orci vestibulum arcu nisi arcu. Egestas nulla ullamcorper vulputate venenatis.',
          },
          {
            text: 'Feugiat convallis quam leo faucibus tristique sed vitae. Enim lectus consectetur eu facilisi nullam. Ut leo morbi condimentum sed. Quis nibh ornare mi orci morbi sed.',
          },
          {
            text: 'Sit senectus nulla ullamcorper pretium ac vitae. Sem interdum elementum viverra in. Sit sit tincidunt libero vestibulum amet consectetur mi. Nulla etiam urna placerat id diam.',
          },
          {
            text: 'Eleifend nunc dui ullamcorper lectus at sociis. Gravida eget velit amet at tortor duis. Convallis id pellentesque aenean orci vestibulum arcu nisi arcu. Egestas nulla ullamcorper vulputate venenatis.',
          },
          {
            text: 'Feugiat convallis quam leo faucibus tristique sed vitae. Enim lectus consectetur eu facilisi nullam. Ut leo morbi condimentum sed. Quis nibh ornare mi orci morbi sed.',
          },
          {
            text: 'Sit senectus nulla ullamcorper pretium ac vitae. Sem interdum elementum viverra in. Sit sit tincidunt libero vestibulum amet consectetur mi. Nulla etiam urna placerat id diam.',
          },
        ],
      },
    ],
  },
  {
    version: 'v0.1.5',
    date: 'September, 2025',
    month: 'SEP',
    sections: [
      {
        title: "What's Changed",
        icon: 'star',
        items: [
          {
            text: 'Eleifend nunc dui ullamcorper lectus at sociis. Gravida eget velit amet at tortor duis. Convallis id pellentesque aenean orci vestibulum arcu nisi arcu. Egestas nulla ullamcorper vulputate venenatis.',
          },
          {
            text: 'Feugiat convallis quam leo faucibus tristique sed vitae. Enim lectus consectetur eu facilisi nullam. Ut leo morbi condimentum sed. Quis nibh ornare mi orci morbi sed.',
          },
          {
            text: 'Sit senectus nulla ullamcorper pretium ac vitae. Sem interdum elementum viverra in. Sit sit tincidunt libero vestibulum amet consectetur mi. Nulla etiam urna placerat id diam.',
          },
          {
            text: 'Eleifend nunc dui ullamcorper lectus at sociis. Gravida eget velit amet at tortor duis. Convallis id pellentesque aenean orci vestibulum arcu nisi arcu. Egestas nulla ullamcorper vulputate venenatis.',
          },
          {
            text: 'Feugiat convallis quam leo faucibus tristique sed vitae. Enim lectus consectetur eu facilisi nullam. Ut leo morbi condimentum sed. Quis nibh ornare mi orci morbi sed.',
          },
          {
            text: 'Sit senectus nulla ullamcorper pretium ac vitae. Sem interdum elementum viverra in. Sit sit tincidunt libero vestibulum amet consectetur mi. Nulla etiam urna placerat id diam.',
          },
        ],
      },
    ],
  },
];

import { Page } from './page';

const pageImports = import.meta.glob('../../pages/**/*.tsx');

const pages: any = Object.entries(pageImports).map(([path, page]) => ({
  path: path
    .replace('../../pages/', '')
    .replace('index.tsx', '')
    .replace('.tsx', ''),
  element: <Page content={page as any} />,
}));

console.log('pages', pages);

export { pages };

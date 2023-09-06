const imports = import.meta.glob('../pages/*/index.mdx');

const pages = Object.entries(imports).map(([path, loader]) => {
  const slug = path.replace('./pages/', '').replace('/index.mdx', '');
  return { slug, loader };
});

export { pages };

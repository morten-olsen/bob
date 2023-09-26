const imports = import.meta.glob('../experiments/*/index.tsx');

const experiments = Object.entries(imports).map(([path, loader]) => {
  const slug = path.replace('./experiments/', '').replace('/index.tsx', '');
  return { slug, loader };
});

export { experiments };

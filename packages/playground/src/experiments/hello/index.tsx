const Foo = () => {
  return <div></div>;
};

const worker = () =>
  new Worker(new URL('./script.ts', import.meta.url), {
    type: 'module',
  });

const view = <Foo />;

export { worker, view };

import './script.ts';
const worker = new Worker(new URL('./script.ts', import.meta.url), {
  type: 'module',
});

export { worker };

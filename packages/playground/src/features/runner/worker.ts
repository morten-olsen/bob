type WorkerFn = Record<string, (...args: any[]) => any>;

const createWorker = (fn: WorkerFn) => {
  self.addEventListener('message', (event) => {
    const { action, vars = {}, id } = event.data;
    const run = async () => {
      const startTime = performance.now();
      try {
        const result = await fn[action](vars);
        const endTime = performance.now();
        const duration = endTime - startTime;
        self.postMessage({ type: 'output', payload: result, id, duration });
      } catch (error) {
        self.postMessage({ type: 'error', payload: error, id });
      }
    };
    run();
  });
};

export { createWorker };

type WorkerFn = (...args: any[]) => any;

const createWorker = (fn: WorkerFn) => {
  const run = async () => {
    const startTime = performance.now();
    try {
      const result = await fn();
      const endTime = performance.now();
      const duration = endTime - startTime;
      self.postMessage({ type: 'output', payload: result, duration });
    } catch (error) {
      self.postMessage({ type: 'error', payload: error });
    }
  };
  self.addEventListener('message', (event) => {
    const { type } = event.data;
    if (type === 'run') {
      run();
    }
  });
};

export { createWorker };

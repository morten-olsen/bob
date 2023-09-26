import { Bob, plugins } from '@bob-the-algorithm/core';
import { ExperimentInfo } from './types';

const MIN = 1000 * 60;

const getTravelTime = async () => 30 * MIN;
const transport = plugins.transport({
  getTravelTime,
});

const run = async (payload: ExperimentInfo) => {
  const startTime = performance.now();
  try {
    const bob = new Bob({
      plugins: { transport, capabilities: plugins.capabilities() },
    });
    const result = await bob.run({
      planables: payload.planables,
      context: payload.context,
      start: payload.start,
      heuristic: ({ completed }) => completed.length >= 3,
    });

    const endTime = performance.now();
    const duration = endTime - startTime;
    self.postMessage({ type: 'output', payload: result, duration });
  } catch (error) {
    self.postMessage({ type: 'error', payload: error });
    console.error(error);
  }
};

self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  if (type === 'run') {
    run(payload);
  }
});

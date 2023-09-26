import { Bob, plugins } from '@bob-the-algorithm/core';
import { createWorker } from '../../features/experiment/worker';

const MIN = 1000 * 60;
const HOUR = 1000 * 60 * 60;

const getTravelTime = async () => 30 * MIN;
const transport = plugins.transport({
  getTravelTime,
});

const realistic = async () => {
  try {
    const bob = new Bob({
      plugins: { transport, capabilities: plugins.capabilities() },
    });
    const result = await bob.run({
      context: {
        location: 'home',
        capabilities: ['kids'],
      },
      start: 0,
      heuristic: ({ completed }) => completed.length >= 30,
      planables: [
        {
          id: `Brush teeth`,
          duration: 2 * MIN,
          start: {
            min: 7 * HOUR,
            max: 8 * HOUR,
          },
          attributes: {
            locations: ['home'],
          },
          score: 1,
        },
        {
          id: 'Drop off kids',
          duration: 30 * MIN,
          attributes: {
            locations: ['daycare'],
            capabilities: {
              consumes: ['kids'],
              requires: ['kids'],
            },
          },
          score: 1,
          start: {
            min: 7 * HOUR,
            max: 9 * HOUR,
          },
        },
        {
          id: 'visit zoo',
          duration: 1 * HOUR,
          attributes: {
            locations: ['zoo'],
            capabilities: {
              requires: ['kids'],
            },
          },
          score: 1,
          start: {
            min: 10 * HOUR,
            max: 14 * HOUR,
          },
        },
        {
          id: 'Pickup the kids',
          duration: 30 * MIN,
          attributes: {
            locations: ['daycare'],
            capabilities: {
              provides: ['kids'],
            },
          },
          score: 1,
          start: {
            min: 10 * HOUR,
            max: 15.5 * HOUR,
          },
        },
        {
          id: 'Do work',
          duration: 1 * HOUR,
          count: 5,
          attributes: {
            locations: ['work'],
            capabilities: {
              perhibits: ['kids'],
            },
          },
          score: 10,
          start: {
            min: 8 * HOUR,
            max: 18 * HOUR,
          },
        },
        {
          id: 'put kids to bed',
          duration: 30 * MIN,
          attributes: {
            locations: ['home'],
            capabilities: {
              consumes: ['kids'],
              requires: ['kids'],
            },
          },
          score: 1,
        },
        {
          id: 'Read book',
          duration: 0.5 * HOUR,
          attributes: {
            locations: ['home', 'work'],
            capabilities: {
              perhibits: ['kids'],
            },
          },
          score: 3,
          count: 2,
          start: {
            min: 8 * HOUR,
            max: 22 * HOUR,
          },
        },
        {
          id: 'Meditate',
          duration: 10 * MIN,
          score: 1,
          attributes: {
            locations: ['home', 'work'],
            capabilities: {
              perhibits: ['kids'],
            },
          },
          start: {
            min: 8 * HOUR,
            max: 22 * HOUR,
          },
        },
        {
          id: 'Meeting 1',
          duration: 1 * HOUR,
          attributes: {
            locations: ['work', 'work'],
            capabilities: {
              perhibits: ['kids'],
            },
          },
          score: 10,
          start: {
            min: 10 * HOUR,
            max: 10 * HOUR,
          },
        },
        {
          id: 'Play playstation',
          duration: 1 * HOUR,
          attributes: {
            locations: ['home'],
            capabilities: {
              perhibits: ['kids'],
            },
          },
          score: 10,
          start: {
            min: 16 * HOUR,
            max: 24 * HOUR,
          },
        },
      ],
    });
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

createWorker(realistic);

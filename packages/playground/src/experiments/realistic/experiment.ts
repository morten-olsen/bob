import { ExperimentInfo } from '../../features/experiment/types';

const MIN = 1000 * 60;
const HOUR = 1000 * 60 * 60;

const info: ExperimentInfo = {
  context: {
    location: 'home',
    capabilities: ['kids'],
  },
  start: 0,
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
          requires: ['kids'],
          consumes: ['kids'],
        },
      },
      score: 1,
      start: {
        min: 7 * HOUR,
        max: 9 * HOUR,
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
      start: {
        min: 18.5 * HOUR,
        max: 19.5 * HOUR,
      },
      score: 1,
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
        min: 15 * HOUR,
        max: 16 * HOUR,
      },
    },
    {
      id: `Eat breakfast`,
      duration: 15 * MIN,
      start: {
        min: 7 * HOUR,
        max: 9 * HOUR,
      },
      attributes: {
        locations: ['home'],
      },
      score: 1,
    },
    {
      id: 'Eat dinner',
      duration: 60 * MIN,
      attributes: {
        locations: ['home'],
        capabilities: {
          requires: ['kids'],
        },
      },
      score: 1,
      start: {
        min: 17 * HOUR,
        max: 22 * HOUR,
      },
    },
    {
      id: 'Have lunch',
      duration: 30 * MIN,
      attributes: {},
      score: 1,
      start: {
        min: 11 * HOUR,
        max: 13.5 * HOUR,
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
        max: 22 * HOUR,
      },
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
        locations: ['work'],
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
      id: 'Meeting 2',
      duration: 1 * HOUR,
      attributes: {
        locations: ['work'],
        capabilities: {
          perhibits: ['kids'],
        },
      },
      score: 10,
      start: {
        min: 12 * HOUR,
        max: 12 * HOUR,
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
};

export { info };

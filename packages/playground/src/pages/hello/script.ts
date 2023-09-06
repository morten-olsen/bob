import { calulation, plugins } from '@morten-olsen/bob';
import { createWorker } from '../../features/runner/worker';
import { convertResult } from '../../utils/graph';

const MIN = 1000 * 60;
const HOUR = 1000 * 60 * 60;

const getTravelTime = async () => 30 * MIN;

const realistic = async () => {
  const result = await calulation({
    location: 'home',
    time: 0,
    heuristic: ({ completed }) => completed.length >= 3,
    plugins: [
      plugins.transport({
        getTravelTime,
      }),
    ],
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
        },
        score: 1,
        start: {
          min: 7 * HOUR,
          max: 9 * HOUR,
        },
      },
      {
        id: 'Pickup the kids',
        duration: 30 * MIN,
        attributes: {
          locations: ['daycare'],
        },
        score: 1,
        start: {
          min: 15 * HOUR,
          max: 15.5 * HOUR,
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
        id: 'Do work',
        duration: 1 * HOUR,
        count: 5,
        attributes: {
          locations: ['work'],
        },
        score: 10,
        start: {
          min: 8 * HOUR,
          max: 18 * HOUR,
        },
      },
      {
        id: 'Read book',
        duration: 0.5 * HOUR,
        attributes: {
          locations: ['home', 'work'],
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
        attributes: {},
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
          locations: ['work', 'work'],
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
        },
        score: 10,
        start: {
          min: 16 * HOUR,
          max: 24 * HOUR,
        },
      },
    ],
  });
  return convertResult(result);
};

createWorker({
  realistic,
});

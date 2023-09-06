import { CalulationResult } from '@bob-the-algorithm/core';

function msToHMS(ms: number) {
  // 1- Convert to seconds:
  let seconds = ms / 1000;
  // 2- Extract hours:
  const hours = seconds / 3600; // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  // 3- Extract minutes:
  const minutes = seconds / 60; // 60 seconds in 1 minute
  // 4- Keep only seconds not extracted to minutes:
  seconds = seconds % 60;
  return hours + ':' + minutes + ':' + seconds;
}
const convertResult = (result: CalulationResult<any>) => {
  const nodes = result.nodes.map((node) => {
    let label = `root (${node.location})`;
    if (node.type === 'planable') {
      label = `task: ${node.planable!.toString()}`;
    } else if (node.type === 'travel') {
      label = `travel->${node.location}`;
    }
    return {
      id: node.id,
      label: `${msToHMS(node.time)}: ${label}`,
      data: {
        type: node.type,
        exploreId: node.exploreId,
        completed: node.completed,
        deadEnd: node.deadEnd,
      },
    };
  });
  const edges = result.nodes
    .filter((n) => n.parent)
    .map((node) => ({
      id: `${node.id}->${node.parent}`,
      source: node.parent!,
      target: node.id,
      label: node.score.toFixed(2),
    }));

  return { nodes, edges, result };
};

type ConvertedResult = ReturnType<typeof convertResult>;

export type { ConvertedResult };
export { convertResult };

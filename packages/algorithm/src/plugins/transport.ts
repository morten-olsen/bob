import { GraphNode } from '../types/node';
import { Plugin } from '../types/plugin';

type GetTravelTime = (from: string, to: string) => Promise<number>;

type TransportOptions = {
  getTravelTime: GetTravelTime;
};

type TransportAttributes = {
  locations?: string[];
};

const transport = ({
  getTravelTime,
}: TransportOptions): Plugin<TransportAttributes> => ({
  getMetaNodes: async (node) => {
    const locations =
      (node.type !== 'travel' &&
        [
          ...new Set(
            node.remaining
              .map((planable) => planable.attributes?.locations)
              .flat(),
          ),
        ]
          .filter((location) => location !== node.location)
          .filter(Boolean)
          .map((l) => l!)) ||
      [];

    const travelNodes = await Promise.all(
      locations.map<Promise<GraphNode<TransportAttributes>>>(
        async (location) => {
          const travelTime = await getTravelTime(node.location, location);
          return {
            ...node,
            type: 'travel',
            planable: undefined,
            location,
            exploreId: 0,
            score: node.score - 20,
            time: node.time + node.duration,
            duration: travelTime,
            parent: node.id,
          };
        },
      ),
    );

    return travelNodes;
  },
  isPlanable: (node, planable) => {
    if (
      planable.attributes?.locations &&
      !planable.attributes?.locations.includes(node.location)
    ) {
      return false;
    }
    return true;
  },
});

export { transport };

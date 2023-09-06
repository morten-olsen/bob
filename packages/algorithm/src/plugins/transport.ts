import { Type } from '@sinclair/typebox';
import { createPlugin } from './create';

type GetTravelTime = (from: string, to: string) => Promise<number>;

type TransportOptions = {
  getTravelTime: GetTravelTime;
};

const transport = ({ getTravelTime }: TransportOptions) =>
  createPlugin(
    Type.Object({
      locations: Type.Optional(Type.Array(Type.String())),
    }),
    Type.Object({
      location: Type.String(),
    }),
    {
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
              .filter((location) => location !== node.context.location)
              .filter(Boolean)
              .map((l) => l!)) ||
          [];

        const travelNodes = await Promise.all(
          locations.map(async (location) => {
            const travelTime = await getTravelTime(
              node.context.location,
              location,
            );
            return {
              ...node,
              type: 'travel' as const,
              context: {
                ...node.context,
                location,
              },
              planable: undefined,
              location,
              exploreId: 0,
              score: node.score - 10,
              time: node.time + node.duration,
              duration: travelTime,
              parent: node.id,
            };
          }),
        );

        return travelNodes;
      },
      isPlanable: (node, planable) => {
        if (
          planable.attributes?.locations &&
          !planable.attributes?.locations.includes(node.context.location)
        ) {
          return false;
        }
        return true;
      },
    },
  );

export { transport };

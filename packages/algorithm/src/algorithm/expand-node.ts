import { Attributes, GraphNode } from '../types/node';
import { Plugins } from '../types/plugin';
import { hasImpossible } from './is-impossible';

type ExpandOptions<
  TAttributes extends Attributes,
  TContext extends Attributes,
> = {
  node: GraphNode<TAttributes, TContext>;
  generateId: () => string;
  plugins: Plugins;
};

const expandNode = async <
  TAttributes extends Attributes,
  TContext extends Attributes,
>({
  node,
  generateId,
  plugins,
}: ExpandOptions<TAttributes, TContext>): Promise<
  GraphNode<TAttributes, TContext>[]
> => {
  const isImpossible = hasImpossible({ node });

  if (isImpossible) {
    node.deadEnd = true;
    return [];
  }

  const metaNodes = await Promise.all(
    Object.values(plugins).map(async (plugin) => {
      if (!plugin.getMetaNodes) {
        return [];
      }
      const pluginNodes = await plugin.getMetaNodes(node);
      return pluginNodes.map(
        (pluginNode) =>
        ({
          ...pluginNode,
          parent: node.id,
          exploreId: 0,
          id: generateId(),
        } as GraphNode<TAttributes>),
      );
    }),
  );

  const planables = node.remaining.filter((planable) => {
    const hasNonPlanable = Object.values(plugins).some(
      (plugin) => plugin.isPlanable && !plugin.isPlanable(node, planable),
    );
    return !hasNonPlanable;
  });

  const planableNodes = planables.map<GraphNode<TAttributes>>((planable) => {
    const decreased = node.remaining.map((remainingPlanable) => {
      if (remainingPlanable === planable) {
        return {
          ...remainingPlanable,
          count: (remainingPlanable.count || 1) - 1,
        };
      }
      return remainingPlanable;
    });
    const remaining = decreased.filter(
      (remainingPlanable) => remainingPlanable.count !== 0,
    );
    const startTime = Math.max(
      node.time + node.duration,
      planable.start?.min || 0,
    );
    return {
      ...node,
      type: 'planable',
      exploreId: 0,
      id: generateId(),
      score: node.score + planable.score,
      planable: planable.id,
      time: startTime,
      duration: planable.duration,
      remaining,
      completed: remaining.length === 0,
      parent: node.id,
    };
  });

  return [...planableNodes, ...metaNodes.flat()];
};

export { expandNode };

import { Attributes, GraphNode } from '../types/node';
import { Planable } from '../types/planable';
import { PluginAttributes, Plugins } from '../types/plugin';
import { expandNode } from './expand-node';

type CalulationOptions<TPlugins extends Plugins> = {
  location: string;
  time: number;
  planables: Planable<PluginAttributes<TPlugins>>[];
  plugins: TPlugins;
  heuristic?: (result: any) => boolean;
  onUpdated?: (result: any) => void;
};

type CalulationResult<TAttributes extends Attributes> = {
  root: GraphNode<TAttributes>;
  nodes: GraphNode<TAttributes>[];
  completed: GraphNode<TAttributes>[];
  planables: Planable<TAttributes>[];
};

const idGen = () => {
  let id = 0;
  return () => {
    id += 1;
    return id.toString();
  };
};

const calulation = async <TPlugins extends Plugins>({
  location,
  time,
  planables,
  plugins,
  heuristic,
  onUpdated,
}: CalulationOptions<TPlugins>): Promise<
  CalulationResult<PluginAttributes<TPlugins>>
> => {
  const generateId = idGen();
  let exploreId = 1;
  const root: GraphNode<PluginAttributes<TPlugins>> = {
    id: generateId(),
    type: 'root',
    score: 0,
    parent: null,
    duration: 0,
    time,
    location,
    exploreId: 0,
    remaining: planables,
  };

  const nodes: GraphNode<PluginAttributes<TPlugins>>[] = [root];
  const leafNodes: GraphNode<PluginAttributes<TPlugins>>[] = [root];
  const completed: GraphNode<PluginAttributes<TPlugins>>[] = [];

  const popHighestScore = () => {
    const highestScore = Math.max(...leafNodes.map((n) => n.score));
    const highestScoreNode = leafNodes.find((n) => n.score === highestScore);
    if (!highestScoreNode) {
      throw new Error('No highest score node');
    }
    leafNodes.splice(leafNodes.indexOf(highestScoreNode), 1);
    return highestScoreNode;
  };

  while (leafNodes.length > 0) {
    const node = popHighestScore();
    node.exploreId = exploreId++;
    const expanded = await expandNode({ node, generateId, plugins });
    nodes.push(...expanded);
    completed.push(...expanded.filter((n) => n.remaining.length === 0));
    leafNodes.push(...expanded.filter((n) => n.remaining.length > 0));
    if (heuristic && heuristic({ root, nodes, completed, planables })) {
      break;
    }
    if (onUpdated) {
      onUpdated({ root, nodes, completed, planables });
    }
  }

  return { root, nodes, completed, planables };
};

export type { CalulationOptions, CalulationResult };
export { calulation };

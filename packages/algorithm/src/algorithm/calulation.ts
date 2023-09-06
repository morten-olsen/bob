import { GraphNode } from '../types/node';
import { Planable } from '../types/planable';
import { PluginAttributes, PluginContext, Plugins } from '../types/plugin';
import { expandNode } from './expand-node';

type CalulationOptions<TPlugins extends Plugins> = {
  plugins: TPlugins;
};

type CalulationResult<TPlugins extends Plugins> = {
  root: GraphNode<PluginAttributes<TPlugins>, PluginContext<TPlugins>>;
  nodes: GraphNode<PluginAttributes<TPlugins>, PluginContext<TPlugins>>[];
  completed: GraphNode<PluginAttributes<TPlugins>, PluginContext<TPlugins>>[];
  planables: Planable<PluginAttributes<TPlugins>>[];
};

type RunOptions<TPlugins extends Plugins> = {
  start: number;
  context: PluginContext<TPlugins>;
  planables: Planable<PluginAttributes<TPlugins>>[];
  heuristic?: (result: any) => boolean;
};

class Bob<TPlugins extends Plugins> {
  #options: CalulationOptions<TPlugins>;
  #id: number = 0;

  constructor(options: CalulationOptions<TPlugins>) {
    this.#options = options;
  }

  #getNextId = (): string => {
    return (this.#id++).toString();
  };

  public run = async ({
    planables,
    start,
    context,
    heuristic,
  }: RunOptions<TPlugins>): Promise<CalulationResult<TPlugins>> => {
    const { plugins } = this.#options;
    let exploreId = 1;
    const root: GraphNode<
      PluginAttributes<TPlugins>,
      PluginContext<TPlugins>
    > = {
      id: this.#getNextId(),
      context,
      type: 'root',
      score: 0,
      parent: null,
      duration: 0,
      time: start,
      exploreId: 0,
      remaining: planables,
    };

    const nodes: GraphNode<
      PluginAttributes<TPlugins>,
      PluginContext<TPlugins>
    >[] = [root];
    const leafNodes: GraphNode<
      PluginAttributes<TPlugins>,
      PluginContext<TPlugins>
    >[] = [root];
    const completed: GraphNode<
      PluginAttributes<TPlugins>,
      PluginContext<TPlugins>
    >[] = [];

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
      const expanded = await expandNode({
        node,
        generateId: this.#getNextId,
        plugins,
      });
      nodes.push(...expanded);
      completed.push(...expanded.filter((n) => n.remaining.length === 0));
      leafNodes.push(...expanded.filter((n) => n.remaining.length > 0));
      if (heuristic && heuristic({ root, nodes, completed, planables })) {
        break;
      }
    }

    return { root, nodes, completed, planables };
  };
}

export type { CalulationOptions, CalulationResult };
export { Bob };

import { Attributes, GraphNode } from './node';
import { Planable } from './planable';

type Plugin<TAttributes extends Attributes = Attributes> = {
  getMetaNodes?: (
    node: GraphNode<TAttributes>,
  ) => Promise<GraphNode<TAttributes>[]>;
  isImpossible?: (node: GraphNode<TAttributes>) => Promise<boolean>;
  isPlanable?: (
    node: GraphNode<TAttributes>,
    planable: Planable<TAttributes>,
  ) => boolean;
};

type Plugins = Plugin[];

type PluginAttributes<TPlugins extends Plugins> = {
  [K in keyof TPlugins]: TPlugins[K] extends Plugin<infer TAttributes>
  ? TAttributes extends Attributes
  ? TAttributes
  : never
  : never;
}[number];

export type { Plugin, Plugins, PluginAttributes };

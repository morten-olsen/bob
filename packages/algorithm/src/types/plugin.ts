import { Expand, UnionToIntersection } from '../types/utils';
import { GraphNode } from './node';
import { Planable } from './planable';

type Plugin<TAttributes = any, TContext = any> = {
  context: any;
  attributes: any;
  getMetaNodes?: (
    node: GraphNode<TAttributes, TContext>,
  ) => Promise<GraphNode<TAttributes, TContext>[]>;
  isImpossible?: (node: GraphNode<TAttributes, TContext>) => Promise<boolean>;
  isPlanable?: (
    node: GraphNode<TAttributes, TContext>,
    planable: Planable<TAttributes>,
  ) => boolean;
  mutateNode?: (
    node: GraphNode<TAttributes, TContext>,
    planable: Planable<TAttributes>,
  ) => GraphNode<TAttributes, TContext>;
};

type Plugins = Record<string, Plugin>;

type PluginAttributes<TPlugins extends Plugins> = MergeRecords<{
  [K in keyof TPlugins]: TPlugins[K] extends Plugin<infer TAttributes, any>
  ? TAttributes
  : never;
}>;

type MergeRecords<T extends Record<string, any>> = Expand<
  UnionToIntersection<T[keyof T]>
>;

type PluginContext<TPlugins extends Plugins> = MergeRecords<{
  [K in keyof TPlugins]: TPlugins[K] extends Plugin<any, infer TContext>
  ? TContext
  : never;
}>;

export type { Plugin, Plugins, PluginAttributes, PluginContext };

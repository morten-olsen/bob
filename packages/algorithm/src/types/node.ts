import type { Planable } from './planable';

type Attributes = any;

type GraphNode<
  TAttributes extends Attributes = Attributes,
  TContext extends Attributes = Attributes,
> = {
  id: string;
  type: 'root' | 'planable' | 'travel';
  score: number;
  context: TContext;
  parent: string | null;
  time: number;
  exploreId: number;
  duration: number;
  planable?: string;
  remaining: Planable<TAttributes>[];
  deadEnd?: boolean;
  completed?: boolean;
};

export type { Attributes };
export { GraphNode };

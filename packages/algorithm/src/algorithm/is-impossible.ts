import { Attributes, GraphNode } from '../types/node';
import { Planable } from '../types/planable';

type IsPlanableOptions<TAttributes extends Attributes> = {
  node: GraphNode<TAttributes>;
};

const hasImpossible = <TAttributes extends Attributes>({
  node,
}: IsPlanableOptions<TAttributes>): boolean => {
  const impossible = node.remaining.find((planable: Planable) => {
    if (planable.start) {
      return planable.start.max < node.time + node.duration;
    }
    return false;
  });

  return !!impossible;
};

export { hasImpossible };

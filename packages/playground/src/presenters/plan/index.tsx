import { GraphNode } from '@bob-the-algorithm/core';
import { useMemo } from 'react';
import { Listbox, ListboxItem, cn } from '@nextui-org/react';
import { useExperimentResult } from '../../features/experiment';
import { formatTime } from '../../utils/time';

type PlanProps = {
  node: GraphNode;
  onSelect: (node: GraphNode) => void;
};

const Plan: React.FC<PlanProps> = ({ node, onSelect }) => {
  const data = useExperimentResult();
  const nodes = useMemo(() => {
    if (!data) {
      return [];
    }
    const result: GraphNode[] = [];
    let current = node;
    if (!current) {
      return [];
    }

    while (current) {
      result.push(current);
      if (!current.parent) {
        break;
      }
      current = data.nodes.find((n) => n.id === current?.parent)!;
    }

    return result.reverse();
  }, [data, node]);

  if (!data) {
    return null;
  }

  return (
    <Listbox
      variant="flat"
      aria-label="Listbox menu with descriptions"
      items={nodes}
    >
      {(node) => {
        const time = (
          <span>
            {formatTime(node.time)} - {formatTime(node.time + node.duration)}
          </span>
        );
        let title = '';
        if (node.planable) {
          const planable = data!.planables.find((n) => n.id === node.planable);
          title = `Planable: ${planable?.id}`;
        }
        if (node.type === 'travel') {
          title = `Travel: ${node.context.location}`;
        }
        return (
          <ListboxItem
            key={node.id}
            className={cn({ selected: node.id === node.id })}
            onClick={() => onSelect(node)}
            description={time}
          >
            {title}
          </ListboxItem>
        );
      }}
    </Listbox>
  );
};

export { Plan };

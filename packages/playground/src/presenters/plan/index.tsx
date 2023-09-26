import { GraphNode } from '@bob-the-algorithm/core';
import { useMemo } from 'react';
import { convertResult } from '../../utils/graph';
import { format } from 'date-fns';
import { useExperimentResult } from '../../features/experiment';
import { useSelectNode } from '../../features/experiment/hooks';

type PlanProps = {
  node: GraphNode;
};

type NodeProps = {
  node: GraphNode;
};

const Node = ({ node }: NodeProps) => {
  const selectNode = useSelectNode();
  const data = useExperimentResult();
  const planable = useMemo(() => {
    return node.planable
      ? data?.planables.find((n) => n.id === node.planable)
      : null;
  }, [node, data]);

  const time = useMemo(() => {
    const start = new Date(node.time);
    const end = new Date(start.getTime() + node.duration);
    return (
      <span>
        {format(start, 'HH:mm')} - {format(end, 'HH:mm')}
      </span>
    );
  }, [node.duration, node.time]);

  if (planable) {
    return (
      <div onClick={() => selectNode(node)}>
        {time} Planable: {planable!.id}
      </div>
    );
  }
  if (node.type === 'travel') {
    return (
      <div onClick={() => selectNode(node)}>
        {time} Travel: {node.context.location}
      </div>
    );
  }

  return null;
};

const Plan: React.FC<PlanProps> = ({ node }) => {
  const data = useExperimentResult();
  const output = useMemo(() => (data ? convertResult(data) : null), [data]);
  const nodes = useMemo(() => {
    if (!output) {
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
      current = output.result.nodes.find((n) => n.id === current?.parent)!;
    }

    return result;
  }, [output, node]);

  if (!output) {
    return null;
  }

  return (
    <>
      {nodes.map((n) => (
        <Node key={n.id} node={n} />
      ))}
    </>
  );
};

export { Plan };

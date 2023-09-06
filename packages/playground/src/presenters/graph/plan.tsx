import { GraphNode } from 'bob-the-algorithm';
import { useMemo } from 'react';
import { ConvertedResult } from '../../utils/graph';
import { format } from 'date-fns';

type PlanProps = {
  id: string;
  output: ConvertedResult;
};

type NodeProps = {
  node: GraphNode;
  output: ConvertedResult;
};

const Node = ({ node, output }: NodeProps) => {
  const planable = useMemo(() => {
    return node.planable
      ? output.result.planables.find((n) => n.id === node.planable)
      : null;
  }, [node, output]);

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
      <div>
        {time} Planable: {planable!.id}
      </div>
    );
  }
  if (node.type === 'travel') {
    return (
      <div>
        {time} Travel: {node.location}
      </div>
    );
  }

  return null;
};

const Plan: React.FC<PlanProps> = ({ id, output }) => {
  const nodes = useMemo(() => {
    const result: GraphNode[] = [];
    let current = output.result.nodes.find((n) => n.id === id);

    while (current) {
      result.push(current);
      if (!current.parent) {
        break;
      }
      current = output.result.nodes.find((n) => n.id === current?.parent);
    }

    return result;
  }, [id, output]);

  return (
    <>
      {nodes.map((n) => (
        <Node key={n.id} node={n} output={output} />
      ))}
    </>
  );
};

export { Plan };

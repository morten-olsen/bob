import { useExperimentResult } from '../../features/experiment';
import { useSelectNode } from '../../features/experiment/hooks';

const NodesView = () => {
  const data = useExperimentResult();
  const selectNode = useSelectNode();

  if (!data) {
    return null;
  }

  return (
    <div>
      {data.completed.map((node) => (
        <div onClick={() => selectNode(node)} key={node.id}>
          {node.id} {node.score}
        </div>
      ))}
    </div>
  );
};

export { NodesView };

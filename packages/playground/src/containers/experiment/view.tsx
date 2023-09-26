import { Graph } from '../../presenters/graph';
import { NodeView } from './node';
import { NodesView } from './nodes';

type ExperimentViewProps = {
  children: React.ReactNode;
};

const ExperimentView: React.FC<ExperimentViewProps> = ({ children }) => {
  return (
    <>
      <Graph />
      <NodesView />
      <NodeView />
    </>
  );
};

export { ExperimentView };

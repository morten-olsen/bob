import { useContext } from 'react';
import { ExperimentContext } from './context';

const useExperimentResult = () => {
  const { result } = useContext(ExperimentContext);
  return result?.payload;
};

const useSelectNode = () => {
  const { selectNode } = useContext(ExperimentContext);
  return selectNode;
};

const useSelectedNode = () => {
  const { selectedNode } = useContext(ExperimentContext);
  return selectedNode;
};

export { useExperimentResult, useSelectNode, useSelectedNode };

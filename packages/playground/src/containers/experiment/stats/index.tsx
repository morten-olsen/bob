import { useExperimentResult } from '../../../features/experiment';
import { useExperimentDuration } from '../../../features/experiment/hooks';

const Stats = () => {
  const data = useExperimentResult();
  const duration = useExperimentDuration();

  return (
    <div className="flex gap-2">
      <div>Nodes: {data?.nodes.length}</div>
      <div>Completed: {data?.completed.length}</div>
      <div>Duration: {duration}ms</div>
    </div>
  );
};

export { Stats };

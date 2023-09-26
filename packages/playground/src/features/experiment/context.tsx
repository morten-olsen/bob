import {
  AllPlugins,
  CalulationResult,
  GraphNode,
} from '@bob-the-algorithm/core';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ExperimentInfo } from './types';

type ExperimentResult = {
  payload: CalulationResult<AllPlugins>;
  duration: number;
};

type ExperimentContextValue = {
  result?: ExperimentResult;
  error?: any;
  loading: boolean;
  selectNode: (node?: GraphNode) => void;
  selectedNode?: GraphNode;
};

type ExperimentProviderProps = {
  children: ReactNode;
  experimentInfo: ExperimentInfo;
};

const createWorker = () =>
  new Worker(new URL('./worker.ts', import.meta.url), {
    type: 'module',
  });

const ExperimentContext = createContext<ExperimentContextValue>({
  loading: false,
  selectNode: () => { },
});

const ExperimentProvider: React.FC<ExperimentProviderProps> = ({
  children,
  experimentInfo,
}) => {
  const [result, setResult] = useState<ExperimentResult>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [selectedNode, setSelectedNode] = useState<GraphNode>();

  const selectNode = useCallback((node?: GraphNode) => {
    setSelectedNode(node);
  }, []);

  useEffect(() => {
    let workerInstance: Worker | undefined;
    const run = async () => {
      setLoading(true);
      setError(undefined);
      setResult(undefined);
      const workerInstance = createWorker();
      workerInstance.onmessage = (e) => {
        switch (e.data.type) {
          case 'error': {
            setError(e.data);
            break;
          }
          case 'output': {
            setResult(e.data);
            break;
          }
        }
        setLoading(false);
      };
      workerInstance.onerror = (e) => {
        setError(e);
        setLoading(false);
      };
      workerInstance.postMessage({
        type: 'run',
        payload: experimentInfo,
      });
    };
    run();
    return () => {
      workerInstance?.terminate();
    };
  }, [experimentInfo]);

  const value = useMemo(
    () => ({
      result,
      error,
      loading,
      selectNode,
      selectedNode,
    }),
    [result, error, loading, selectNode, selectedNode],
  );

  return (
    <ExperimentContext.Provider value={value}>
      {children}
    </ExperimentContext.Provider>
  );
};

export type { ExperimentContextValue };
export { ExperimentContext, ExperimentProvider };

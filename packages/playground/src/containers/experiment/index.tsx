import { useEffect, useState } from 'react';
import { ExperimentProvider } from '../../features/experiment/context';
import { ExperimentView } from './view';
import { ExperimentInfo } from '../../features/experiment/types';

type PageProps = {
  content: () => Promise<{ default: Experiment }>;
};

type Experiment = {
  info: ExperimentInfo;
  view: React.ComponentType;
};

const ExperimentPage: React.FC<PageProps> = ({ content }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [experiment, setExperiment] = useState<Experiment>();

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    const load = async () => {
      try {
        const { default: next } = (await content()) as {
          default: Experiment;
        };
        console.log('n', next);
        setExperiment(next);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [content]);

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  if (loading || !experiment) {
    return <div>Loading...</div>;
  }

  return (
    <ExperimentProvider experimentInfo={experiment.info}>
      <ExperimentView>
        <experiment.view />
      </ExperimentView>
    </ExperimentProvider>
  );
};

const pageImports = import.meta.glob('../../experiments/*/index.tsx');

const experiments: {
  path: string;
  element: JSX.Element;
}[] = Object.entries(pageImports).map(([path, page]) => ({
  path: path.replace('../../experiments/', '').replace('/index.tsx', ''),
  element: <ExperimentPage content={page as any} />,
}));

export { experiments };

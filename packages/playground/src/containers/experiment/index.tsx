import { useEffect, useState } from 'react';
import { experiments } from '../../utils/experiments';
import { ExperimentProvider } from '../../features/experiment/context';
import { ExperimentView } from './view';

type PageProps = {
  slug: string;
};

type Experiment = {
  worker: () => Worker;
  view: React.ReactElement;
};

const Page: React.FC<PageProps> = ({ slug }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [experiment, setExperiment] = useState<Experiment>();

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    const load = async () => {
      try {
        const page = experiments.find((page) => page.slug === slug);
        if (!page) {
          throw new Error(`Page not found: ${slug}`);
        }
        const next = (await page.loader()) as Experiment;
        console.log('n', next);
        setExperiment(next);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [slug]);

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  if (loading || !experiment) {
    return <div>Loading...</div>;
  }

  return (
    <ExperimentProvider worker={experiment.worker}>
      <ExperimentView>{experiment.view}</ExperimentView>
    </ExperimentProvider>
  );
};

export { Page };

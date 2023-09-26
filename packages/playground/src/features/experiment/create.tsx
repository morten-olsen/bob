import { ReactNode } from 'react';
import { ExperimentProvider } from './context';

type CreateExperimentInput = {
  worker: () => Worker;
  view: ReactNode;
};

const createExperiment = (input: CreateExperimentInput) => {
  return (
    <ExperimentProvider worker={input.worker}>{input.view}</ExperimentProvider>
  );
};

export { createExperiment };

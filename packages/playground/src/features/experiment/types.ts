import { AllPlugins, PlanableWithPlugins } from '@bob-the-algorithm/core';

type ExperimentInfo = {
  planables: PlanableWithPlugins<AllPlugins>[];
  context: any;
  start: number;
};

export type { ExperimentInfo };

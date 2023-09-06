import { createContext, useCallback, useMemo } from 'react';

type Vars = Record<string, unknown>;

type RunnerContextValue = {
  vars: Vars;
  run: (fn: (vars: Vars) => Promise<void>) => Promise<void>;
};

type RunnerProviderProps = {
  vars?: Vars;
  children: React.ReactNode;
};

const RunnerContext = createContext<RunnerContextValue>({
  vars: {},
  run: async () => {},
});

const RunnerProvider: React.FC<RunnerProviderProps> = ({
  vars = {},
  children,
}) => {
  const currentVars = useMemo(() => vars, [vars]);

  const run = useCallback(
    async (fn: (vars: Vars) => Promise<void>) => {
      const output = await fn(currentVars);
      return output;
    },
    [currentVars],
  );

  return (
    <RunnerContext.Provider value={{ vars, run }}>
      {children}
    </RunnerContext.Provider>
  );
};

export type { Vars };
export { RunnerContext, RunnerProvider };

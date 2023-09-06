import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { RunnerContext } from './context';

type BlockProps = {
  worker: Worker;
  action: string;
  presenter?: React.FC<any>;
};

const id = (function*() {
  let i = 0;
  while (true) {
    yield i++;
  }
})();

const Block: React.FC<BlockProps> = ({
  worker,
  action,
  presenter: Presenter,
}) => {
  const currentId = useRef(id.next().value);
  const { vars } = useContext(RunnerContext);
  const [output, setOutput] = useState<unknown>();
  const [error, setError] = useState<unknown>();
  const [running, setRunning] = useState<boolean>();
  const [duration, setDuration] = useState<number>();

  const view = useMemo(() => {
    if (error) {
      return error.toString();
    }
    if (Presenter) {
      return <Presenter output={output} />;
    }
    return JSON.stringify(output, null, 2);
  }, [output, error, Presenter]);

  const runBlock = useCallback(async () => {
    setRunning(true);
    setError(undefined);
    setOutput(undefined);

    try {
      worker.postMessage({
        type: 'run',
        action,
        vars,
        id: currentId.current,
      });
    } catch (error) {
      setError(error);
      console.error(error);
    }

    setRunning(false);
  }, [worker, vars, action]);

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const { type, payload, id, duration } = event.data;
      if (id !== currentId.current) {
        return;
      }
      setDuration(duration);
      setRunning(false);
      if (type === 'output') {
        setOutput(payload);
      }
      if (type === 'error') {
        setError(payload);
        console.error(payload);
      }
    };
    worker.addEventListener('message', listener);
    return () => {
      worker.removeEventListener('message', listener);
    };
  }, [worker]);

  return (
    <div>
      <button onClick={runBlock} disabled={running}>
        Run
      </button>
      {duration && <div>Duration: {duration.toFixed(2)}ms</div>}
      {running && <div>Running...</div>}
      {view}
    </div>
  );
};

export { Block };

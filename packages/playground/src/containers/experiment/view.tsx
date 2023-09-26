import { Content } from '../../components/content';
import { Frame } from '../../components/frame';
import { FindNodeView } from './find-node';
import { GraphView } from './graph';
import { InputView } from './input';
import { NodeView } from './node';
import { Stats } from './stats';

type ExperimentViewProps = {
  children: React.ReactNode;
};

const ExperimentView: React.FC<ExperimentViewProps> = ({ children }) => {
  return (
    <Frame>
      <div className="flex flex-row h-full">
        <div className="flex flex-col flex-1 h-full">
          <div className="flex-1">
            <Content>{children}</Content>
          </div>
          <div className="flex-initial p-2 flex gap-2 items-center">
            <GraphView />
            <InputView />
            <FindNodeView />
            <div className="flex-1" />
            <Stats />
          </div>
        </div>
        <NodeView />
      </div>
    </Frame>
  );
};

export { ExperimentView };

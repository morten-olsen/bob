import { NextUIProvider } from '@nextui-org/react';
import { Page } from './containers/experiment';

const App: React.FC = () => {
  return (
    <NextUIProvider>
      <Page slug=".capabilities" />
    </NextUIProvider>
  );
};

export { App };

import { NextUIProvider } from '@nextui-org/react';
import { Router } from './router';

const App: React.FC = () => {
  return (
    <div className="dark text-foreground bg-background">
      <NextUIProvider>
        <Router />
      </NextUIProvider>
    </div>
  );
};

export { App };

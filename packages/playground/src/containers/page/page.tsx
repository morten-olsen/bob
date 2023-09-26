import { useEffect, useState } from 'react';
import { Frame } from '../../components/frame';
import { Skeleton } from '@nextui-org/react';
import { Content } from '../../components/content';

type Props = {
  content: () => Promise<{ Page: (props: any) => JSX.Element }>;
};

const Page = ({ content }: Props) => {
  const [Component, setComponent] = useState<React.ComponentType>();
  useEffect(() => {
    const run = async () => {
      const component = await content();
      setComponent(() => component.Page);
    };
    run();
  }, [content]);

  return (
    <Frame>
      <Content>
        {!!Component ? (
          <article className="my-10">
            <Component />
          </article>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        )}
      </Content>
    </Frame>
  );
};

export { Page };

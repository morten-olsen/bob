import { useEffect, useState } from 'react';
import { pages } from '../utils/pages';
import { RunnerProvider } from '../features/runner';
type PageProps = {
  slug: string;
};

const Page: React.FC<PageProps> = ({ slug }) => {
  const [Component, setComponent] = useState<React.FC>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    const load = async () => {
      try {
        const page = pages.find((page) => page.slug === slug);
        if (!page) {
          throw new Error(`Page not found: ${slug}`);
        }
        const { default: Component } = (await page.loader()) as {
          default: React.FC;
        };
        setComponent(() => Component);
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

  if (loading || !Component) {
    return <div>Loading...</div>;
  }

  return (
    <RunnerProvider>
      <Component />
    </RunnerProvider>
  );
};

export { Page };

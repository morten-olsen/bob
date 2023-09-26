import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Button } from '@nextui-org/react';

type Experiment = {
  title: string;
  slug: string;
  description: string;
};

const experiments: Experiment[] = [
  {
    title: 'Capabilities',
    slug: 'capabilities',
    description: 'Explore the capabilities of Bob.',
  },
  {
    title: 'Packed day',
    slug: 'realistic',
    description: 'Explore the capabilities of Bob.',
  },
];

const Experiments = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Experiments</h1>
      {experiments.map(({ title, slug, description }) => (
        <Card>
          <CardBody>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <p className="text-md">{title}</p>
                <p className="text-sm">{description}</p>
              </div>
              <Button
                color="primary"
                radius="full"
                size="sm"
                variant="solid"
                onPress={() => navigate(`/experiments/${slug}`)}
              >
                Show
              </Button>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export { Experiments as Page };

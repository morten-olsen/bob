import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Card,
  CardBody,
  CardHeader,
} from '@nextui-org/react';
import { useExperimentResult } from '../../../features/experiment';
import { formatTime } from '../../../utils/time';

const InputView = () => {
  const data = useExperimentResult();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  if (!data) {
    return null;
  }
  return (
    <>
      <Button onPress={onOpen}>Show input</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Input</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              {data.planables.map((item) => {
                const description: [string, string][] = [];

                if (item.start) {
                  if (item.start.min === item.start.max) {
                    description.push(['start', formatTime(item.start.min)]);
                  } else {
                    const min = formatTime(item.start.min);
                    const max = formatTime(item.start.max);
                    description.push(['start', `${min} - ${max}`]);
                  }
                }

                if (item.count || 0 > 1) {
                  description.push(['count', item.count?.toString() || '']);
                }
                if (item.attributes.locations) {
                  description.push([
                    'locations',
                    item.attributes.locations.join(', '),
                  ]);
                }
                if (item.attributes.capabilities?.requires) {
                  description.push([
                    'requires',
                    item.attributes.capabilities.requires.join(', '),
                  ]);
                }

                if (item.attributes.capabilities?.perhibits) {
                  description.push([
                    'prohibits',
                    item.attributes.capabilities.perhibits.join(', '),
                  ]);
                }

                if (item.attributes.capabilities?.provides) {
                  description.push([
                    'provides',
                    item.attributes.capabilities.provides.join(', '),
                  ]);
                }

                if (item.attributes.capabilities?.consumes) {
                  description.push([
                    'consumes',
                    item.attributes.capabilities.consumes.join(', '),
                  ]);
                }

                description.push([
                  'duration',
                  `${item.duration / 1000 / 60} minutes`,
                ]);

                return (
                  <Card>
                    <CardHeader>{item.id}</CardHeader>
                    <CardBody>
                      <div>
                        {description.map((d) => (
                          <div className="flex justify-between">
                            <div>
                              <span className="font-bold">{d[0]}: </span>
                            </div>
                            <div>
                              <span>{d[1]}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export { InputView };

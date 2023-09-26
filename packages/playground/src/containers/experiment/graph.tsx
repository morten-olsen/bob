import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { Graph } from '../../presenters/graph';

const GraphView = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen}>Show graph</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Graph</ModalHeader>
              <ModalBody>
                <Graph />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export { GraphView };

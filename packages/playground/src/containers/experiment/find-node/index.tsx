import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Badge,
  Checkbox,
  Input,
} from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { useExperimentResult } from '../../../features/experiment';
import { useSelectNode } from '../../../features/experiment/hooks';
import { GraphNode } from '@bob-the-algorithm/core';

const FindNodeView = () => {
  const data = useExperimentResult();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [completed, setCompleted] = useState(true);
  const [text, setText] = useState('');
  const selectNode = useSelectNode();

  const nodes = useMemo(() => {
    if (!data) {
      return [];
    }
    let result = [...data.nodes];
    if (completed) {
      result = result.filter((node) => node.completed);
    }
    if (text) {
      result = result.filter((node) => node.id === text);
    }
    return result.sort((a, b) => b.score - a.score).slice(0, 10);
  }, [data, completed, text]);

  const getColor = (node: GraphNode) => {
    if (node.completed) {
      return 'success';
    }
    if (node.deadEnd) {
      return 'danger';
    }
    return 'primary';
  };

  return (
    <>
      <Button onPress={onOpen}>Find node</Button>
      <Modal
        isOpen={isOpen}
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Nodes</ModalHeader>
              <ModalBody>
                <Input
                  placeholder="Node ID"
                  value={text}
                  onValueChange={setText}
                />
                <Checkbox isSelected={completed} onValueChange={setCompleted}>
                  Completed
                </Checkbox>
                <div className="flex gap-4 flex-wrap">
                  {nodes.map((node) => (
                    <Badge
                      content={node.score}
                      color={getColor(node)}
                      key={node.id}
                    >
                      <Button
                        onClick={() => {
                          selectNode(node);
                          close();
                        }}
                        key={node.id}
                      >
                        {node.id}
                      </Button>
                    </Badge>
                  ))}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export { FindNodeView };

import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { GraphNode } from '@bob-the-algorithm/core';
import {
  useSelectNode,
  useSelectedNode,
} from '../../../features/experiment/hooks';
import { Plan } from '../../../presenters/plan';
import { useState } from 'react';
import { NodeDetailsView } from './details';
import { HorizontalPlan } from '../../../presenters/horizontal-plan';

const NodeView = () => {
  const node = useSelectedNode();
  const selectNode = useSelectNode();
  const [selectedItem, setSelectedItem] = useState<GraphNode<any>>();

  return (
    <>
      <Modal
        isOpen={!!node}
        scrollBehavior="inside"
        onClose={() => selectNode(undefined)}
      >
        <ModalContent>
          <ModalHeader>Node</ModalHeader>
          <ModalBody>
            {node && (
              <>
                <HorizontalPlan node={node} />
                <Plan node={node} onSelect={setSelectedItem} />
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <NodeDetailsView
        node={selectedItem}
        onClose={() => setSelectedItem(undefined)}
      />
    </>
  );
};

export { NodeView };

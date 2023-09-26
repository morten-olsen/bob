import { GraphNode } from '@bob-the-algorithm/core';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { format } from 'date-fns';
import { JSONTree } from 'react-json-tree';
import { useExperimentResult } from '../../../features/experiment';
import { useMemo } from 'react';

type NodeDetailsViewProps = {
  node?: GraphNode;
  onClose: () => void;
};

const NodeDetailsInfo = ({ node }: { node: GraphNode }) => {
  const data = useExperimentResult();
  const start = format(new Date(node.time), 'HH:mm');
  const planable = useMemo(() => {
    if (!data) {
      return null;
    }
    return node.planable
      ? data.planables.find((n) => n.id === node.planable)
      : null;
  }, [node, data]);
  return (
    <div>
      <h1>{node.id}</h1>
      <p>{start}</p>
      <pre></pre>
      <JSONTree data={node.context} />
      {planable && <JSONTree data={planable} />}
    </div>
  );
};

const NodeDetailsView = ({ node, onClose }: NodeDetailsViewProps) => {
  return (
    <Modal size="3xl" isOpen={!!node} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Item details</ModalHeader>
        <ModalBody>{node && <NodeDetailsInfo node={node} />}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { NodeDetailsView };

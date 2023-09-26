import { Accordion, AccordionItem } from '@nextui-org/react';
import { useSelectedNode } from '../../features/experiment/hooks';
import { Plan } from '../../presenters/plan';

const NodeView = () => {
  const node = useSelectedNode();
  if (!node) {
    return null;
  }

  return (
    <div>
      <h1>{node.id}</h1>
      <Accordion>
        <AccordionItem title="Plan" key="plan">
          <Plan node={node} />
        </AccordionItem>
        <AccordionItem title="Context" key="context">
          <pre>{JSON.stringify(node.context, null, 2)}</pre>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export { NodeView };

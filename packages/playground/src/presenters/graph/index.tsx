import { useMemo, useState } from 'react';
import { GraphCanvas } from 'reagraph';
import { useExperimentResult } from '../../features/experiment';
import { convertResult } from '../../utils/graph';
import {
  useSelectNode,
  useSelectedNode,
} from '../../features/experiment/hooks';

const Graph: React.FC = () => {
  const data = useExperimentResult();
  const selectedNode = useSelectedNode();
  const selectNode = useSelectNode();
  const output = useMemo(() => {
    if (!data) {
      return undefined;
    }
    return convertResult(data);
  }, [data]);
  const [visualize, setVisualize] = useState(false);
  const selectedPath = useMemo(() => {
    if (!selectedNode) {
      return [];
    }
    const result: string[] = [];
    let current = output?.result.nodes.find((n) => n.id === selectedNode.id);

    while (current) {
      result.push(current.id);
      if (!current.parent) {
        break;
      }
      current = output?.result.nodes.find((n) => n.id === current?.parent);
    }

    return result;
  }, [selectedNode, output]);

  if (!output) {
    return null;
  }

  console.log(output);

  return (
    <>
      Nodes count: {output.nodes.length}
      <button onClick={() => setVisualize(!visualize)}>
        {visualize ? 'Hide' : 'Show'} Visualize
      </button>
      {visualize && (
        <div style={{ position: 'relative', height: '70vh' }}>
          <GraphCanvas
            {...output}
            labelType="all"
            layoutType="hierarchicalTd"
            onNodeClick={(node) => {
              if (node.id === selectedNode?.id) {
                selectNode(undefined);
                return;
              }
              const nextNode = data?.nodes.find((n) => n.id === node.id);
              selectNode(nextNode);
            }}
            selections={selectedPath}
            renderNode={({ size, opacity, node }) => {
              let color = 'gray';
              if (node.data?.deadEnd) {
                color = 'red';
              }
              if (node.data?.completed) {
                color = 'green';
              }
              if (node.data?.type === 'root') {
                color = 'black';
              }
              return (
                <group>
                  <mesh>
                    <circleGeometry attach="geometry" args={[size]} />
                    <meshBasicMaterial
                      attach="material"
                      color={color}
                      opacity={opacity}
                      transparent
                    />
                  </mesh>
                </group>
              );
            }}
          />
        </div>
      )}
    </>
  );
};

export { Graph };

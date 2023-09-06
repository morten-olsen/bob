import { useMemo, useState } from 'react';
import { GraphCanvas } from 'reagraph';
import { ConvertedResult } from '../../utils/graph';
import { Plan } from './plan';

type PresenterProps = {
  output: ConvertedResult;
};

const Presenter: React.FC<PresenterProps> = ({ output }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [visualize, setVisualize] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | undefined>(
    undefined,
  );
  const selectedPath = useMemo(() => {
    if (!selectedNode) {
      return [];
    }
    const result: string[] = [];
    let current = output.result.nodes.find((n) => n.id === selectedNode);

    while (current) {
      result.push(current.id);
      if (!current.parent) {
        break;
      }
      current = output.result.nodes.find((n) => n.id === current?.parent);
    }

    return result;
  }, [selectedNode, output]);
  const completed = useMemo(() => {
    return (
      output?.result?.completed
        .map((c) => ({
          id: c.id,
          score: c.score,
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 10) || []
    );
  }, [output?.result?.completed]);

  const maxStep = useMemo(
    () => Math.max(...(output?.nodes?.map((n) => n.data?.exploreId) || [])),
    [output],
  );
  const collapsedNodeIds = useMemo(
    () =>
      output?.nodes
        ?.filter((n) => n.data?.exploreId > currentStep)
        .map((n) => n.id),
    [output, currentStep],
  );
  if (!output) {
    return null;
  }
  return (
    <>
      Nodes count: {output.nodes.length}
      <button onClick={() => setVisualize(!visualize)}>
        {visualize ? 'Hide' : 'Show'} Visualize
      </button>
      {visualize && (
        <>
          <button onClick={() => setCurrentStep(currentStep - 1)}>Prev</button>
          <input
            type="range"
            min={0}
            max={maxStep}
            value={currentStep}
            onChange={(e) => setCurrentStep(parseInt(e.target.value))}
          />
          <button onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
        </>
      )}
      {completed.map((c) => (
        <div key={c.id} onClick={() => setSelectedNode(c.id)}>
          {c.id} - {c.score}
        </div>
      ))}
      {selectedNode && <Plan id={selectedNode} output={output} />}
      {visualize && (
        <div style={{ position: 'relative', height: '70vh' }}>
          <GraphCanvas
            {...output}
            collapsedNodeIds={collapsedNodeIds}
            labelType="all"
            onNodeClick={(node) => {
              if (node.id === selectedNode) {
                setSelectedNode(undefined);
                return;
              }
              setSelectedNode(node.id);
            }}
            selections={selectedPath}
            renderNode={({ size, opacity, node }) => {
              let color = 'gray';
              if (
                node.data?.exploreId < currentStep &&
                node.data?.exploreId > 0
              ) {
                color = 'yellow';
              }
              if (node.data?.exploreId === currentStep) {
                color = 'blue';
              }
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

export { Presenter };

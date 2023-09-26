import { GraphNode } from '@bob-the-algorithm/core';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { useExperimentResult } from '../../features/experiment';
import { useMemo } from 'react';
import { formatTime } from '../../utils/time';

type PlanProps = {
  node: GraphNode;
};

const timespan = 24 * 60 * 60 * 1000;
const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

const HorizontalPlan: React.FC<PlanProps> = ({ node }) => {
  const data = useExperimentResult();
  const nodes = useMemo(() => {
    if (!data) {
      return [];
    }
    const result: GraphNode[] = [];
    let current = node;
    if (!current) {
      return [];
    }

    while (current) {
      result.push(current);
      if (!current.parent) {
        break;
      }
      current = data.nodes.find((n) => n.id === current?.parent)!;
    }

    return result;
  }, [data, node]);

  if (!data) {
    return null;
  }

  return (
    <div className="w-full min-h-unit-6 rounded-lg bg-gray-900 relative">
      {nodes.map((node) => {
        const time = (
          <span>
            {formatTime(node.time)} - {formatTime(node.time + node.duration)}
          </span>
        );
        let title = '';
        if (node.planable) {
          const planable = data!.planables.find((n) => n.id === node.planable);
          title = `Planable: ${planable?.id}`;
        }
        if (node.type === 'travel') {
          title = `Travel: ${node.context.location}`;
        }
        return (
          <div
            className="absolute top-0 bottom-0 h-full left-0 right-0 p-[2px] flex items-stretch justify-stretch"
            style={{
              left: `${(node.time / timespan) * 100}%`,
              width: `${(node.duration / timespan) * 100}%`,
            }}
          >
            <Popover placement="bottom" showArrow>
              <PopoverTrigger>
                <div
                  className="flex-1 rounded-[2px]"
                  style={{
                    left: `${(node.time / timespan) * 100}%`,
                    width: `${(node.duration / timespan) * 100}%`,
                    backgroundColor: `#${randomColor()}`,
                  }}
                />
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-small font-bold">{title}</div>
                  <div className="text-tiny">{time}</div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        );
      })}
    </div>
  );
};

export { HorizontalPlan };

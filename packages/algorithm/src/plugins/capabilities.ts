import { Type } from '@sinclair/typebox';
import { createPlugin } from './create';

const capabilities = () =>
  createPlugin(
    Type.Object({
      capabilities: Type.Optional(
        Type.Object({
          provides: Type.Optional(Type.Array(Type.String())),
          consumes: Type.Optional(Type.Array(Type.String())),
          requires: Type.Optional(Type.Array(Type.String())),
          perhibits: Type.Optional(Type.Array(Type.String())),
        }),
      ),
    }),
    Type.Object({
      capabilities: Type.Array(Type.String()),
    }),
    {
      isPlanable: (node, planable) => {
        const { requires = [], perhibits = [] } =
          planable.attributes?.capabilities || {};
        const capabilities = node.context.capabilities;

        if (requires.length === 0 && perhibits.length === 0) {
          return true;
        }
        const satisfiesRequire = requires.every((c) =>
          capabilities.includes(c),
        );
        const satisfiesPerhibit = !perhibits.some((c) =>
          capabilities.includes(c),
        );
        return satisfiesRequire && satisfiesPerhibit;
      },
      mutateNode: (node, planable) => {
        const { provides = [], consumes = [] } =
          planable.attributes?.capabilities || {};
        const capabilities = node.context.capabilities || [];

        const newCapabilities = [
          ...capabilities.filter((c) => !consumes.includes(c)),
          ...provides,
        ];

        return {
          ...node,
          context: {
            ...node.context,
            capabilities: newCapabilities,
          },
        };
      },
    },
  );

export { capabilities };

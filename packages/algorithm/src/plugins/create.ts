import type { TSchema, Static } from '@sinclair/typebox';
import type { Plugin } from '../types/plugin';

const createPlugin = <
  TAttribuesSchema extends TSchema,
  TContextSchema extends TSchema,
>(
  attributes: TAttribuesSchema,
  context: TContextSchema,
  plugin: Omit<
    Plugin<Static<TAttribuesSchema>, Static<TContextSchema>>,
    'attributes' | 'context'
  >,
): Plugin<Static<TAttribuesSchema>, Static<TContextSchema>> => ({
  ...plugin,
  attributes,
  context,
});

export { createPlugin };

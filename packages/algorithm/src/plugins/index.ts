import { Attributes } from '../types/node';
import { Plugin } from '../types/plugin';
import { transport } from './transport';

const plugins = {
  transport,
} satisfies Record<string, (...args: any[]) => Plugin<Attributes>>;

export { plugins };

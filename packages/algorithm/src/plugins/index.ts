import { Plugin } from '../types/plugin';
import { transport } from './transport';
import { capabilities } from './capabilities';

const plugins = {
  transport,
  capabilities,
} satisfies Record<string, (...args: any[]) => Plugin>;

export { plugins };

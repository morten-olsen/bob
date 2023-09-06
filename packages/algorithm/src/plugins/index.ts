import { Plugin } from '../types/plugin';
import { transport } from './transport';

const plugins = {
  transport,
} satisfies Record<string, (...args: any[]) => Plugin>;

export { plugins };

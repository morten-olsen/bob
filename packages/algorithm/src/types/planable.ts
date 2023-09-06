import { Attributes } from './node';

type Planable<TAttributes extends Attributes = Attributes> = {
  id: string;
  duration: number;
  score: number;
  count?: number;
  start?: {
    min: number;
    max: number;
  };
  attributes: TAttributes;
  required?: boolean;
};

export type { Planable };

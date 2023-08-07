import { Item } from './item';

export interface List {
  id: string;
  description: string;
  items: Item[];
}

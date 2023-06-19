import { GistNode } from './gistNode';

export interface Gist {
  id: string;
  description: string;
  gistNodes: GistNode[];
}

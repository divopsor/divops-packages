import { GistNode } from '../models';
import { GistFiles } from './types';

export function serializeGistNodes(nodes: GistNode[]): GistFiles {
  const result: GistFiles = {};

  for (const node of nodes) {
    result[node.id] = {
      content: JSON.stringify(node.body, null, 2),
    };
  }

  return result;
}

import { Context } from '../context';
import { Gist, GistNode } from '../models';
import { parseRawGistFiles } from '../utils/parseRawGistFiles';
import { GistFiles } from '../utils/types';

export interface ReadItemOptions {
  id: Gist['id'];
  nodeId: GistNode['id'];
}

export async function readItem({ id, nodeId }: ReadItemOptions, context: Context): Promise<GistNode> {
  const { octokit } = context;

  const { data } = await octokit.rest.gists.get({
    gist_id: id,
  });

  const gistNodes = parseRawGistFiles(data.files as GistFiles);

  const node = gistNodes.find(x => x.id === nodeId);

  if (node == null) {
    throw new Error(`${id}의 ${nodeId}를 찾을 수 없습니다.`);
  }

  return node;
}

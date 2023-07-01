import { Context } from '../context';
import { Gist, GistNode } from '../models';
import { parseRawGistFiles } from '../utils/parseRawGistFiles';
import { serializeGistNodes } from '../utils/serializeGistNode';
import { GistFiles } from '../utils/types';

export interface UpdateItemOptions {
  id: Gist['id'];
  nodeId: GistNode['id'];
  params: GistNode;
}

export async function updateItem({ id, nodeId, params }: UpdateItemOptions, context: Context): Promise<GistNode> {
  const { octokit } = context;

  const { data } = await octokit.rest.gists.update({
    gist_id: id,
    files: serializeGistNodes([{ id: nodeId, body: params.body }]),
    public: false,
  });

  if (data.files == null) {
    throw new Error(`존재하지 않습니다.`);
  }

  const gistNodes = parseRawGistFiles(data.files as GistFiles);

  const node = gistNodes.find(x => x.id === params.id);

  if (node == null) {
    throw new Error(`존재하지 않습니다.`);
  }

  return node;
}

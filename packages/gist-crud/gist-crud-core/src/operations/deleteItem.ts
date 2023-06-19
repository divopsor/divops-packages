import { Context } from '../context';
import { Gist, GistNode } from '../models';

interface DeleteItemOptions {
  id: Gist['id'];
  nodeId: GistNode['id'];
}

export async function deleteItem({ id, nodeId }: DeleteItemOptions, context: Context): Promise<void> {
  const { octokit } = context;

  await octokit.rest.gists.update({
    gist_id: id,
    files: { [nodeId]: {} },
    public: false,
  });
}

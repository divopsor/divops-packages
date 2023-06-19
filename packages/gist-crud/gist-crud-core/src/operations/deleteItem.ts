import { Context } from '../context';
import { Gist, GistFile } from '../models';

interface DeleteItemOptions {
  id: Gist['id'];
  filename: GistFile['filename'];
}

export async function deleteItem({ id, filename }: DeleteItemOptions, context: Context): Promise<void> {
  const { octokit } = context;

  await octokit.rest.gists.update({
    gist_id: id,
    files: { [filename]: {} },
    public: false,
  });
}

import { Context } from '../context';
import { Gist } from '../models';

interface DeleteListOptions {
  id: Gist['id'];
}

export async function deleteList({ id }: DeleteListOptions, context: Context): Promise<void> {
  const { octokit } = context;

  await octokit.rest.gists.delete({
    gist_id: id,
  });
}

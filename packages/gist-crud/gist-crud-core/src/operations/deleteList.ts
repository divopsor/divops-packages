import { Context } from '../context';
import { List } from '../models';

export interface DeleteListOptions {
  listId: List['id'];
}

export async function deleteList({ listId }: DeleteListOptions, context: Context): Promise<void> {
  const { octokit } = context;

  await octokit.rest.gists.delete({ gist_id: listId });
}

import { Context } from '../context';
import { List } from '../models';

export interface ExistsListOptions {
  listId: List['id'];
}

export async function existsList({ listId }: ExistsListOptions, context: Context): Promise<boolean> {
  const { octokit } = context;

  try {
    await octokit.rest.gists.get({
      gist_id: listId,
    });
    return true;
  } catch {
    return false;
  }
}

import { Context } from '../context';
import { Gist } from '../models';

export interface ExistsListOptions {
  id: Gist['id'];
}

export async function existsList({ id }: ExistsListOptions, context: Context): Promise<boolean> {
  const { octokit } = context;

  try {
    await octokit.rest.gists.get({
      gist_id: id,
    });
    return true;
  } catch {
    return false;
  }
}

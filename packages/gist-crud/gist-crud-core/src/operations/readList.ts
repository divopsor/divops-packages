import { Context } from '../context';
import { Gist } from '../models';
import { parseRawGistFiles } from '../utils';

interface ReadListOptions {
  id: Gist['id'];
}

export async function readList({ id }: ReadListOptions, context: Context): Promise<Gist> {
  const { octokit } = context;

  const { data } = await octokit.rest.gists.get({
    gist_id: id,
  });

  return {
    id: data.id ?? id,
    description: data.description ?? '',
    gistFiles: parseRawGistFiles(data.files),
  };
}

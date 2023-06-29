import { Context } from '../context';
import { Gist } from '../models';
import { parseRawGistFiles } from '../utils';
import { GistFiles } from '../utils/types';

interface ReadListOptions {
  id: Gist['id'];
}

export async function readList({ id }: ReadListOptions, context: Context): Promise<Gist> {
  const { octokit } = context;

  try {
    const { data } = await octokit.rest.gists.get({
      gist_id: id,
    });

    return {
      id: data.id ?? id,
      description: data.description ?? '',
      gistNodes: parseRawGistFiles(data.files as GistFiles),
    };
  } catch(error: any) {
    throw new Error(`리스트를 구할 수 없습니다. (id: ${id}, message: ${error.message})`);
  }
}

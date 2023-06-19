import { Gist } from '../models';
import { Context } from '../context';
import { GIST_META_FILE } from '../constants';
import { parseRawGistFiles } from '../utils';

interface CreateListOptions {
  description: string;
}

export async function createList({ description }: CreateListOptions, context: Context): Promise<Gist> {
  const { octokit } = context;

  const { data } = await octokit.rest.gists.create({
    files: {
      [GIST_META_FILE]: {
        content: JSON.stringify({ description }, null, 2)
      }
    },
    description,
    public: false,
  });

  if (data.id == null) {
    throw new Error(`생성된 gist에 ID가 없습니다. 확인이 필요합니다. (${description})`);
  }

  return {
    id: data.id,
    description: data.description ?? '',
    gistFiles: parseRawGistFiles(data.files)
  }
}

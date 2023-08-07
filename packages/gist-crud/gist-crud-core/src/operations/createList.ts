import { GIST_META_FILE } from '../constants';
import { Context } from '../context';
import { List } from '../models';
import { RawItemRecord, parseRawItems } from '../utils';

export interface CreateListOptions {
  description: string;
}

export async function createList({ description }: CreateListOptions, context: Context): Promise<List> {
  const { octokit } = context;

  const { data } = await octokit.rest.gists.create({
    files: {
      [GIST_META_FILE]: {
        content: JSON.stringify({ description }, null, 2),
      },
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
    items: parseRawItems(data.files as RawItemRecord),
  };
}

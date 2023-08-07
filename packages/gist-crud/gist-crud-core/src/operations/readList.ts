import { Context } from '../context';
import { List } from '../models';
import { parseRawItems } from '../utils';
import { RawItemRecord } from '../utils/types';

export interface ReadListOptions {
  listId: List['id'];
}

export async function readList({ listId }: ReadListOptions, context: Context): Promise<List> {
  const { octokit } = context;

  try {
    const { data } = await octokit.rest.gists.get({
      gist_id: listId,
    });

    return {
      id: data.id ?? listId,
      description: data.description ?? '',
      items: parseRawItems(data.files as RawItemRecord),
    };
  } catch(error: any) {
    throw new Error(`리스트를 구할 수 없습니다. (id: ${listId}, message: ${error.message})`);
  }
}

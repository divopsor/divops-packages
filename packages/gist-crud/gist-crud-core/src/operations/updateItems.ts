import { Context } from '../context';
import { List, Item } from '../models/index';
import { parseRawItems } from '../utils/parseRawItems';
import { serializeItems } from '../utils/serializeItems';
import { RawItemRecord } from '../utils/types';

export interface UpdateItemsOptions {
  listId: List['id'];
  items: Item[];
}

export async function updateItems({ listId, items }: UpdateItemsOptions, context: Context): Promise<Item[]> {
  const { octokit } = context;

  const { data } = await octokit.rest.gists.update({
    gist_id: listId,
    files: serializeItems(items),
    public: false,
  });

  if (data.files == null) {
    throw new Error('존재하지 않습니다.');
  }

  return parseRawItems(data.files as RawItemRecord);
}

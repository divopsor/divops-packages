import { Context } from '../context';
import { List, Item } from '../models';
import { parseRawItems } from '../utils/parseRawItems';
import { RawItemRecord } from '../utils/types';

export interface ReadItemOptions {
  listId: List['id'];
  itemId: Item['id'];
}

export async function readItem({ listId, itemId }: ReadItemOptions, context: Context): Promise<Item> {
  const { octokit } = context;

  const { data } = await octokit.rest.gists.get({
    gist_id: listId,
  });

  const gistNodes = parseRawItems(data.files as RawItemRecord);

  const node = gistNodes.find(x => x.id === itemId);

  if (node == null) {
    throw new Error(`${listId}의 ${itemId}를 찾을 수 없습니다.`);
  }

  return node;
}

import { Context } from '../context';
import { List, Item } from '../models';
import { parseRawItems } from '../utils/parseRawItems';
import { serializeItems } from '../utils/serializeItems';
import { RawItemRecord } from '../utils/types';

export interface UpdateItemOptions {
  listId: List['id'];
  itemId: Item['id'];
  item: Item;
}

export async function updateItem({ listId, itemId, item }: UpdateItemOptions, context: Context): Promise<Item> {
  const { octokit } = context;

  const { data } = await octokit.rest.gists.update({
    gist_id: listId,
    files: serializeItems([{ id: itemId, body: item.body }]),
    public: false,
  });

  if (data.files == null) {
    throw new Error(`존재하지 않습니다.`);
  }

  const items = parseRawItems(data.files as RawItemRecord);

  const result = items.find(x => x.id === item.id);

  if (result == null) {
    throw new Error(`존재하지 않습니다.`);
  }

  return result;
}

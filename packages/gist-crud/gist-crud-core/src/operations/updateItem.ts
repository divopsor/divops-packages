import { Context } from '../context';
import { List, Item } from '../models';
import { parseRawItems } from '../utils/parseRawItems';
import { serializeItems } from '../utils/serializeItems';
import { RawItemRecord } from '../utils/types';

export interface UpdateItemOptions {
  listId: List['id'];
  itemId: Item['id'];
  params: Item;
}

export async function updateItem({ listId, itemId, params }: UpdateItemOptions, context: Context): Promise<Item> {
  const { octokit } = context;

  const { data } = await octokit.rest.gists.update({
    gist_id: listId,
    files: serializeItems([{ id: itemId, body: params.body }]),
    public: false,
  });

  if (data.files == null) {
    throw new Error(`존재하지 않습니다.`);
  }

  const items = parseRawItems(data.files as RawItemRecord);

  const item = items.find(x => x.id === params.id);

  if (item == null) {
    throw new Error(`존재하지 않습니다.`);
  }

  return item;
}

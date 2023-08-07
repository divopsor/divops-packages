import { Context } from '../context';
import { List, Item } from '../models';
import { serializeItems } from '../utils/serializeItems';

export interface CreateItemOptions {
  listId: List['id'];
  item: Item;
}

export async function createItem({ listId, item }: CreateItemOptions, context: Context): Promise<List['id']> {
  const { octokit } = context;

  try {
    await octokit.rest.gists.update({
      gist_id: listId,
      files: serializeItems([item]),
      public: false,
    });

    return listId;
  } catch (error: any) {
    console.error(error.message);

    throw error;
  }
}

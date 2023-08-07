import { Context } from '../context';
import { List, Item } from '../models';

export interface DeleteItemOptions {
  listId: List['id'];
  itemId: Item['id'];
}

export async function deleteItem({ listId, itemId }: DeleteItemOptions, context: Context): Promise<void> {
  const { octokit } = context;

  await octokit.rest.gists.update({
    gist_id: listId,
    files: { [itemId]: {} },
    public: false,
  });
}

import { Context } from '../context';
import { Gist, GistNode } from '../models';
import { serializeGistNodes } from '../utils/serializeGistNode';

interface CreateItemOptions {
  id: Gist['id'];
  gistNode: GistNode;
}

export async function createItem({ id, gistNode }: CreateItemOptions, context: Context): Promise<Gist['id']> {
  const { octokit } = context;

  try {
    await octokit.rest.gists.update({
      gist_id: id,
      files: serializeGistNodes([gistNode]) as {
        [key: string]: Partial<{
          [key: string]: unknown;
        }>;
      },
      public: false,
    });

    return id;
  } catch (error: any) {
    console.error(error.message);

    throw error;
  }
}

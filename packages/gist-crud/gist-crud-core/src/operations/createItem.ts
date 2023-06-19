import { Context } from '../context';
import { Gist, GistFile } from '../models';


interface CreateItemOptions {
  id: Gist['id'];
  gistFile: GistFile;
}

export async function createItem({ id, gistFile }: CreateItemOptions, context: Context): Promise<Gist['id']> {
  const { octokit } = context;

  try {
    await octokit.rest.gists.update({
      gist_id: id,
      files: { [gistFile.filename]: { content: gistFile.content } },
      public: false,
    });

    return id;
  } catch (error: any) {
    console.error(error.message)
    throw error;
  }
}

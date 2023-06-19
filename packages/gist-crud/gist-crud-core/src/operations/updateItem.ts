import { Context } from '../context';
import { Gist, GistFile } from '../models';

interface UpdateItemOptions {
  id: Gist['id'];
  filename: GistFile['filename'];
  params: GistFile;
}

export async function updateItem({ id, filename, params }: UpdateItemOptions, context: Context): Promise<GistFile> {
  const { octokit } = context;

  const { data } = await octokit.rest.gists.update({
    gist_id: id,
    files: {
      [filename]: {
        filename: params.filename,
        content: params.content
      }
    },
    public: false,
  });

  return {
    filename: data.files?.[params.filename]!.filename!,
    content: data.files?.[params.filename]!.content!
  }
}

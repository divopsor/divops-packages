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
        content: params.content,
      },
    },
    public: false,
  });

  if (data.files == null) {
    throw new Error(`존재하지 않습니다.`);
  }

  const node = data.files[params.filename];

  if (node == null || node.filename == null || node.content == null) {
    throw new Error(`존재하지 않습니다.`);
  }

  return {
    filename: node.filename,
    content: node.content,
  };
}

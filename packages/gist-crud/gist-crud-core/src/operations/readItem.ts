import { Context } from '../context';
import { Gist, GistFile } from '../models';

interface ReadItemOptions {
  id: Gist['id'];
  filename: GistFile['filename'];
}

export async function readItem({ id, filename }: ReadItemOptions, context: Context): Promise<GistFile> {
  const { octokit } = context;

  const { data } = await octokit.rest.gists.get({
    gist_id: id,
  });

  const file = data.files?.[filename];

  if (file == null || file.filename == null || file.content == null) {
    throw new Error(`${id}에 ${filename}이 없거나 내용이 존재하지 않습니다.`);
  }

  return {
    filename: file.filename,
    content: file.content,
  };
}

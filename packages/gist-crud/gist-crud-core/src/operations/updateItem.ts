import { Gist, GistFile } from '../models';

export interface UpdateItem {
  (_: {
    id: Gist['id'];
    filename: GistFile['filename'];
    params: GistFile;
  }): Promise<GistFile>;
}

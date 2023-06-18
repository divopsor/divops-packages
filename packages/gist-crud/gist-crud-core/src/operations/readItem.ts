import { Gist, GistFile } from '../models/index';

export interface ReadItem {
  (_: { id: Gist['id']; filename: GistFile['filename'] }): Promise<GistFile>;
}

import { Gist, GistFile } from '../models';

export interface DeleteItem {
  (_: { id: Gist['id']; filename: GistFile['filename'] }): Promise<void>;
}

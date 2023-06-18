import { Gist, GistFile } from '../models';

export interface CreateItem {
  (_: { id: Gist['id']; gistFile: GistFile }): Promise<Gist['id']>;
}

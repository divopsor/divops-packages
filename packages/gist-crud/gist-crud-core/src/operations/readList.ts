import { Gist } from '../models';

export interface ReadList {
  ({ id }: { id: Gist['id'] }): Promise<Gist>;
}

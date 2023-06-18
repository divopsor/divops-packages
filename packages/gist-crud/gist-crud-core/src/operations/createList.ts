import { Gist } from '../models';

export interface CreateList {
  ({ description }: { description: string }): Promise<Gist>;
}

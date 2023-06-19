import { JsonConvertible } from '../utils';

export interface GistNode {
  id: string;
  body: JsonConvertible;
}

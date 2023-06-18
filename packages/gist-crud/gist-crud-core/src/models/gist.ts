import { GistFile } from './gistFile';

export interface Gist {
  id: string;
  description: string;
  gistFiles: GistFile[];
}

import { Octokit } from '@octokit/rest';
import { GIST_META_FILE } from '../constants';
import { GistFile } from '../models';

type RawGistFiles = Awaited<ReturnType<InstanceType<typeof Octokit>['gists']['create']>>['data']['files']

export function parseRawGistFiles(rawFiles: RawGistFiles): GistFile[] {
  const values = Object.values(rawFiles ?? {});

  const exists = values.filter(x => x != null)
    .filter(x => x?.filename != null)
    .filter(x => x?.content != null)
    .filter(x => x?.filename !== GIST_META_FILE);

  return exists
    .map(x => ({
      content: x!.content!,
      filename: x!.filename!,
    }));
}
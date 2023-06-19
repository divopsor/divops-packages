import { GIST_META_FILE } from '../constants';
import { GistNode } from '../models';
import { GistFiles, JsonConvertible } from './types';

export function parseRawGistFiles(rawFiles: GistFiles): GistNode[] {
  const values = Object.values(rawFiles ?? {});

  const exists = values.filter(<T>(t?: T | null): t is T => t != null);

  const result: GistNode[] = [];

  for (const item of exists) {
    if (
      item.filename == null ||
      typeof item.filename !== 'string' ||
      item.content == null ||
      typeof item.content !== 'string' ||
      item.filename === GIST_META_FILE
    ) {
      continue;
    }

    try {
      result.push({
        id: item.filename,
        body: JSON.parse(item.content) as JsonConvertible,
      });
    } catch {
      throw new Error(`${item.filename}의 내용이 JSON 형태가 아닙니다. (${item.raw_url as string})`);
    }
  }

  return result;
}

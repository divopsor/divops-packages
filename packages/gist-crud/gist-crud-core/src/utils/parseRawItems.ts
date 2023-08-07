import { GIST_META_FILE } from '../constants';
import { Item } from '../models/index';
import { RawItemRecord, JsonObject } from './types';

export function parseRawItems(rawItemRecord: RawItemRecord): Item[] {
  const rawItems = Object.values(rawItemRecord ?? {});

  const existsItems = rawItems.filter(<T>(t?: T | null): t is T => t != null);

  const result: Item[] = [];

  for (const item of existsItems) {
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
        body: JSON.parse(item.content) as JsonObject,
      });
    } catch {
      throw new Error(`${item.filename}의 내용이 JSON 형태가 아닙니다. (${item.raw_url as string})`);
    }
  }

  return result;
}

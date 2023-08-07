import { Item } from '../models/index';
import { RawItemRecord } from './types';

export function serializeItems(items: Item[]): RawItemRecord {
  const result: RawItemRecord = {};

  for (const item of items) {
    result[item.id] = {
      content: JSON.stringify(item.body, null, 2),
    };
  }

  return result;
}

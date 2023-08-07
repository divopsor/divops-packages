import { createContext } from '../context';
import { createItem } from './createItem';
import { createList } from './createList';
import { deleteItem } from './deleteItem';
import { deleteList } from './deleteList';
import { readItem } from './readItem';
import { updateItem } from './updateItem';

jest.setTimeout(10_000);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const token = process.env.TEST_GIST_TOKEN!;

describe('createItem은', () => {
  it('createList로 새로 생성된 리스트에서 Item을 잘 추가할 수 있다.', async () => {
    if (token == null) {
      console.log('skipped.');
      expect(1).toBe(1);
      return;
    }

    const context = createContext({
      token,
      baseUrl: 'https://api.github.com',
    });

    const { id: listId } = await createList({ description: '테스트 gist 입니다. 보이면 지워주세요.' }, context);
    expect(listId).not.toBe(null);

    const itemId = 'test';
    const body = { test: 'true' };
    const changed = { changed: 'true' };

    await createItem({ listId, item: { id: itemId, body } }, context);

    const item = await readItem({ listId, itemId }, context);

    expect(item).toMatchInlineSnapshot(`
      Object {
        "body": Object {
          "test": "true",
        },
        "id": "test",
      }
    `);

    await updateItem({ listId, itemId, params: { id: itemId, body: changed } }, context);

    const updated = await readItem({ listId, itemId }, context);

    expect(updated).toMatchInlineSnapshot(`
      Object {
        "body": Object {
          "changed": "true",
        },
        "id": "test",
      }
    `);

    await deleteItem({ listId, itemId }, context);

    let error = null;
    try {
      await readItem({ listId, itemId }, context);
    } catch (e) {
      error = e;
    }

    expect(error).toMatchInlineSnapshot(`[Error: ${listId}의 test를 찾을 수 없습니다.]`);

    await deleteList({ listId }, context);
  });
});

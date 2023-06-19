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

    const { id } = await createList({ description: '테스트 gist 입니다. 보이면 지워주세요.' }, context);
    expect(id).not.toBe(null);

    const nodeId = 'test';
    const body = { test: 'true' };
    const changed = { changed: 'true' };

    await createItem({ id, gistNode: { id: nodeId, body } }, context);

    const item = await readItem({ id, nodeId }, context);

    expect(item).toMatchInlineSnapshot(`
      Object {
        "body": Object {
          "test": "true",
        },
        "id": "test",
      }
    `);

    await updateItem({ id, nodeId, params: { id: nodeId, body: changed } }, context);

    const updated = await readItem({ id, nodeId }, context);

    expect(updated).toMatchInlineSnapshot(`
      Object {
        "body": Object {
          "changed": "true",
        },
        "id": "test",
      }
    `);

    await deleteItem({ id, nodeId }, context);

    let error = null;
    try {
      await readItem({ id, nodeId }, context);
    } catch (e) {
      error = e;
    }

    expect(error).toMatchInlineSnapshot(`[Error: ${id}의 test를 찾을 수 없습니다.]`);

    await deleteList({ id }, context);
  });
});

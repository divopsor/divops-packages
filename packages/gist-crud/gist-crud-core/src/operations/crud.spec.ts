import { createContext } from '../context';
import { createItem } from './createItem';
import { createList } from './createList';
import { deleteItem } from './deleteItem';
import { deleteList } from './deleteList';
import { readItem } from './readItem';
import { updateItem } from './updateItem';

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

    const filename = 'test';
    const content = 'test';
    const changed = 'changed';

    await createItem({ id, gistFile: { content, filename } }, context);

    const item = await readItem({ id, filename }, context);

    expect(item).toMatchInlineSnapshot(`
      {
        "content": "test",
        "filename": "test",
      }
    `);

    await updateItem({ id, filename, params: { content: changed, filename } }, context);

    const updated = await readItem({ id, filename }, context);

    expect(updated).toMatchInlineSnapshot(`
      {
        "content": "changed",
        "filename": "test",
      }
    `);

    await deleteItem({ id, filename }, context);

    let error = null;
    try {
      await readItem({ id, filename }, context);
    } catch (e) {
      error = e;
    }

    expect(error).toMatchInlineSnapshot(`[Error: `);

    await deleteList({ id }, context);
  });
});

import { CreateContextOptions, createContext, Context } from './context';
import { createItem, createList, deleteItem, deleteList, readItem, readList, updateItem , existsList } from './operations';

export { createItem, createList, deleteItem, deleteList, readItem, readList, updateItem, createContext };

export const createGistCRUD = (options: CreateContextOptions) => {
  const context = createContext(options);

  return {
    createItem: withContext(createItem, context),
    createList: withContext(createList, context),
    existsList: withContext(existsList, context),
    deleteItem: withContext(deleteItem, context),
    deleteList: withContext(deleteList, context),
    readItem: withContext(readItem, context),
    readList: withContext(readList, context),
    updateItem: withContext(updateItem, context),
  };
};

function withContext<F extends (...args: any) => any>(
  fn:F,
  context: Context
) {
  return (options:Parameters<F>[0]):ReturnType<F> => fn(options, context);
}

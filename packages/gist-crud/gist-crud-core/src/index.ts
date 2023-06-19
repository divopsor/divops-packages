import { createItem, createList, deleteItem, deleteList, readItem, readList, updateItem } from './operations';
import { CreateContextOptions, createContext } from "./context"

export * from './models';

export {
  createItem,
  createList,
  deleteItem,
  deleteList,
  readItem,
  readList,
  updateItem,
  createContext,
}

export const createGistCRUD = (options: CreateContextOptions) => {
  const context = createContext(options);

  return {
    createItem: (options: Parameters<typeof createItem>[0]) => createItem(options, context),
    createList: (options: Parameters<typeof createList>[0]) => createList(options, context),
    deleteItem: (options: Parameters<typeof deleteItem>[0]) => deleteItem(options, context),
    deleteList: (options: Parameters<typeof deleteList>[0]) => deleteList(options, context),
    readItem: (options: Parameters<typeof readItem>[0]) => readItem(options, context),
    readList: (options: Parameters<typeof readList>[0]) => readList(options, context),
    updateItem: (options: Parameters<typeof updateItem>[0]) => updateItem(options, context),
  }
}
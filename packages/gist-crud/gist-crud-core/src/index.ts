import {
  CreateItem,
  CreateList,
  DeleteItem,
  ReadItem,
  ReadList,
  UpdateItem,
} from './operations';

export interface GistCrud {
  createList: CreateList;
  createItem: CreateItem;
  readList: ReadList;
  readItem: ReadItem;
  updateItem: UpdateItem;
  deleteItem: DeleteItem;
}

export * from './models';

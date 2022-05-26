import { List, CreateListData } from './list';

export default interface ListRepository {
  getById(listId: string): Promise<List | null>;
  getByUserId(userId: string): Promise<List | null>;
  create(listToBeCreated: CreateListData): Promise<List>;
  deleat(listId: string): Promise<List>;
}

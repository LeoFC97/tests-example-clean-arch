import {
  Document,
  Model,
  model,
} from 'mongoose';
import { injectable } from 'tsyringe';
import ListRepository from '../../../interfaces/entities/list/list-repository';
import { List, CreateListData } from '../../../interfaces/entities/list/list';
import ListSchema from './list-schema';

  type ListDoc = List & Document;

@injectable()
class ListMongoDBRepository implements ListRepository {
  private model: Model<ListDoc>;

  constructor() {
    this.model = model('List', ListSchema);
  }
  async create(listToBeCreated: CreateListData): Promise<List> {
    const createdList = await this.model.create(listToBeCreated);
    return createdList;
  }
  async getByUserId(userId: string): Promise<List | null> {
    const list = await this.model.findOne({ createdBy: userId });
    return list;
  }
  deleat(listId: string): Promise<List> {
    throw new Error('Method not implemented.');
  }
  getById(listId: string): Promise<List | null> {
    throw new Error('Method not implemented.');
  }
}

export default ListMongoDBRepository;

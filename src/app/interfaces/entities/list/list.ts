import { ObjectId } from 'mongodb';
import User from '../user/user';

export interface List {
  _id: ObjectId,
  sharedWith?: User[],
  title: string,
  description?: string,
  createdAt: Date,
  updatedAt: Date,
  createdBy: User,
  deleatedAt?: Date
  itens: Item[],
}

export interface Item{
  name: string,
  finished: boolean,
}

export interface CreateListData {
  title: string,
  sharedWith?: User[],
  description?: string,
  itens: Item[],
  createdBy: string,
}

export interface CreateListBodyData {
  title: string,
  description?: string,
  itens: Item[],
}

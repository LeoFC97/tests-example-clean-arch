import { ObjectId } from 'mongodb';
import { List, CreateListBodyData, CreateListData } from '../../app/interfaces/entities/list/list';
import mockedUser from './user';

export const listThatWasCreatedMock: List = {
  _id: new ObjectId('60de40ec576f702eb2a43e19'),
  title: 'Mocked title',
  description: 'Mocked description',
  createdBy: mockedUser,
  createdAt: new Date(),
  updatedAt: new Date(),
  itens: [],
};

export const createListBodyDataMock: CreateListBodyData = {
  title: 'Mocked title',
  description: 'Mocked description',
  itens: [{
    name: 'Mocked title',
    finished: false,
  }],
};

export const CreateListDataMock: CreateListData = {
  title: 'Mocked title',
  description: 'Mocked description',
  itens: [{
    name: 'Mocked title',
    finished: false,
  }],
  createdBy: mockedUser.uuid,
};

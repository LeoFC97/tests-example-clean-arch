import container from '../../container';
import CreateListUseCase from './create-list';
import { listThatWasCreatedMock, CreateListDataMock } from '../../../test/mocks/list';
import ListMongoDBRepository from '../../drivers/mongodb/list/list-mongodb-repository';
import { CreateListData, List } from '../../interfaces/entities/list/list';
import ConflictError from '../../errors/conflict';

const listMongoDBRepository = container.resolve(ListMongoDBRepository);

let createListMongoDBRepositorySpy:
jest.SpyInstance<Promise<List>, [data: CreateListData]>;

let getByUserIdListMongoDBRepositorySpy:
jest.SpyInstance<Promise<List | null>, [data: string]>;

const makeSpies = () => {
  createListMongoDBRepositorySpy = jest.spyOn(listMongoDBRepository, 'create');
  createListMongoDBRepositorySpy.mockImplementation(
    async () => new Promise((resolve) => resolve(listThatWasCreatedMock)),
  );
  getByUserIdListMongoDBRepositorySpy = jest.spyOn(listMongoDBRepository, 'getByUserId');
  getByUserIdListMongoDBRepositorySpy.mockImplementation(
    async () => new Promise((resolve) => resolve(null)),
  );
};

describe('Create list use case', () => {
  beforeAll(() => { makeSpies(); });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const useCase = new CreateListUseCase(
    listMongoDBRepository,
  );

  test('Should throw conflict error when user already has a list', async () => {
    getByUserIdListMongoDBRepositorySpy.mockImplementationOnce(
      async () => new Promise((resolve) => resolve(listThatWasCreatedMock)),
    );
    await expect(useCase.execute(CreateListDataMock)).rejects.toThrow(ConflictError);
  });
  test('Should not throw error when user does not has a list', async () => {
    getByUserIdListMongoDBRepositorySpy.mockImplementationOnce(
      async () => new Promise((resolve) => resolve(null)),
    );
    await expect(useCase.execute(CreateListDataMock)).resolves.toBe(listThatWasCreatedMock);
  });

  test('Should return the data returned from the repository', async () => {
    const createdOccurrence = await useCase.execute(CreateListDataMock);

    expect(createdOccurrence).toStrictEqual(listThatWasCreatedMock);
  });
  test('Should only call create repository method one time', async () => {
    await useCase.execute(CreateListDataMock);

    expect(createListMongoDBRepositorySpy).toBeCalledTimes(1);
  });
  test('Should only call getById repository method one time', async () => {
    await useCase.execute(CreateListDataMock);

    expect(getByUserIdListMongoDBRepositorySpy).toBeCalledTimes(1);
  });

  test('Should call create list repository with correct data', async () => {
    await useCase.execute(CreateListDataMock);

    expect(createListMongoDBRepositorySpy).toHaveBeenCalledWith(CreateListDataMock);
  });
});

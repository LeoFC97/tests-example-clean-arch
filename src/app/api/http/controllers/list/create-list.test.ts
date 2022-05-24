import configureLocales from '../../../../../config/configure-locales';
import container from '../../../../container';
import ValidationError from '../../../../errors/validation';
import { HttpResponse } from '../../../../interfaces/http/http';
import { CreateListData, List } from '../../../../interfaces/entities/list/list';
import userMock from '../../../../../test/mocks/user';
import { listThatWasCreatedMock, createListBodyDataMock } from '../../../../../test/mocks/list';
import CreateListUseCase from '../../../../use-cases/list/create-list';
import CreateListController from './create-list';
import CreateListValidator from '../../../../validators/create-list';

const locales = configureLocales();

const createListUseCase: CreateListUseCase = container.resolve(
  CreateListUseCase,
);
const createListValidator: CreateListValidator = container.resolve(
  CreateListValidator,
);
const controller: CreateListController = new CreateListController(
  createListUseCase,
  createListValidator,
);

let createListUseCaseSpy:
jest.SpyInstance<Promise<List>, [data: CreateListData]>;

const makeHttpRequest = (body?: unknown) => ({
  user: userMock,
  body,
  i18n: locales,
});

const makeSpyOnExecuteUseCase = () => {
  createListUseCaseSpy = jest.spyOn(createListUseCase, 'execute');
  createListUseCaseSpy.mockImplementation(
    async () => new Promise((resolve) => resolve(listThatWasCreatedMock)),
  );
};

describe('Create list controller', () => {
  beforeAll(() => {
    makeSpyOnExecuteUseCase();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should throw validation error if body is empty', async () => {
    const body = {};
    await expect(() => controller.handle(makeHttpRequest(body))).rejects.toThrow(ValidationError);
  });

  test('Should throw validation error if title is not present', async () => {
    const body = { ...createListBodyDataMock, title: null };
    await expect(() => controller.handle(makeHttpRequest(body))).rejects.toThrow(ValidationError);
  });

  test('Should throw validation error if title is not a string', async () => {
    const body = { ...createListBodyDataMock, title: 123 };
    await expect(() => controller.handle(makeHttpRequest(body))).rejects.toThrow(ValidationError);
  });
  test('Should throw validation error if itens is a null array', async () => {
    const body = { ...createListBodyDataMock, itens: [null] };
    await expect(() => controller.handle(makeHttpRequest(body))).rejects.toThrow(ValidationError);
  });
  test('Should throw validation error if description is not a string', async () => {
    const body = { ...createListBodyDataMock, description: 123 };
    await expect(() => controller.handle(makeHttpRequest(body))).rejects.toThrow(ValidationError);
  });
  test('Should throw validation error another objct is sent at body', async () => {
    const body = { ...createListBodyDataMock, anotherRandomObject: 'fail test' };
    await expect(() => controller.handle(makeHttpRequest(body))).rejects.toThrow(ValidationError);
  });

  test('Should return 200 sucess if body is correct', async () => {
    const httpResponse: HttpResponse = await controller.handle(
      makeHttpRequest(createListBodyDataMock),
    );
    expect(httpResponse.status).toBe(201);
  });

  test('Should return data in the response body if request body is correct', async () => {
    const httpResponse: HttpResponse = await controller.handle(
      makeHttpRequest(createListBodyDataMock),
    );
    expect(httpResponse.body).toStrictEqual(listThatWasCreatedMock);
  });

  test('Should call create list use case with correct data', async () => {
    const data:CreateListData = { ...createListBodyDataMock, createdBy: userMock.uuid };
    await controller.handle(makeHttpRequest(createListBodyDataMock));
    expect(createListUseCaseSpy).toHaveBeenCalledWith(data);
  });

  test('Should call create list use only 1 time', async () => {
    const data:CreateListData = { ...createListBodyDataMock, createdBy: userMock.uuid };
    await controller.handle(makeHttpRequest(createListBodyDataMock));
    expect(createListUseCaseSpy).toHaveBeenCalledTimes(1);
  });

  test('Should throw if create list use case throws', async () => {
    createListUseCaseSpy.mockImplementationOnce(
      async () => new Promise((resolve, reject) => reject(new Error())),
    );
    await expect(() => controller.handle(makeHttpRequest())).rejects.toThrow(Error);
  });
});

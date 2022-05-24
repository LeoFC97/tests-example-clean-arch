import { mock } from 'jest-mock-extended';
import { Response, NextFunction } from 'express';
import Middleware, { RequestExpress } from '../../interfaces/http/express';
import { adapt } from './express-middleware-adapter';
import DecodeTokenMiddleware from '../../api/http/middlewares/token';
import TokenManager from '../../interfaces/http/token-manager';

describe('Express middleware adapter test', () => {
  test('Check if execute is called 1 time', async () => {
    const TokenManagerMocked = mock<TokenManager>();
    const MockedResponse = mock<Response>();
    const MockedNext = mock<NextFunction>(() => {});
    const MockedRequestExpress = mock<RequestExpress>();
    const objectToBeSpyied: Middleware = new DecodeTokenMiddleware(TokenManagerMocked);
    const functionUnderSpy = jest.spyOn(objectToBeSpyied, 'execute');
    functionUnderSpy.mockImplementation(() => {});
    await adapt(objectToBeSpyied)(MockedRequestExpress, MockedResponse, MockedNext);
    expect(functionUnderSpy).toBeCalledTimes(1);
  });

  test('Check if adapt return is a function', () => {
    const TokenManagerMocked = mock<TokenManager>();
    const objectToBeSpyied: Middleware = new DecodeTokenMiddleware(TokenManagerMocked);
    const adaptReturn = adapt(objectToBeSpyied);
    expect(typeof (adaptReturn)).toBe('function');
  });
});

import supertest from 'supertest';
import startExpressServer from '../../../../drivers/http/server';

describe('Test health endpoints', () => {
  test('Should not return 404', async () => {
    const apiMocked = await supertest(startExpressServer());
    const result = await apiMocked.get('/health');
    expect(result.statusCode).not.toBe(404);
  });
  test('Should return 200', async () => {
    const apiMocked = await supertest(startExpressServer());
    const result = await apiMocked.get('/health');
    expect(result.statusCode).toBe(200);
  });
});

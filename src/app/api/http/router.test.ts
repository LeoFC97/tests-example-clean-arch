/* eslint-disable max-len */
import router from './router';

describe('Check if all endpoints are declarated', () => {
  test('Should exists path /health', async () => {
    const pathToBeTested = '/health';
    const healthEndpoint = router.stack.find((endpoint) => endpoint.route.path === pathToBeTested);
    expect(healthEndpoint).toBeDefined();
  });
  test('Should exists method GET on /health', async () => {
    const pathToBeTested = '/health';
    const healthMethod = router.stack.some((endpoint) => endpoint.route.path === pathToBeTested
      && endpoint.route.methods.get);
    expect(healthMethod).toBeTruthy();
  });

  test('Should exists path /list', async () => {
    const pathToBeTested = '/list';
    const listEndpoint = router.stack.find((endpoint) => endpoint.route.path === pathToBeTested);
    expect(listEndpoint).toBeDefined();
  });

  test('Should exists method GET on /list', async () => {
    const pathToBeTested = '/list';
    const listMethod = router.stack.some((endpoint) => endpoint.route.path === pathToBeTested
      && endpoint.route.methods.post);
    expect(listMethod).toBeTruthy();
  });

  test('Should exists method POST on /list', async () => {
    const pathToBeTested = '/list';
    const healthMethod = router.stack.some((endpoint) => endpoint.route.path === pathToBeTested
      && endpoint.route.methods.post);
    expect(healthMethod).toBeTruthy();
  });
});

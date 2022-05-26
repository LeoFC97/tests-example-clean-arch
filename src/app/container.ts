import { container } from 'tsyringe';
import ListMongoDBRepository from './drivers/mongodb/list/list-mongodb-repository';
import JoiSchemaValidator from './validators/joi-schema-validator';
import JwtTokenManager from './drivers/http/jwt-token-manager';

container.register('ListMongoDBRepository', {
  useClass: ListMongoDBRepository,
});

container.register('SchemaValidator', {
  useClass: JoiSchemaValidator,
});

container.register('TokenManager', {
  useClass: JwtTokenManager,
});
export default container;

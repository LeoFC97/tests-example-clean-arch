import BaseSchemaValidator from './base-schema-validator';
import createListSchema from './schemas/create-list';

class CreateListValidator extends BaseSchemaValidator {
  constructor(
    schema = createListSchema,
  ) {
    super(schema);
  }
}

export default CreateListValidator;

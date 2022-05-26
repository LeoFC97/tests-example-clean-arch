import { Schema } from 'joi';
import { inject, autoInjectable } from 'tsyringe';
import { PartialI18n } from '../interfaces/i18n';
import Validator from '../interfaces/validator';
import SchemaValidator from '../interfaces/schema-validator';

@autoInjectable()
class BaseSchemaValidator implements Validator {
  constructor(
    private schema: Schema,
    @inject('SchemaValidator') private schemaValidator?: SchemaValidator<Schema>,
  ) {}

  async validate<T>(data: unknown, i18n: PartialI18n): Promise<T> {
    if (!this.schemaValidator) {
      throw new Error('schemaValidator is not defined');
    }

    await this.schemaValidator.validate(data, this.schema, i18n);
    return data as T;
  }
}

export default BaseSchemaValidator;

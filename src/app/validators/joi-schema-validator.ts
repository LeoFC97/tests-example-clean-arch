import { Schema, ValidationError } from 'joi';
import { injectable } from 'tsyringe';
import { PartialI18n } from '../interfaces/i18n';
import SchemaValidator from '../interfaces/schema-validator';
import JoiValidationErrorAdapter from './validation-error-adapter';

@injectable()
class JoiSchemaValidator implements SchemaValidator<Schema> {
  async validate(data: unknown, schema: Schema, i18n: PartialI18n): Promise<void> {
    try {
      await schema.validateAsync(data);
    } catch (err) {
      throw JoiValidationErrorAdapter.adapt(err as ValidationError, i18n);
    }
  }
}

export default JoiSchemaValidator;

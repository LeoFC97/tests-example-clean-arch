import { PartialI18n } from './i18n';

interface SchemaValidator<Schema> {
  validate(data: unknown, schema: Schema, i18n: PartialI18n): Promise<void>;
}

export default SchemaValidator;

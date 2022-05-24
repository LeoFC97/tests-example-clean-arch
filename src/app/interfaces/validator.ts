import { PartialI18n } from './i18n';

interface Validator {
  validate<T>(data: unknown, i18n: PartialI18n): Promise<T>;
}

export default Validator;

import { PartialI18n } from './i18n';

interface ExternalValidator {
  validate(data: unknown, i18n: PartialI18n): Promise<unknown>;
}

export default ExternalValidator;

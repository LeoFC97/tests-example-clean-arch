import { ValidationError as JoiValidationError, ValidationErrorItem } from 'joi';
import { injectable } from 'tsyringe';
import { PartialI18n } from '../interfaces/i18n';
import ValidationError from '../errors/validation';

@injectable()
export default class JoiValidationErrorAdapter {
  public static formatMessage(detail: ValidationErrorItem, i18n: PartialI18n): string {
    if (!detail.context) {
      throw new Error('Error details do not have context property.');
    }

    const { key, label, limit } = detail.context;

    const fieldKey = `${label !== key ? label : key}`;
    const fieldValues = `${fieldKey}.value`;
    const message = i18n.__mf(`message.${detail.type}`, {
      field: i18n.__(fieldKey.split('.')[0]),
      valid: i18n.__(fieldValues),
      limit,
    });

    return message;
  }

  public static adapt(error: JoiValidationError, i18n: PartialI18n): ValidationError {
    const { details } = error;
    const [detail] = details;

    const message = JoiValidationErrorAdapter.formatMessage(detail, i18n);

    const validationError = new ValidationError(message);

    return validationError;
  }
}

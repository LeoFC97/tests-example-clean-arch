import BaseSchemaValidator from './base-schema-validator';
import AdjustmentIdJoiSchema from './schemas/param-adjusment-id';

class ParamAdjustmentIdValidator extends BaseSchemaValidator {
  constructor(
    schema = AdjustmentIdJoiSchema,
  ) {
    super(schema);
  }
}

export default ParamAdjustmentIdValidator;

import Joi from 'joi';

const paramAdjustmentIdSchema = Joi.object({
  adjustmentId: Joi.string()
    .required()
    .label('adjustment.id'),
}).required();

export default paramAdjustmentIdSchema;

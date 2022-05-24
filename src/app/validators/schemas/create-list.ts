import Joi from 'joi';

const createListSchema = Joi.object({
  title: Joi.string().label('list.title').required(),
  description: Joi.string().label('list.description').required(),
  itens: Joi.array().items(
    Joi.object({
      name: Joi.string().label('list.itens.name').required(),
      finished: Joi.boolean().label('list.itens.finished').required(),
    }),
  ).label('list.itens').required(),
}).required();

export default createListSchema;

import * as Joi from '@hapi/joi';

export default class Validator {
  idParam = Joi.string()
    .required()
    .description('id is required');

  queryParams = Joi.object({
    limit: Joi.number()
      .integer()
      .min(1)
      .max(50)
      .default(10),
    page: Joi.number()
      .integer()
      .default(0),
    orders: Joi.array(),
    condition: Joi.object({}),
    fields: Joi.array()
  });

  strPhoneNumber = Joi.string().regex(/^[0-9+ ]{10,15}$/);

  strEmail = Joi.string()
    .email()
    .required();
}

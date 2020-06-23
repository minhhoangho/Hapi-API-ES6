import * as Joi from '@hapi/joi';

export default class Validator {
  idParam = Joi.string()
    .required()
    .description('id is required');

  queryParams = Joi.object({
    limit: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .default(10),
    offset: Joi.number()
      .integer()
      .default(0),
    orderBy: Joi.string().default('-id'),
    filter: Joi.object().default({}),
    fields: Joi.array()
  });

  
  queryParamsAllowedAll = Joi.object({
    limit: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .default(10)
      .allow(-1),
    offset: Joi.number()
      .integer()
      .default(0),
    orderBy: Joi.string().default('-id'),
    filter: Joi.object().default({}),
    fields: Joi.array()
  });

  strPhoneNumber = Joi.string().regex(/^[0-9+ ]{10,15}$/);

  strEmail = Joi.string().email();

  strDate = Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/);

  payloadDeleteMultiple = {
    ids: Joi.array()
      .items(
        Joi.number()
          .integer()
          .required()
      )
      .required()
  };
}

import Validator from '../../core/Validator';
import * as Joi from '@hapi/joi';
export default class UserValidator extends Validator {
  payloadLogin = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });
}

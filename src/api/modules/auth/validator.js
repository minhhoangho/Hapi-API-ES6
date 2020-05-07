import Joi from '@hapi/joi';
import Validator from '../../core/Validator';

export default class UserValidator extends Validator {
  payloadLogin = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });
}

import UserController from './controller';
import UserValidator from './validator';

class UserHandler {
  constructor(server) {
    this.controller = new UserController();
    this.validator = new UserValidator();
    server.bind(this.controller);
  }

  getMany = () => {
    return {
      tags: ['api', 'v1'],
      description: 'Get all user',
      notes: 'Return all users',
      handler: this.controller.getMany,
      auth: false,
      validate: {
        query: this.validator.queryParams
      }
    };
  };
}

export default UserHandler;

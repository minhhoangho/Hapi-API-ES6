import _ from 'lodash';
import Boom from '@hapi/boom';
import Service from '../../core/Service';
import UserRepository from './repository';
import bcrypt from '../../../services/Bcrypt';
import JWT from '../../../services/Jwt';

export default class UserService extends Service {
  static instance;

  constructor() {
    super();
    this.repository = UserRepository.getRepository();
  }

  static getService() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  getRepository() {
    return this.repository;
  }

  async login(payload) {
    const { username, password } = payload;
    const user = await this.repository.getOneUserAndRole({ username }, [
      'id',
      'fullName',
      'username',
      'password'
    ]);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return Boom.badRequest('User or password incorrect');
    }
    return _.assign(
      {
        token: JWT.issue({
          id: user.id,
          scope: user.role.name
        })
      },
      user
    );
  }
}

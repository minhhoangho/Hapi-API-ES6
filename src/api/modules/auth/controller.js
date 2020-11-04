import Controller from '../../core/Controller';
import UserService from './service';

export default class UserController extends Controller {
  constructor() {
    super();
    this.service = UserService.getService();
  }

  login(request) {
    const { payload } = request;
    return this.service.login(payload);
  }
}

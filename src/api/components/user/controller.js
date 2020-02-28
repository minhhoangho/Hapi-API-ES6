import Controller from '../../core/Controller';
import UserService from './service';

export default class UserController extends Controller {
  constructor() {
    super();
    this.service = UserService.getService();
  }

  getMe(request) {
    const { id } = request.auth.credentials;
    return this.service.getOne(id);
  }
}

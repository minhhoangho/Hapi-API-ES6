import sample from './samples';
import bcrypt from '../../../services/bcrypt';

class Factory {
  static users(number) {
    const data = [];
    data.push({
      fullName: 'Minh Hoang Ho ',
      username: 'admin',
      password: bcrypt.hashSync('123456'),
      roleId: 1
    });

    for (let i = 0; i < number - 1; i += 1) {
      data.push(sample.createUsers(2));
    }
    return data;
  }
}

export { Factory };

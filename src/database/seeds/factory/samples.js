import faker from 'faker';
import bcrypt from '../../../services/Bcrypt';

class Sample {
  createUsers = roleId => ({
    fullName: faker.name.findName(),
    username: faker.internet.userName(),
    password: bcrypt.hashSync('123456'),
    roleId
  });
}

export default new Sample();

import Bcrypt from '../../src/services/Bcrypt';

const data = [
  {
    firstName: 'Super',
    lastName: 'Admin',
    phoneNumber: '0123456787',
    password: Bcrypt.hashSync('testing'),
    roleId: 1,
  },
  {
    firstName: 'Admin',
    lastName: 'Admin',
    phoneNumber: '0123456786',
    password: Bcrypt.hashSync('testing'),
    roleId: 2,
  },
];

export default data;

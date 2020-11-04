import { Factory } from './factory';
import Role from '../models/Role';
import User from '../models/User';

exports.seed = async knex => {
  await knex('roles').del();
  await Promise.all([knex('users').del()]);
  return Role.query()
    .insertGraph([
      {
        name: 'admin',
        description: 'Admin has all the power'
      },
      {
        name: 'customer',
        description: 'Customer'
      }
    ])
    .then(() => User.query().insertGraph(Factory.users(100)));
};

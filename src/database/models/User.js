import BaseModel from './BaseModel';
import Role from './Role';

export default class User extends BaseModel {
  static $hidden = ['password'];

  static get tableName() {
    return 'users';
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      role: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'users.roleId',
          to: 'roles.id'
        }
      }
    };
  }
}

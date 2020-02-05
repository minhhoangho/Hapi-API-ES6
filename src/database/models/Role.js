import BaseModel from './BaseModel';
import User from './User';

export default class Role extends BaseModel {
  static get tableName() {
    return 'roles';
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
  static get relationMappings() {
    return {
      users: {
        relation: BaseModel.HasManyRelation,
        modelClass: User,
        join: {
          from: 'roles.id',
          to: 'users.roleId'
        }
      }
    };
  }
}

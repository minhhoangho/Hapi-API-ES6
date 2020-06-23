/* eslint-disable max-classes-per-file */
import { QueryBuilder } from 'objection';
import { buildFilter } from 'objection-filter';
import _ from 'lodash';
import Model from './config';

class CustomQueryBuilder extends QueryBuilder {
  // Some custom method.
  upsert(model) {
    if (model.id) {
      return this.update(model).where('id', model.id);
    }
    return this.insert(model);
  }

  queryBuilder(query) {
    if (query.page && query.pageSize) {
      return this.page(query.page, query.pageSize);
    }

    return this.page(0, 50);
  }

  withSoftDelete() {
    if (this._modelClass.HAS_DELETED_AT) {
      return this.whereNull(`${this._modelClass.tableName}.deletedAt`);
    }
    return this;
  }

  softDelete() {
    return this.whereNull('deletedAt').update({ deletedAt: new Date() });
  }
}

export default class BaseModel extends Model {
  static HAS_DELETED_AT = true;

  static get QueryBuilder() {
    return CustomQueryBuilder;
  }

  static get $isMultiTenantModel() {
    return false;
  }

  static queryBuilder(query) {
    if (query.limit === -1) {
      query.limit = false;
    }
    return buildFilter(this).build(query);
  }

  $formatJson(json) {
    let superJson = super.$formatJson(json);
    if (this.constructor.$hidden && this.constructor.$hidden.length > 0) {
      superJson = _.omit(superJson, this.constructor.$hidden);
    }
    return superJson;
  }
}

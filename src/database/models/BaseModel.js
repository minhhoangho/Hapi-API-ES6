import { QueryBuilder, Model } from 'objection';
import _ from 'lodash';
import Knex from '../connection';

/**
 * initial config model with knex
 */
Model.knex(Knex);

class CustomQueryBuilder extends QueryBuilder {
  // Some custom method.
  upsert(model) {
    if (model.id) {
      return this.update(model).where('id', model.id);
    }
    return this.insert(model);
  }
}

export default class BaseModel extends Model {
  static get QueryBuilder() {
    return CustomQueryBuilder;
  }

  $formatJson(json) {
    let superJson = super.$formatJson(json);
    if (this.constructor.$hidden && this.constructor.$hidden.length > 0) {
      superJson = _.omit(superJson, this.constructor.$hidden);
    }
    return superJson;
  }
}

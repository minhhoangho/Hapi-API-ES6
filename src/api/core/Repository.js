export default class Repository {
  constructor(model) {
    this.model = model;
    this.modelName = model.getTableName();
  }

  getMany(query, relationships = []) {
    query = this.model.queryBuilder(query).withSoftDelete();
    return this.linkRelationships(query, relationships);
  }

  count() {
    return this.model
      .query()
      .withSoftDelete()
      .count('id as count')
      .first();
  }

  getByIds(ids, columns = ['*']) {
    return this.model
      .query()
      .withSoftDelete()
      .whereIn('id', ids)
      .select(columns);
  }

  getById(id, columns = ['*'], relationships = []) {
    const query = this.model
      .query()
      .withSoftDelete()
      .findById(id)
      .select(columns);
    return this.linkRelationships(query, relationships);
  }

  getOne(clauses = {}, columns = ['*'], relationships = []) {
    const query = this.model
      .query()
      .withSoftDelete()
      .findOne(clauses)
      .select(columns);
    return this.linkRelationships(query, relationships);
  }

  create(payload) {
    return this.model
      .query()
      .insert(payload)
      .returning('*');
  }

  createMany(data) {
    return this.model
      .query()
      .insert(data)
      .returning('*');
  }

  updateOne(id, payload) {
    return this.model
      .query()
      .withSoftDelete()
      .patchAndFetchById(id, payload);
  }

  updateMany(payload) {
    return this.model.query().upsertGraph(payload, { noDelete: true });
  }

  deleteOne(id) {
    const query = this.model.query();
    if (this.model.HAS_DELETED_AT) {
      return query.where('id', id).softDelete();
    }
    return query.deleteById(id);
  }

  deleteMultiple(ids) {
    const query = this.model.query().whereIn('id', ids);
    if (this.model.HAS_DELETED_AT) {
      return query.softDelete();
    }
    return query.delete();
  }

  linkRelationships(query, relationships) {
    relationships.forEach(relationship => {
      query.withGraphFetched(relationship);
    });
    return query;
  }
}

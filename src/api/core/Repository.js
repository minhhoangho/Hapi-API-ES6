export default class Repository {
  constructor(model) {
    this.model = model;
    this.modelName = model.getTableName();
  }

  getMany({
    page = 0,
    limit = 10,
    condition = {},
    fields = ['*'],
    orders = [
      {
        column: 'id',
        order: 'asc'
      }
    ]
  }) {
    if (this.model.deleted_at && condition && condition.deletedAt === undefined) {
      condition.deleted_at = null;
    }

    return this.model
      .query()
      .where(condition)
      .orderBy(orders)
      .select(fields)
      .page(page, limit);
    // return this.model.findAndCountAll(options);
  }

  count() {
    return this.model
      .query()
      .count('id as count')
      .first();
  }

  getById(id) {
    return this.model.query().findById(id);
  }

  getOne(clauses = {}, columns = ['*']) {
    return this.model
      .query()
      .findOne(clauses)
      .select(columns);
  }

  createUser(payload) {
    return this.model
      .query()
      .insert(payload)
      .returning('*');
  }

  createOne(payload) {
    return this.model
      .query()
      .insert(payload)
      .returning('*');
  }

  updateOne(id, payload) {
    return this.model.query().patchAndFetchById(id, payload);
  }

  deleteOne(id) {
    return this.model.query().deleteById(id);
  }
}

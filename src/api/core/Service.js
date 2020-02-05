import Boom from '@hapi/boom';

export default class Service {
  repository = null;
  getMany(query) {
    return this.repository.getMany(query);
  }

  count() {
    return this.repository.count();
  }

  async getOne(id) {
    const result = await this.repository.getById(id);
    if (!result) {
      throw Boom.notFound(`${this.repository.modelName} not found`);
    }
    return result;
  }

  createOne(payload) {
    return this.repository.createOne(payload);
  }

  async updateOne(id, payload) {
    const result = await this.repository.updateOne(id, payload);
    if (!result) {
      throw Boom.notFound(`${this.repository.modelName} not found`);
    }
    return result;
  }

  async deleteOne(id) {
    await this.repository.deleteOne(id);
    return {
      success: true
    };
  }
}
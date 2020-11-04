import Boom from '@hapi/boom';

export default class Service {
  repository = null;

  getMany(query) {
    return this.repository.getMany(query);
  }

  getByIds(ids) {
    return this.repository.getByIds(ids);
  }

  async getOne(id) {
    const result = await this.repository.getById(id);
    if (!result) {
      throw Boom.notFound(`${this.repository.modelName} not found`);
    }
    return result;
  }

  create(data) {
    return this.repository.create(data);
  }

  async updateOne(id, payload) {
    const result = await this.repository.updateOne(id, payload);
    if (!result) {
      throw Boom.notFound(`${this.repository.modelName} not found`);
    }
    return result;
  }

  updateMany(payload) {
    return this.repository.updateMany(payload);
  }

  async deleteOne(id) {
    await this.repository.deleteOne(id);
    return { success: true };
  }

  async deleteMultiple(ids) {
    await this.repository.deleteMultiple(ids);
    return { success: true };
  }
}

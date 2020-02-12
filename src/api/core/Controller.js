export default class Controller {
  getMany(request) {
    return this.service.getMany(request.query);
  }

  count(request) {
    return this.service.count();
  }

  getOne(request) {
    const { id } = request.params;
    return this.service.getOne(id);
  }

  createOne(request) {
    const { payload } = request;
    return this.service.createOne(payload);
  }

  updateOne(request) {
    const { params, payload } = request;
    const { id } = params;
    return this.service.updateOne(id, payload);
  }

  deleteOne(request) {
    const { id } = request.params;
    return this.service.deleteOne(id);
  }
}

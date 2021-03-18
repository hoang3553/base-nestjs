export class BaseService<T, V, X> {
  // eslint-disable-next-line @typescript-eslint/tslint/config
  _model: any;

  async createOne(createBody: V): Promise<T> {
    const result = await this._model.create(createBody);
    return result.toJSON();
  }

  findAll(): Promise<T[]> {
    return this._model.find().lean();
  }

  findOne(id: string): Promise<T[]> {
    return this._model.findById(id).lean();
  }

  async updateOne(id: string, updateBody: X): Promise<T> {
    const record = await this._model.findById(id);
    if (!record) {
      throw Error('');
    }
    const result = await this._model.findByIdAndUpdate(id, updateBody);
    return result.toJSON();
  }

  async removeOne(id: string): Promise<string> {
    await this._model.findByIdAndRemove(id);
    return id;
  }
}

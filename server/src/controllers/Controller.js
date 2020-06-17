import { getRepository } from "typeorm";

export default class {
  constructor(Repository) {
    this.Repository = Repository;
  }
  async add(data = {}) {
    const repository = new this.Repository();
    Object.keys(data).forEach((key) => {
      repository[key] = data[key];
    });
    return await repository.save();
  }
  async find(query = {}) {
    return await getRepository(this.Repository).find(query);
  }
  async findOne(query = {}) {
    return await getRepository(this.Repository).findOne(query);
  }
  async update(req, res) {
    res.send("ok");
  }
  async delete(id = "") {
    const repository = await getRepository(this.Repository).findOne(id);
    return await repository.remove();
  }
}

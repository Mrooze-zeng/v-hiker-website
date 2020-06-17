import { getRepository } from "typeorm";
import { PostEntity } from "../entity";
export default {
  Query: {
    async getPosts(_, {}) {
      return await PostEntity.getByTitle();
    },
    async getPost(_, { id }, { req }) {
      return await getRepository(PostEntity).findOne(id);
    },
  },
  Mutation: {
    async addPost(_, { title, name, text, description }) {
      const post = new PostEntity({
        title,
        text,
        name,
        description,
      });
      // post.title = title;
      // post.name = name;
      // post.text = text;
      // post.description = description;
      return await post.save();
    },
    async updatePost(_, { id, title, text }) {
      const post = await getRepository(PostEntity).findOne(id);
      post.title = title;
      post.text = text;
      return await post.save();
    },
    async deletePost(_, { id }) {
      const post = await getRepository(PostEntity).findOne(id);
      return await post.remove();
    },
  },
};

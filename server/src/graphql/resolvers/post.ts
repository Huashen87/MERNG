import { AuthenticationError, UserInputError } from 'apollo-server';
import Post from '../../models/Post';
import { getUserPayloadFromRequest } from '../../util/token';
import { Context } from '../contextType';

const postResolver = {
  Query: {
    deleteAllPosts: async () => {
      await Post.deleteMany({});
      return true;
    },
    getPosts: async () => await Post.find({}),
    getPost: async (id: string) => {
      const post = await Post.findById(id);
      if (!post) throw new Error('post not found');
      return post;
    },
  },
  Mutation: {
    createPost: async (_: any, { body }: any, { req, pubsub }: Context) => {
      if (body.trim() === '')
        throw new UserInputError('post can not be empty', {
          field: 'body',
        });

      const { username } = getUserPayloadFromRequest(req);

      const post = await Post.create({
        username,
        body,
        createdAt: new Date().toISOString(),
      });

      pubsub.publish('NEW_POST', {
        newPost: post,
      });

      return post;
    },
    deletePost: async (_: any, { id }: any, { req }: Context) => {
      const post = await Post.findById(id);
      if (!post) throw new Error('post not found');

      const { username } = getUserPayloadFromRequest(req);
      if (username !== post.username) throw new AuthenticationError('action not allowed');

      await post.delete();

      return post;
    },
    toggleLike: async (_: any, { postId }: any, { req }: Context) => {
      const post = await Post.findById(postId);
      if (!post) throw new Error('post not found');

      const { username } = getUserPayloadFromRequest(req);
      const index = post.likes.findIndex((c) => c.username === username);

      if (index < 0) post.likes.push({ username, createdAt: new Date().toISOString() });
      else post.likes.splice(index, 1);

      await post.save();

      return post;
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_: any, __: any, { pubsub }: Context) => pubsub.asyncIterator('NEW_POST'),
    },
  },
};

export default postResolver;

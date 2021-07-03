import { AuthenticationError, UserInputError } from 'apollo-server';
import { getUserPayloadFromRequest } from '../../util/token';
import Post from '../../models/Post';
import { Context } from '../contextType';

const commentResolver = {
  Mutation: {
    createComment: async (_: any, { postId, body }: any, { req }: Context) => {
      if (body.trim() === '') throw new UserInputError('comment can not be empty');

      const post = await Post.findById(postId);
      if (!post) throw new Error('post not found');

      const { username } = getUserPayloadFromRequest(req);
      post.comments.push({
        body,
        username,
        createdAt: new Date().toISOString(),
      });

      await post.save();

      return post;
    },
    deleteComment: async (_: any, { postId, commentId }: any, { req }: Context) => {
      const post = await Post.findById(postId);
      if (!post) throw new Error('post not found');

      const index = post.comments.findIndex((c) => (c as any)._id == commentId);
      if (index < 0) throw new Error('comment not found');

      const { username } = getUserPayloadFromRequest(req);
      if (post.comments[index].username !== username)
        throw new AuthenticationError('action not allowed');

      post.comments.splice(index, 1);
      await post.save();

      return post;
    },
  },
};

export default commentResolver;

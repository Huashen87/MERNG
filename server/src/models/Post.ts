import { model, Schema, Document } from 'mongoose';

interface Post {
  body: string;
  username: string;
  createdAt: string;
  comments: Comment[];
  likes: Like[];
  user: string;
}

interface Comment {
  body: string;
  username: string;
  createdAt: string;
}

interface Like {
  username: string;
  createdAt: string;
}

interface PostModel extends Post, Document {}

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

export default model<PostModel>('Post', postSchema);

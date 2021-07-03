import { ApolloServer, PubSub } from 'apollo-server';
import mongoose from 'mongoose';

import { MONGODB } from './config';

import typeDefs from './graphql/types/typeDefs';
import resolvers from './graphql/resolvers/resolvers';

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log('Server running at ' + res.url);
  });

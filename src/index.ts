import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';

import { MONGODB } from './config';

import typeDefs from './graphql/types/typeDefs';
import resolvers from './graphql/resolvers/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

console.log(MONGODB);

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log('Server running at ' + res.url);
  });

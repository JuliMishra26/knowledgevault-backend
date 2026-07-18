import { ApolloServer } from '@apollo/server';

import { healthTypeDefs } from './schema/health.schema';
import { healthResolver } from './resolvers/health.resolver';

import { authTypeDefs } from '../modules/auth/auth.schema';
import { authResolver } from '../modules/auth/auth.resolver';

export const apolloServer = new ApolloServer({
  typeDefs: [healthTypeDefs, authTypeDefs],
  resolvers: {
    Query: {
      ...healthResolver.Query,
      ...authResolver.Query,
    },
    Mutation: {
      ...authResolver.Mutation,
    },
  },
});

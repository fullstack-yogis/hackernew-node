const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Vote = require('./resolvers/Vote');
const Subscription = require('./resolvers/Subscription');
const express = require('express');
const path = require('path');

// let links = [{ id: 'link-0', url: 'www.google.com', description: 'google' }];
// let idCount = links.length;
// 2
const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
};

const opts = {
  port: 4000,
  endpoint: '/graphql',
  // subscriptions: '/subscriptions',
  playground: '/playground',
};
// 3
const server = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  resolvers,
  opts,
  context: request => {
    return {
      ...request,
      prisma,
    };
  },
});

// server.express.use('/public', express.static(__dirname + '../public'));
server.express.use(express.static(path.join(__dirname, '..', 'public')));

server.start(opts, ({ port }) =>
  console.log(`Server is running on http://localhost:${port}`)
);

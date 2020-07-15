const express = require('express');
const { makeExecutableSchema } = require('graphql-tools');
const { graphqlHTTP } = require('express-graphql');
const { readFileSync } = require('fs');
const { join } = require('path');
const config = require('./config/config');
const resolvers = require('./lib/graphql/resolvers');

const app = express();
const port = config.port;
const isDev = config.node_dev;

const typeDefs = readFileSync(
  join(__dirname, 'lib/graphql', 'schema.graphql'),
  'utf-8'
);

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(
  '/api',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

const server = app.listen(port, () => {
  console.log(
    `Server is listening at http://localhost:${server.address().port}/api`
  );
});

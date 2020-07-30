const express = require('express');
const { makeExecutableSchema } = require('graphql-tools');
const { graphqlHTTP } = require('express-graphql');
const { readFileSync } = require('fs');
const cors = require('cors');
const { join } = require('path');
const config = require('./config/config');
const resolvers = require('./graphql/resolvers');
const { graphqlUploadExpress } = require('graphql-upload');

const app = express();
const port = config.port;
const isDev = config.node_dev;

const typeDefs = readFileSync(
  join(__dirname, 'graphql', 'schema.graphql'),
  'utf-8'
);

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors());

app.use(
  '/',
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

const server = app.listen(port, () => {
  console.log(
    `Server is listening at http://localhost:${server.address().port}`
  );
});

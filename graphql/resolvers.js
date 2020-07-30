'use strict';

const queries = require('./queries');
const mutations = require('./mutations');
const { GraphQLUpload } = require('graphql-upload');

module.exports = {
  Query: queries,
  Mutation: mutations,
  Upload: GraphQLUpload,
};

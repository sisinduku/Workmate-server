const { GraphQLSchema } = require('graphql')

const QuerySchema = require('./QuerySchema')

const RootSchema = new GraphQLSchema({
  query: QuerySchema
})

module.exports = RootSchema

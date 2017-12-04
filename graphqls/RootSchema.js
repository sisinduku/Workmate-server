const { GraphQLSchema } = require('graphql')

const QuerySchema = require('./QuerySchema')
const MutationSchema = require('./MutationSchema')

const RootSchema = new GraphQLSchema({
  query: QuerySchema,
  mutation: MutationSchema
})

module.exports = RootSchema

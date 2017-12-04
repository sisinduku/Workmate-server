const { GraphQLInputObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLNonNull } = require('graphql')

const JobSeekerInputSchema = new GraphQLInputObjectType({
  name: 'JobSeekerInput',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    location: {
      type: GraphQLString
    },
    educations: {
      type: new GraphQLList(GraphQLString)
    },
    skills: {
      type: new GraphQLList(GraphQLString)
    },
    password: {
      type: GraphQLString
    },
    executive_summary: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: GraphQLString
    }
  }
})

module.exports = JobSeekerInputSchema

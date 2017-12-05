const { GraphQLInputObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLNonNull } = require('graphql')

const JobSeekerInputSchema = new GraphQLInputObjectType({
  name: 'JobSeekerInput',
  fields: {
    name: {
      type: GraphQLString
    },
    location: {
      type: GraphQLString
    },
    email: {
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
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  }
})

module.exports = JobSeekerInputSchema

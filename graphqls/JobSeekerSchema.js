const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLNonNull } = require('graphql')

const JobSeekerSchema = new GraphQLObjectType({
  name: 'JobSeeker',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
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
      type: GraphQLString
    },
    personality_insight: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  }
})

module.exports = JobSeekerSchema

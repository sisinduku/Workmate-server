const { GraphQLObjectType, GraphQLFloat } = require('graphql')

const JobSeekerSchema = require('./JobSeekerSchema');

const JobSeekerByPersonalitySchema = new GraphQLObjectType({
  name: 'JobSeekerByPersonality',
  fields: {
    jobSeeker: {
      type: JobSeekerSchema
    },
    similarity: {
      type: GraphQLFloat
    }
  }
})

module.exports = JobSeekerByPersonalitySchema

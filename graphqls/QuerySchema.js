const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = require('graphql')

const JobSeekerSchema = require('./JobSeekerSchema')
const JobSeekerByPersonalitySchema = require('./JobSeekerByPersonalitySchema')
const CriteriaInputSchema = require('./CriteriaInputSchema')

const similarityPersonality = require('../lib/similarityPersonality')

const JobSeeker = require('../models/JobSeeker')

const QuerySchema = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getJobSeeker: {
      type: JobSeekerSchema,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: async (_, { _id }) => {
        try {
          const jobSeeker = await JobSeeker.findOne({ _id: _id });
          return jobSeeker;
        }
        catch (err) {
          return err;
        }
      }
    },
    jobSeekersByPersonality: {
      type: new GraphQLList(JobSeekerByPersonalitySchema),
      args: {
        criteria: {
          type: CriteriaInputSchema
        }
      },
      resolve: async (_, { criteria }) => {
        try {
          const jobSeekers = await JobSeeker.find({ personality_insight: {$ne: null} });
          return jobSeekers.map(jobSeeker => ({
            jobSeeker,
            similarity: similarityPersonality(criteria, JSON.parse(jobSeeker.personality_insight))
          }))
        }
        catch (err) {
          return err
        }
      }
    }
  }
})

module.exports = QuerySchema

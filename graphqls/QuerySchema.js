const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = require('graphql')

const JobSeekerSchema = require('./JobSeekerSchema')
const JobSeekerByPersonalitySchema = require('./JobSeekerByPersonalitySchema')
const EmployerSchema = require('./EmployerSchema')
const CriteriaInputSchema = require('./CriteriaInputSchema')

const similarityPersonality = require('../lib/similarityPersonality')

const JobSeeker = require('../models/JobSeeker')
const Employer = require('../models/Employer')

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
          throw new Error(err)
        }
      }
    },
    getJobSeekers: {
      type: new GraphQLList(JobSeekerSchema),
      resolve: async () => {
        try {
          const jobSeekers = await JobSeeker.find({});
          return jobSeekers;
        }
        catch (err) {
          throw new Error(err)
        }
      }
    },
    getEmployer: {
      type: EmployerSchema,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: async (_, { _id }) => {
        try {
          const employer = await Employer.findOne({ _id: _id });
          return employer;
        }
        catch (err) {
          throw new Error(err)
        }
      }
    },
    getEmployers: {
      type: new GraphQLList(EmployerSchema),
      resolve: async () => {
        try {
          const employers = await Employer.find({});
          return employers;
        }
        catch (err) {
          throw new Error(err)
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
          throw new Error(err)
        }
      }
    }
  }
})

module.exports = QuerySchema

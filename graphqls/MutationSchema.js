const { GraphQLObjectType } = require('graphql')
const crypto = require('crypto')

const JobSeekerInputSchema = require('./JobSeekerInputSchema')
const JobSeekerSchema = require('./JobSeekerSchema')

const requestPersonality = require('../lib/requestPersonality')
const Redis = require('../lib/Redis')

const JobSeeker = require('../models/JobSeeker')

const MutationSchema = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    postJobSeeker: {
      type: JobSeekerSchema,
      args: {
        jobSeeker: {
          type: JobSeekerInputSchema
        }
      },
      resolve: async (_, { jobSeeker }) => {
        try {
          let newPass=crypto.createHash('md5').update(jobSeeker.password).digest('hex');
          jobSeeker.password=newPass
          if (jobSeeker.executive_summary.length<100) {
            throw new Error('your executive summary must >= 100')
          } else {
            return new Promise((resolve, reject) => {
              requestPersonality(jobSeeker.executive_summary)
                .then(personality => {
                  jobSeeker.personality_insight = JSON.stringify(personality)
                  JobSeeker.create(jobSeeker)
                  .then(dataJobSeeker => {
                    resolve(dataJobSeeker)
                  })
                  .catch(err => {
                    reject(new Error(err))
                  })
                })
                .catch(err => {
                  reject(new Error(err))
                })
            })
          }
        } catch (e) {
          throw new Error(e)
        }
      }
    }
  }
})

module.exports = MutationSchema

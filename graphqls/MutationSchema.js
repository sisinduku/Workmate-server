const { GraphQLObjectType, GraphQLID, GraphQLNonNull } = require('graphql')
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
    },
    updateJobSeeker: {
      type: JobSeekerSchema,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLID)
        },
        jobSeeker: {
          type: JobSeekerInputSchema
        }
      },
      resolve: async (_, { _id, jobSeeker }) => {
        try {
          return new Promise((resolve, reject) => {
            JobSeeker.findOne({_id:_id})
              .then(async (dataExist) => {
                if (dataExist.executive_summary !== jobSeeker.executive_summary) {
                  let promisePersonality = await requestPersonality(jobSeeker.executive_summary)
                  jobSeeker.personality_insight = JSON.stringify(promisePersonality)
                }
                JobSeeker.findOneAndUpdate({
                    _id:_id
                  },jobSeeker
                )
                .then(dataJobSeeker => {
                  resolve(dataJobSeeker)
                })
                .catch(err => {
                  reject(err)
                })
              })
              .catch(err => {
                reject(err)
              })
          })
        } catch (e) {
          throw new Error(e)
        }
      }
    }
  }
})

module.exports = MutationSchema

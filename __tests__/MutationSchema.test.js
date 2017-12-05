const { graphql } = require('graphql')
const fs = require('fs')
const crypto = require('crypto')

const { afterTestHelper, beforeTestHelper } = require('../helpers/TestHelper')
const RootSchema = require('../graphqls/RootSchema')

let text = fs.readFileSync('./__mockData__/profile.txt', 'utf-8')
text = text.replace(/\r?\n|\r/g, '')

jest.mock('watson-developer-cloud/personality-insights/v3', () => jest.fn())
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3')
const insight = require('../__mockData__/user1.json');
PersonalityInsightsV3.mockImplementation(() => ({
  profile: jest.fn((obj, cb) => cb(null, insight))
}))

describe('Testing Mutation GraphQL', () => {
  beforeAll(async (done) => {
    await beforeTestHelper()
    done()
  })
  afterAll(async (done) => {
    await afterTestHelper()
    done()
  })

  test('Testing postJobSeeker Mutation', async () => {
    const strText = '"'+ text.replace(/"/g, "'") + '"'
    const query = `
      mutation {
        postJobSeeker (jobSeeker: {
          name : "zaim",
          location : "bogor",
          email: "halo@halo.com",
          educations : ["bachelor"],
          skills : ["can remember many thing"],
          executive_summary : ${strText},
          password: "a"
        }) {
          name
          location
          email
          educations
          skills
          executive_summary
          personality_insight
          password
        }
      }
    `
    const result = await graphql(RootSchema, query)
    expect(result).toHaveProperty('data')
    expect(result.data).toHaveProperty('postJobSeeker')
    expect(result.data.postJobSeeker).toMatchObject({
      name : "zaim",
      location : "bogor",
      email: "halo@halo.com",
      educations : ["bachelor"],
      skills : ["can remember many thing"],
      executive_summary : text.replace(/"/g, "'"),
      personality_insight : JSON.stringify(insight),
      password: crypto.createHash('md5').update('a').digest('hex')
    })
  })


  test('Testing postJobSeeker Summary < 100', async () => {
    const query = `
      mutation {
        postJobSeeker (jobSeeker: {
          name : "zaim",
          location : "bogor",
          email: "halo@halo.com",
          educations : ["bachelor"],
          skills : ["can remember many thing"],
          executive_summary : "Ini hasrusnya salah",
          password: "a"
        }) {
          name
          location
          email
          educations
          skills
          executive_summary
          personality_insight
          password
        }
      }
    `
    const result = await graphql(RootSchema, query)
    expect(result).toHaveProperty('errors')
  })

  test('Testing updateJobSeeker Mutation', async () => {
    const strText = '"'+ text.replace(/"/g, "'") + '"'
    const query = `
      mutation {
        updateJobSeeker (_id: "507f1f77bcf86cd799439012", jobSeeker: {
          name: "Satria Saputra",
          location: "Tangerang",
          email: "halo@halo.com",
          educations: [
            "Universitas Bina Nusantara"
          ],
          skills: [
            "Node.js",
            "Express.js"
          ],
          executive_summary: ${strText},
        }) {
          location
        }
      }
    `

    const result = await graphql(RootSchema, query)
    expect(result).toHaveProperty('data')
    expect(result.data).toHaveProperty('updateJobSeeker')
    expect(result.data.updateJobSeeker).toMatchObject({
      location: "Tangerang"
    })
  })

  test('Testing postJobSeeker wrong personality insight password', async () => {
    PersonalityInsightsV3.mockImplementation(() => ({
      profile: jest.fn((obj, cb) => cb({
        code: 401,
        error: 'Not Authorized'
      }, null))
    }))
    const strText = '"'+ text.replace(/"/g, "'") + '"'
    const query = `
      mutation {
        postJobSeeker (jobSeeker: {
          name : "zaim",
          location : "bogor",
          email: "halo@halo.com",
          educations : ["bachelor"],
          skills : ["can remember many thing"],
          executive_summary : ${strText},
          password: "a"
        }) {
          name
          location
          email
          educations
          skills
          executive_summary
          personality_insight
          password
        }
      }
    `
    const result = await graphql(RootSchema, query)
    expect(result).toHaveProperty('errors')
  })
})

const { graphql } = require('graphql')

const { afterTestHelper, beforeTestHelper } = require('../helpers/TestHelper')
const RootSchema = require('../graphqls/RootSchema')

describe('Testing Query GraphQL', () => {
  beforeAll(async () => {
    await beforeTestHelper()
  })
  afterAll(async () => {
    await afterTestHelper()
  })

  test('Testing getJobSeekers Query', async () => {
    const query = `
      query {
        getJobSeekers {
          _id
          name
          location
          password
          executive_summary
          personality_insight
        }
      }
    `
    const result  = await graphql(RootSchema, query)
    expect(result).toHaveProperty('data')
    expect(result.data).toHaveProperty('getJobSeekers')
    expect(result.data.getJobSeekers).toHaveLength(7)
  })

  test('Testing getJobSeeker Query', async () => {
    const query = `
      query {
        getJobSeeker (_id: "507f1f77bcf86cd799439012") {
          _id
          name
          location
          email
          educations
          skills
        }
      }
    `
    const result  = await graphql(RootSchema, query)
    expect(result).toHaveProperty('data')
    expect(result.data).toHaveProperty('getJobSeeker')
    expect(result.data.getJobSeeker).toMatchObject({
      _id: '507f1f77bcf86cd799439012',
      name: 'Satria Saputra',
      location: 'Jakarta',
      email: "halo@halo.com",
      educations: [
        'Universitas Bina Nusantara'
      ],
      skills: [
        'Node.js',
        'Express.js'
      ]
    })
  })

  test('Testing getEmployers Query', async () => {
    const query = `
      query {
        getEmployers {
          _id
          name
          email
          company
          location
        }
      }
    `
    const result  = await graphql(RootSchema, query)
    expect(result).toHaveProperty('data')
    expect(result.data).toHaveProperty('getEmployers')
    expect(result.data.getEmployers).toHaveLength(2)
  })

  test('Testing getEmployer Query', async () => {
    const query = `
      query {
        getEmployer (_id: "507f1f77bcf86cd799439011") {
          _id
          name
          email
          company
          location
        }
      }
    `
    const result  = await graphql(RootSchema, query)
    expect(result).toHaveProperty('data')
    expect(result.data).toHaveProperty('getEmployer')
    expect(result.data.getEmployer).toMatchObject({
      _id: '507f1f77bcf86cd799439011',
      name: 'Satria Saputra',
      email: "halo@halo.com",
      company: 'PT. Cempaka',
      location: 'Jakarta'
    })
  })

  test('Testing jobSeekersByPersonality Query', async () => {
    const query = `
    query {
      jobSeekersByPersonality (criteria: {
        big5_openness: 0.8830326747838335,
        big5_extraversion: 0.5316062392648926,
        big5_agreeableness: 0.3103721247305993,
        big5_conscientiousness: 0.8995600858165484,
        need_curiosity: 0.6285129423518493,
        need_ideal: 0.29515901920240906,
        need_challenge: 0.3392505619910239,
        need_practicality: 0.18739760333131683,
        value_openness_to_change: 0.41836192917150344,
        value_self_transcendence: 0.15838152766499647,
        value_conservation: 0.16470772102430248,
        value_self_enhancement: 0.03444714630976964
      }) {
        similarity
      }
    }
    `
    const result  = await graphql(RootSchema, query)
    expect(result).toHaveProperty('data')
    expect(result.data).toHaveProperty('jobSeekersByPersonality')
    expect(result.data.jobSeekersByPersonality).toHaveLength(7)
  })
})

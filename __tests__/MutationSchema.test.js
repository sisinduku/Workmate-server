const { graphql } = require('graphql')
const fs = require('fs')

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
  beforeAll(async () => {
    await beforeTestHelper()
  })
  afterAll(async () => {
    await afterTestHelper()
  })

  test('Testing postJobSeeker Mutation', async () => {

  })
})

const fs = require('fs')
jest.mock('watson-developer-cloud/personality-insights/v3', () => jest.fn())
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3')

const requestPersonality = require('../lib/requestPersonality')
const insight = require('../__mockData__/user1.json');
let text = fs.readFileSync('./__mockData__/profile.txt', 'utf-8')
text = text.replace(/\r?\n|\r/g, '')

describe('Testing Search personality', () => {
  test('Response should give personality object', async () => {
    PersonalityInsightsV3.mockImplementation(() => ({
      profile: jest.fn((obj, cb) => cb(null, insight))
    }))
    const data = await requestPersonality(text)
    expect(data).toEqual(insight)
  })
  test('Response should give error length', async () => {
    PersonalityInsightsV3.mockImplementation(() => ({
      profile: jest.fn((obj, cb) => cb(null, insight))
    }))
    const data = await requestPersonality('coba salah aja')
    expect(data.message).toEqual('words count must >= 100')
  })
  test('Response should give error code 401', async () => {
    PersonalityInsightsV3.mockImplementation(() => ({
      profile: jest.fn((obj, cb) => cb({
        code: 401,
        error: 'Not Authorized'
      }, null))
    }))
    try {
      const data = await requestPersonality(text)
    } catch (e) {
      expect(e).toMatchObject({code: 401, error: 'Not Authorized'})
    }
  })
})

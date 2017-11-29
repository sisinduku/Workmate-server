const fs = require('fs')

const requestPersonality = require('../lib/requestPersonality')
const insight = require('../__mockData__/user1.json');
let text = fs.readFileSync('./__mockData__/profile.txt', 'utf-8')
text = text.replace(/\r?\n|\r/g, '')

const mockFetchToWatson = (input) => {
  return new Promise(function(resolve, reject) {
    resolve(insight)
  })
}

describe('Testing Search personality', () => {
  test('Request should give personality object', async () => {
    const data = await requestPersonality(mockFetchToWatson, text)
    expect(data).toEqual(insight)
  })
  test('Request should give error length', async () => {
    const data = await requestPersonality(mockFetchToWatson, 'coba salah aja')
    expect(data).toEqual({error: 'words count must >= 100'})
  })
})

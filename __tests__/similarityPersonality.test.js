const fs = require('fs')

const similarityPersonality = require('../lib/similarityPersonality')
const insight = require('../__mockData__/user1.json')
let text = fs.readFileSync('./__mockData__/profile.txt', 'utf-8')
text = text.replace(/\r?\n|\r/g, '')

describe('Testing similarity function', () => {
  test('Response should give 1 similarity', () => {
    expect(similarityPersonality(insight, insight)).toEqual(1)
  })
  test('Response should give error', () => {
    expect(similarityPersonality(null, insight)).toEqual({error: 'parameter could not be null'})
    expect(similarityPersonality(insight, null)).toEqual({error: 'parameter could not be null'})
    expect(similarityPersonality(null, null)).toEqual({error: 'parameter could not be null'})
  })
})

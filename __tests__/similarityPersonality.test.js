const fs = require('fs')

const input = {
  "big5_openness": 0.8830326747838335,
  "big5_extraversion": 0.5316062392648926,
  "big5_agreeableness": 0.3103721247305993,
  "big5_conscientiousness": 0.8995600858165484,
  "need_curiosity": 0.6285129423518493,
  "need_ideal": 0.29515901920240906,
  "need_challenge": 0.3392505619910239,
  "need_practicality": 0.18739760333131683,
  "value_openness_to_change": 0.41836192917150344,
  "value_self_transcendence": 0.15838152766499647,
  "value_conservation": 0.16470772102430248,
  "value_self_enhancement": 0.03444714630976964
}

const similarityPersonality = require('../lib/similarityPersonality')
const insight = require('../__mockData__/user1.json')
let text = fs.readFileSync('./__mockData__/profile.txt', 'utf-8')
text = text.replace(/\r?\n|\r/g, '')

describe('Testing similarity function', () => {
  test('Response should give 1 similarity', () => {
    expect(similarityPersonality(input, insight)).toEqual(1)
  })
  test('Response should give error due to no origin paramter', () => {
    const result = similarityPersonality(null, insight)
    expect(result.message).toEqual('origin parameter could not be null')
  })
  test('Response should give error due to no target paramter', () => {
    const result = similarityPersonality(insight, null)
    expect(result.message).toEqual('target parameter could not be null')
  })
})

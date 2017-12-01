const fs = require('fs')

const input = [
  {"type": "big5_openness", "score": 0.8830326747838335},
  {"type": "big5_extraversion", "score": 0.5316062392648926},
  {"type": "big5_agreeableness", "score": 0.3103721247305993},
  {"type": "big5_conscientiousness", "score": 0.8995600858165484},
  {"type": "need_curiosity", "score": 0.6285129423518493},
  {"type": "need_ideal", "score": 0.29515901920240906},
  {"type": "need_challenge", "score": 0.3392505619910239},
  {"type": "need_practicality", "score": 0.18739760333131683},
  {"type": "value_openness_to_change", "score": 0.41836192917150344},
  {"type": "value_self_transcendence", "score": 0.15838152766499647},
  {"type": "value_conservation", "score": 0.16470772102430248},
  {"type": "value_self_enhancement", "score": 0.03444714630976964}
]

const similarityPersonality = require('../lib/similarityPersonality')
const insight = require('../__mockData__/user1.json')
let text = fs.readFileSync('./__mockData__/profile.txt', 'utf-8')
text = text.replace(/\r?\n|\r/g, '')

describe('Testing similarity function', () => {
  test('Response should give 1 similarity', () => {
    expect(similarityPersonality(input, insight)).toEqual(1)
  })
  test('Response should give error', () => {
    expect(similarityPersonality(null, insight)).toEqual({error: 'parameter could not be null'})
    expect(similarityPersonality(insight, null)).toEqual({error: 'parameter could not be null'})
    expect(similarityPersonality(null, null)).toEqual({error: 'parameter could not be null'})
  })
})

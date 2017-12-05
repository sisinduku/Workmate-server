const request = require('supertest')

const app = require('../app')
const {beforeTestHelper, afterTestHelper} = require('../helpers/TestHelper')

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

describe('Testing Search Similarity Controller', () => {
  beforeAll(async (done) => {
    await beforeTestHelper()
    done()
  })

  afterAll(async (done) => {
    await afterTestHelper()
    done()
  })

  test('Test Finding Similarity Value', () => {
    return request(app)
      .post('/search_personality')
      .send(input)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(7)
      })
  })
  test('Test Finding Similarity Value with specified limit', () => {
    return request(app)
      .post('/search_personality')
      .send({...input, min_criteria: 0.56})
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(5)
      })
  })
})

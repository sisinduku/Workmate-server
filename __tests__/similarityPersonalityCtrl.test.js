const request = require('supertest')

const app = require('../app')
const JobSeeker = require('../models/JobSeeker')

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
const summary = require('../__mockData__/summary.json')
const user1 = require('../__mockData__/user1.json')
const user2 = require('../__mockData__/user2.json')
const user3 = require('../__mockData__/user3.json')
const user4 = require('../__mockData__/user4.json')
const user5 = require('../__mockData__/user5.json')
const user6 = require('../__mockData__/user6.json')
const user7 = require('../__mockData__/user7.json')
const user8 = require('../__mockData__/user8.json')

describe('Testing Search Similarity Controller', () => {
  beforeAll(async () => {
    await JobSeeker.insertMany([
      {
        name: 'Satria Saputra',
        location: 'Jakarta',
        education: [
          'Universitas Bina Nusantara'
        ],
        skills: [
          'Node.js',
          'Express.js'
        ],
        executive_summary: summary.data,
        personality_insight: JSON.stringify(user2),
        password: "sdJAS87123jn"
      },
      {
        name: 'Bima Ambien',
        location: 'Bogor',
        education: [
          'Institut Pertanian Bogor'
        ],
        skills: [
          'Node.js',
          'Express.js'
        ],
        executive_summary: summary.data,
        personality_insight: JSON.stringify(user3),
        password: "sdJAS87123jn"
      },
      {
        name: 'Doni Alamanda',
        location: 'Jakarta',
        education: [
          'Universitas Bina Nusantara'
        ],
        skills: [
          'Node.js',
          'Express.js'
        ],
        executive_summary: summary.data,
        personality_insight: JSON.stringify(user4),
        password: "sdJAS87123jn"
      },
      {
        name: 'Crystal Clear',
        location: 'Jakarta',
        education: [
          'Universitas Bina Nusantara'
        ],
        skills: [
          'Node.js',
          'Express.js'
        ],
        executive_summary: summary.data,
        personality_insight: JSON.stringify(user5),
        password: "sdJAS87123jn"
      },
      {
        name: 'Cikita Medeni',
        location: 'Jakarta',
        education: [
          'Universitas Bina Nusantara'
        ],
        skills: [
          'Node.js',
          'Express.js'
        ],
        executive_summary: summary.data,
        personality_insight: JSON.stringify(user6),
        password: "sdJAS87123jn"
      },
      {
        name: 'Agnes Monikah',
        location: 'Jakarta',
        education: [
          'Universitas Bina Nusantara'
        ],
        skills: [
          'Node.js',
          'Express.js'
        ],
        executive_summary: summary.data,
        personality_insight: JSON.stringify(user7),
        password: "sdJAS87123jn"
      },
      {
        name: 'Maria Ozawi',
        location: 'Jakarta',
        education: [
          'Universitas Bina Nusantara'
        ],
        skills: [
          'Node.js',
          'Express.js'
        ],
        executive_summary: summary.data,
        personality_insight: JSON.stringify(user8),
        password: "sdJAS87123jn"
      },
    ])
  })

  afterAll(async () => {
    await JobSeeker.remove({})
  })

  test('Test Finding Similarity Value', () => {
    return request(app)
      .post('/search_personality')
      .send({criteria: input})
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(7)
      })
  })
  test('Test Finding Similarity Value with specified limit', () => {
    return request(app)
      .post('/search_personality')
      .send({criteria: input, min_criteria: 0.56})
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(5)
      })
  })
})

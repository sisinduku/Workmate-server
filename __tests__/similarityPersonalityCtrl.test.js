const request = require('supertest')

const app = require('../app')
const JobSeeker = require('../models/JobSeeker')

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
      .send({criteria: user1})
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(7)
      })
  })
  test('Test Finding Similarity Value with specified limit', () => {
    return request(app)
      .post('/search_personality')
      .send({criteria: user1, min_criteria: 0.56})
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(5)
      })
  })
})

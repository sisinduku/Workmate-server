const request = require('supertest')

const app = require('../app')
const Employer = require('../models/Employer')

describe('Testing Job Seeker CRUD', () => {
  beforeAll(async () => {
    await Employer.insertMany([
      {
        _id: '507f1f77bcf86cd799439011',
        name: 'Satria Saputra',
        company: 'PT. Cempaka',
        location: 'Jakarta',
        password: "sdJAS87123jn"
      },
      {
        name: 'Satria Garuda',
        company: 'PT. Garuda',
        location: 'Tangerang',
        password: "sdJAS87123jn"
      }
    ])
  })

  afterAll(async () => {
    await Employer.remove({})
  })

  describe('Testing Job Seeker READ', () => {
    test('This should return single Employer object', () => {
      return request(app)
        .get('/employer/get_employer/507f1f77bcf86cd799439011')
        .then(response => {
          expect(response.statusCode).toBe(200)
          expect(response.body).toMatchObject({
            _id: '507f1f77bcf86cd799439011',
            name: 'Satria Saputra',
            company: 'PT. Cempaka',
            location: 'Jakarta',
            password: "sdJAS87123jn"
          })
        })
    })
    test('This should return all employer objects', () => {
      return request(app)
        .get('/employer/get_employer')
        .then(response => {
          expect(response.statusCode).toBe(200)
          expect(response.body).toHaveLength(2)
          expect(response.body[0]).toMatchObject({
            name: 'Satria Saputra',
            company: 'PT. Cempaka',
            location: 'Jakarta',
            password: "sdJAS87123jn"
          })
          expect(response.body[1]).toMatchObject({
            name: 'Satria Garuda',
            company: 'PT. Garuda',
            location: 'Tangerang',
            password: "sdJAS87123jn"
          })
        })
    })
  })
})

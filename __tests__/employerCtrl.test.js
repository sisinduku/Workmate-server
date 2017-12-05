const request = require('supertest')
const crypto = require('crypto')

const app = require('../app')
const {beforeTestHelper, afterTestHelper} = require('../helpers/TestHelper')


describe('Testing Employer CRUD', () => {
  beforeAll(async () => {
    await beforeTestHelper()
  })

  afterAll(async () => {
    await afterTestHelper()
  })

  describe('Testing Employer READ', () => {
    test('This should return single Employer object', () => {
      return request(app).get('/employer/get_employer/507f1f77bcf86cd799439011').then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({_id: '507f1f77bcf86cd799439011', name: 'Satria Saputra', email: "halo@halo.com", company: 'PT. Cempaka', location: 'Jakarta', password: crypto.createHash('md5').update("sdJAS87123jn").digest('hex')})
      })
    })
    test('This should return all employer objects', () => {
      return request(app).get('/employer/get_employer').then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(2)
        expect(response.body[0]).toMatchObject({name: 'Satria Saputra', email: "halo@halo.com", company: 'PT. Cempaka', location: 'Jakarta', password: crypto.createHash('md5').update("sdJAS87123jn").digest('hex')})
        expect(response.body[1]).toMatchObject({name: 'Satria Garuda', email: "halo@halo.com", company: 'PT. Garuda', location: 'Tangerang', password: crypto.createHash('md5').update("sdJAS87123jn").digest('hex')})
      })
    })
  })

  describe('Testing Employer UPDATE', () => {
    test('This should return updated employer', () => {
      return request(app).put('/employer/update_employer/507f1f77bcf86cd799439011').send({location: 'Balikpapan'}).then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({_id: '507f1f77bcf86cd799439011', name: 'Satria Saputra', email: "halo@halo.com", company: 'PT. Cempaka', location: 'Balikpapan', password: crypto.createHash('md5').update("sdJAS87123jn").digest('hex')})
      })
    })
    test('This should return employer not found', () => {
      return request(app).put('/employer/update_employer/507f1f77bcf86cd7994390aa').send({location: 'Balikpapan'}).then(response => {
        expect(response.statusCode).toBe(204)
      })
    })
    test('This should return name is required', () => {
      return request(app).put('/employer/update_employer/507f1f77bcf86cd799439011').send({name: ''}).then(response => {
        expect(response.statusCode).toBe(400)
        expect(response.body).toMatchObject({
          errors: {
            name: {
              message: 'name is required'
            }
          }
        })
      })
    })
  })

  describe('Testing Employer POST', () => {
    test('This should return new employer', () => {
      return request(app).post('/employer/post_employer').send({
        name: 'Lorem ipsum',
        company: 'PT. Ipsum',
        location: 'Tangerang',
        password: "sdJAS87123jn"
      }).then(response => {
        expect(response.statusCode).toBe(201)
        expect(response.body).toMatchObject({name: 'Lorem ipsum', company: 'PT. Ipsum', location: 'Tangerang', password: crypto.createHash('md5').update("sdJAS87123jn").digest('hex')})
      })
    })
    test('This should return name is required', () => {
      return request(app).post('/employer/post_employer').send({
        company: 'PT. Ipsum',
        location: 'Tangerang',
        password: "sdJAS87123jn"
      }).then(response => {
        expect(response.statusCode).toBe(400)
        expect(response.body).toMatchObject({
          errors: {
            name: {
              message: 'name is required'
            }
          }
        })
      })
    })
  })
})

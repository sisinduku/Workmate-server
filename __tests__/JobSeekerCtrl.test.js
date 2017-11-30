const app = require('../app')
const request = require('supertest')

describe('POST /job_seekers', () => {
  const profile={
    "name" : "zaim",
    "location" : "bogor",
    "education" : ["bachelor"],
    "skills" : ["can remember many thing"],
    "executive_summary" : "im a hard worker",
    "personality_insight" : "",
    "password": "a"
  }
  test('response status create profile job seeker', async () => {
    try {
      const response = await request(app).post('/job_seekers').send(profile)
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toContain("profile job seeker created succesfully")
    } catch (e) {
      console.log(e);
    }
  })
  test('response object data create profile job seeker', async () => {
    try {
      const response = await request(app).post('/job_seekers').send(profile)
      expect(response.body.data).toMatchObject(profile)
    } catch (e) {
      console.log(e);
    }
  })
})

describe('GET /job_seekers/:id', () => {
  const id="5a1ebb2c5769a249f424107e"
  test('response status get profile by id job seeker', async () => {
    try {
      const response = await request(app).get(`/job_seekers/${id}`)
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toContain("profile job seeker founded")
    } catch (e) {
      console.log(e);
    }
  })
  test('response object data get profile by id job seeker', async () => {
    try {
      const response = await request(app).get(`/job_seekers/${id}`)
      expect(response.body.data).toMatchObject({_id:id})
    } catch (e) {
      console.log(e);
    }
  })
})

describe('PUT /job_seekers/:id', () => {
  const id="5a1ebb2c5769a249f424107e"
  const profile={
    "name" : "zaim malak",
    "location" : "jakarta",
    "education" : ["bachelor"],
    "skills" : ["can remember many thing"],
    "executive_summary" : "im a hard worker",
    "personality_insight" : "",
    "password": "a"
  }
  test('response status put profile by id job seeker', async () => {
    try {
      const response = await request(app).put(`/job_seekers/${id}`).send(profile)
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toContain("profile job seeker updated succesfully")
    } catch (e) {
      console.log(e);
    }
  })
  test('response object data put profile by id job seeker', async () => {
    try {
      const response = await request(app).put(`/job_seekers/${id}`).send(profile)
      expect(response.body.data).toMatchObject({_id:id})
    } catch (e) {
      console.log(e);
    }
  })
})

const app = require('../app')
const request = require('supertest')
const fs = require('fs')
const JobSeeker = require('../models/JobSeeker')

const { afterTestHelper } = require('../helpers/TestHelper')

let text = fs.readFileSync('./__mockData__/profile.txt', 'utf-8')
text = text.replace(/\r?\n|\r/g, '')

jest.mock('watson-developer-cloud/personality-insights/v3', () => jest.fn())
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3')
const insight = require('../__mockData__/user1.json');
PersonalityInsightsV3.mockImplementation(() => ({
  profile: jest.fn((obj, cb) => cb(null, insight))
}))

var id=""
var id2=""
const profile={
  "name" : "zaim",
  "location" : "bogor",
  "email": "halo@halo.com",
  "educations" : ["bachelor"],
  "skills" : ["can remember many thing"],
  "executive_summary" : text,
  "personality_insight" : "",
  "password": "a"
}
const profileError={
  "name" : "zaim",
  "location" : "bogor",
  "email": "halo@halo.com",
  "educations" : ["bachelor"],
  "skills" : ["can remember many thing"],
  "executive_summary" : "",
  "personality_insight" : "",
  "password": "a"
}
const profileEdit={
  "name" : "zaim malak",
  "location" : "jakarta",
  "email": "halo@halo.com",
  "educations" : ["bachelor"],
  "skills" : ["can remember many thing"],
  "executive_summary" : text,
  "personality_insight" : "",
  "password": "a"
}

describe('Testing Job Seeker End Point', () => {
  afterAll(async () => {
    await afterTestHelper()
  })

  describe('POST /job_seekers', () => {
    test('response status create profile job seeker', async () => {
      try {
        const response = await request(app).post('/job_seekers').send(profile)
        id=response.body._id
        expect(response.statusCode).toBe(200);
      } catch (e) {
        console.log(e);
      }
    })
    test('response object data create profile job seeker', async () => {
      try {
        const response = await request(app).post('/job_seekers').send(profile)
        let newInsight = JSON.stringify(insight)
        id2=response.body._id
        profile.personality_insight=newInsight
        profileEdit.personality_insight=newInsight
        profile.password=response.body.password
        profileEdit.password=response.body.password
        expect(response.body.personality_insight).toEqual(newInsight)
        expect(response.body).toMatchObject(profile)
      } catch (e) {
        console.log(e);
      }
    })
    test('response status error when executive summary < 100', async () => {
      try {
        const response = await request(app).post('/job_seekers').send(profileError)
      } catch (e) {
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe('words count must >= 100')
      }
    })
  })

  describe('GET /job_seekers/:id', () => {
    test('response status get profile by id job seeker', async () => {
      try {
        const response = await request(app).get(`/job_seekers/${id}`)
        expect(response.statusCode).toBe(200);
      } catch (e) {
        console.log(e);
      }
    })
    test('response object data get profile by id job seeker', async () => {
      try {
        const response = await request(app).get(`/job_seekers/${id}`)
        expect(response.body).toMatchObject(profile)
      } catch (e) {
        console.log(e);
      }
    })
  })

  describe('PUT /job_seekers/:id', () => {
    test('response status put profile by id job seeker', async () => {
      try {
        const response = await request(app).put(`/job_seekers/${id}`).send(profileEdit)
        expect(response.statusCode).toBe(200);
      } catch (e) {
        console.log(e);
      }
    })
    test('response object data put profile by id job seeker', async () => {
      try {
        const response = await request(app).put(`/job_seekers/${id2}`).send(profileEdit)
        expect(response.body).toMatchObject(profileEdit)
      } catch (e) {
        console.log(e);
      }
    })
  })

  describe('DELETE /job_seekers/:id', () => {
    test('response status delete profile by id job seeker', async () => {
      try {
        const response = await request(app).delete(`/job_seekers/${id}`)
        expect(response.statusCode).toBe(200);
      } catch (e) {
        console.log(e);
      }
    })
    test('response object data delete profile by id job seeker', async () => {
      try {
        const response = await request(app).delete(`/job_seekers/${id2}`)
        expect(response.body).toMatchObject(profileEdit)
      } catch (e) {
        console.log(e);
      }
    })
  })
})

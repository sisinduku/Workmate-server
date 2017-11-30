const app = require('../app')
const request = require('supertest')
const fs = require('fs');
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
  "education" : ["bachelor"],
  "skills" : ["can remember many thing"],
  "executive_summary" : text,
  "personality_insight" : "",
  "password": "a"
}
const profileEdit={
  "name" : "zaim malak",
  "location" : "jakarta",
  "education" : ["bachelor"],
  "skills" : ["can remember many thing"],
  "executive_summary" : text,
  "personality_insight" : "",
  "password": "a"
}

describe('POST /job_seekers', () => {
  test('response status create profile job seeker', async () => {
    try {
      const response = await request(app).post('/job_seekers').send(profile)
      // console.log('ini response', response.body.data);

      id=response.body.data._id
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toContain("profile job seeker created succesfully")
    } catch (e) {
      console.log(e);
    }
  })
  test('response object data create profile job seeker', async () => {
    try {
      // console.log('ini profile',profile);
      const response = await request(app).post('/job_seekers').send(profile)
      let newInsight = JSON.stringify(insight)
      // console.log('ini response 2', response.body);
      id2=response.body.data._id
      profile.personality_insight=newInsight
      profileEdit.personality_insight=newInsight
      profile.password=response.body.data.password
      profileEdit.password=response.body.data.password
      expect(response.body.data.personality_insight).toEqual(newInsight)
      expect(response.body.data).toMatchObject(profile)
    } catch (e) {
      console.log(e);
    }
  })
})

describe('GET /job_seekers/:id', () => {
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
  test('response status put profile by id job seeker', async () => {
    try {
      const response = await request(app).put(`/job_seekers/${id}`).send(profileEdit)
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toContain("profile job seeker updated succesfully")
    } catch (e) {
      console.log(e);
    }
  })
  test('response object data put profile by id job seeker', async () => {
    try {
      const response = await request(app).put(`/job_seekers/${id2}`).send(profileEdit)
      expect(response.body.data).toMatchObject({_id:id2})
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
      expect(response.body.message).toContain("profile job seeker deleted succesfully")
    } catch (e) {
      console.log(e);
    }
  })
  test('response object data delete profile by id job seeker', async () => {
    try {
      const response = await request(app).delete(`/job_seekers/${id2}`)
      expect(response.body.data).toMatchObject(profileEdit)
    } catch (e) {
      console.log(e);
    }
  })
})

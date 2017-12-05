const request = require('supertest')
const nodemailerMock = require('nodemailer-mock')
jest.setMock('nodemailer', nodemailerMock)

const app = require('../app')

describe('Testing sending email', () => {
  test('This should return sent email', (done) => {
    const sentMail = nodemailerMock.mock.sentMail()
    return request(app)
      .post('/send_email')
      .send({
        receiver_name: 'Saptanto',
        receiver_email: 'saptanto.sindu@gmail.com'
      })
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(sentMail[0]).toMatchObject({
          from: `"PT. Workmate Technology Indonesia" <workmate.technology.indonesia@gmail.com>`,
          to: `saptanto.sindu@gmail.com`,
          subject : `Invite Test and Interview`
        })
        done()
      })
  })
  test('This should return failed', (done) => {
    const err = 'This is error'
    nodemailerMock.mock.shouldFailOnce();
    nodemailerMock.mock.failResponse(err);
    return request(app)
      .post('/send_email')
      .send({
        receiver_name: 'Saptanto',
        receiver_email: 'saptanto.sindu@gmail.com'
      })
      .then(response => {
        expect(response.error.status).toBe(400)
        expect(response.error.text).toBe('This is error')
        done()
      })
  });
})

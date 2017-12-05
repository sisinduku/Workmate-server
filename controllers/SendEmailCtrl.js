const nodemailer = require('nodemailer')

function SendEmailCtrl(req,res) {
  // let transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: `${process.env.EMAILUSER}`,
  //     pass: `${process.env.EMAILPASS}`
  //   }
  // })
  let transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    secure: false,
    auth: {
      user: `${process.env.EMAILUSER}`,
      pass: `${process.env.EMAILPASS}`
    }
  })
  let mailOptions = {
    from: `"${process.env.EMAILNAME}" <${process.env.EMAILUSER}>`,
    to: `${req.body.receiver_email}`,
    subject : `Invite Test and Interview`,
    text:
    `We would like to invite you to participate test and interview at :\n
    Date : 12-12-2017\n
    Time : 10:00 am\n
    Place : Plaza Telkom, Center Jakarta\n
    Thank for your participate\n
    Best Regard ${process.env.EMAILUSER}.`
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(400).send(error)
    } else {
      res.status(200).send(info)
    }
  })
}

module.exports = SendEmailCtrl

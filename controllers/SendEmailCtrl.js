const nodemailer = require('nodemailer')

function SendEmailCtrl(req,res) {
  console.log('im hereeeee', req.body);
  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
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
      Best Regard ${req.body.receiver_name}.`
    }
    console.log(mailOptions);
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send(error)
      } else {
        console.log(info);
        res.status(200).send(info)
      }
    })
  })
}

module.exports = SendEmailCtrl

const config = require('../config')
var sendGrid = require('sendgrid')(config.sendgridKey)

exports.send = async(to, subject, body) => {
    sendgrid.send({
        to: to,
        from: '',
        subject: subject,
        html: body
    })
}
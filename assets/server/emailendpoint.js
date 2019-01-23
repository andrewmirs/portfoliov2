const credentials = require('./sendgridcredentials.js');

const express = require('express');

const server = express();

server.get('/sendemail', ( request, response ) => {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey=( credentials.key );
    const msg = {
        to: "andrewmirs@csu.fullerton.edu",
        from: "andrewmirs@gmail.com",
        subject: "Sending with SendGrid is fun!",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>"
    };
    sgMail.send(msg).then((sendGridResponse) => {
        console.log(sendGridResponse)
        response.send({success: true});
    }).catch((err) => console.log("Error attempting to send email:", err));
});

server.listen(3001, () => {
    console.log('server is listening on port 3001');
});


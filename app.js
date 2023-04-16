const {google} = require('googleapis');
const {OAuth2Client} = require('google-auth-library');
const nodemailer = require('nodemailer');

const CLIENT_ID = '235422697918-779r5u7661qged2ngvrnullm131ej2am.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:8080';
const REFRESH_TOKEN = '"ya29.a0AfH6SMDC0GqIгpOBILF7mLbN708bpPlPovzVpRQgf1WpY-153sET68av6UsiyC5e4b- 1HCKKNhxWdybGdHhE9tZH8N8Qfj8wu5Cwa4CL064RR8aZdVg9GpPA2R668NneMFedyh2n- jincednghSEfj6ppRtc1vIYc"';

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const gmail = google.gmail({version: 'v1', auth: oAuth2Client});

gmail.users.messages.list({userId: 'me', q: 'is:unread'}, (err, res) => {
  if (err) return console.log(`The API returned an error: ${err}`);
  const messages = res.data.messages;
  if (messages.length) {
    console.log('Most recent unread email:');
    console.log(`- Subject: ${messages[0].payload.headers.find(h => h.name === 'Subject').value}`);
    console.log(`- From: ${messages[0].payload.headers.find(h => h.name === 'From').value}`);
  } else {
    console.log('No unread emails found.');
  }
});



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vj6176723@gmail.com',
    pass: 'password',
  },
});

const mailOptions = {
  from: 'vj6176723@gmail.com',
  to: 'ishujain131001@gmail.com',
  subject: 'Automatic response',
  text: 'Thank you for your email. I am currently out of office and will respond to your message as soon as possible.',
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) return console.log(`Failed to send automatic response: ${err}`);
  console.log(`Automatic response sent to ${info.envelope.to}`);
});


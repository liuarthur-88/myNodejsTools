const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const s = fs.readFileSync(path.join(__dirname, './config/smtp'), 'utf8');
const pkey = path.join(__dirname, './config/config.pem');
const nodemailer = require('nodemailer');

const dencryptText = (s, k) => {
  const buf = Buffer.from(s, 'base64');

  const privateKey = fs.readFileSync(k);
  const dencrypted = crypto.publicDecrypt(privateKey, buf);
  return dencrypted.toString();
};

const smtpConfig = JSON.parse(dencryptText(s, pkey));

const sendEmail = async (emailOptions) => {
  const emailTransporter = await nodemailer.createTransport({
    host: smtpConfig.smtp.server,
    port: smtpConfig.smtp.port,
    auth: {
      user: smtpConfig.smtp.uid,
      pass: smtpConfig.smtp.pwd,
    },
  });
  await emailTransporter.sendMail(emailOptions);
};

module.exports = {
  sendEmail,
};

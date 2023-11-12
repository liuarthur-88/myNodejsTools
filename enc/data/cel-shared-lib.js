const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Defining a text to be encrypted
// 'F:\evoyze\support\tools\evyoze-enc\app\my-config.json'
// const configText = fs.readFileSync('F:\\evoyze\\support\\tools\\evyoze-enc\\app\\my-config.json', 'utf8');
const configText = fs.readFileSync(path.join(__dirname, '../app/my-config.json'), 'utf8');

const s = fs.readFileSync(path.join(__dirname, '../config/db'), 'utf8');

// Defining a .pem
const pkey = path.join(__dirname, '../config/10-private-key.pem');
  
// Creating a function to encrypt string
function encryptText (s, k) {
    let buf = Buffer.from(s)

    const privateKey = fs.readFileSync(k);
    const encrypted = crypto.privateEncrypt(privateKey, buf);
  
    return encrypted.toString('base64');
}  

// Defining encrypted text
const encrypted = encryptText(configText, pkey);
console.log(encrypted);

function dencryptText (s, k) {
    let buf = Buffer.from(s, 'base64')

    const privateKey = fs.readFileSync(k);
    const dencrypted = crypto.publicDecrypt(privateKey, buf)
    
    return dencrypted.toString();
}

const dencrypted = JSON.parse(dencryptText(s, pkey));
console.log(dencrypted.sql.uid);
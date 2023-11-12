const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

let d2 = __dirname;

const jSON = 'db'       // <=== Change this

const f1 = fs.readFileSync(path.join(d2, `../app/${jSON}.json`), 'utf8');            
const f2 = path.join(d2, `../config/config.pem`);
const f3 = path.join(d2, `../config/${jSON}`);
    
encryptText = (s, k) => {
    let buf = Buffer.from(s)

    const privateKey = fs.readFileSync(k);
    const encrypted = crypto.privateEncrypt(privateKey, buf);
    
    return encrypted.toString('base64');
}

if (!fs.existsSync(f2)) {
    // Generate new private key if not exists.
    console.log('Generating private key..')
    const { privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });    

    console.log('Export private key..')
    const s1 = privateKey.export({ type: 'pkcs1', format: 'pem' });
    fs.writeFileSync(f2, s1);
}

// Delete if the file exists.
if (fs.existsSync(f3)) {
    fs.unlinkSync(f3);
}

console.log('Creating file')
const pkey = path.join(__dirname, `../config/config.pem`);
const encrypted = encryptText(f1, pkey);
fs.writeFileSync(f3, encrypted);

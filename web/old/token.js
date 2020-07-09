const crypto = require('crypto');

let algo = 'aes-256-cbc';
let cipher = '67c89cd08369ebd48f7e2bec4d15d32b682554219d09817b5595ccd3e8ae3ddcfd91323cbba038ea2ca7beab8ef56445bacfdf40cc83402abda3a1d959e8fd20c0daeb9fca6fe0b070dbcc7bb24726e99a83658304e82c7ac85915bec3a051a2dfe73b74e4125b04f5ff39cec9fb765baa1f9baa4af41a772e898200ca0dc80e9fee327e400a0c7580ba9f0584a86bb85b14b796a853f4c0f55f72197a53bf81';
let cipher_key = "U2FsdGVkX19UDS+OHfzpmedFHdV301AG5DSD8j9o6VWLoa179aEKDuhE/uRs2JWi";

let decipher = crypto.createDecipher(algo, cipher_key);
let text = decipher.update(cipher, 'hex', 'utf8');
text += decipher.final('utf8');

console.log(text);

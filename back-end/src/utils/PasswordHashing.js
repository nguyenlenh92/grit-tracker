const crypto = require('crypto')

const generatePasswordHash = (password, salt) => {
    if (salt == ''){
        var salt  = crypto.randomBytes(16).toString('hex');
    }
    var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return [hash, salt];
} 
module.exports = generatePasswordHash
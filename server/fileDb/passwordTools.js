const crypto = require('crypto')

const generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

const encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

const setSaltAndPassword = (user) => {
  user.salt = generateSalt()
  user.password = encryptPassword(user.password, user.salt)
  return user
}

const correctPassword = function (user, candidatePwd) {
  return encryptPassword(candidatePwd, user.salt) === user.password
}

module.exports = {
  setSaltAndPassword,
  correctPassword,
}

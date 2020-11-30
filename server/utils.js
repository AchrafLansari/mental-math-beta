const utils = exports

const crypto = require('crypto')

utils.generateUniqueId = () => {
  const token = crypto.randomBytes(64).toString('hex')
  const time = new Date().getTime()

  return crypto
    .createHash('sha256')
    .update(token + time)
    .digest('hex')
}

utils.generateNumber = (max, min) => {
  if (!min)
    min = 1

  return parseInt(Math.random() * (max - 1) + min)
}

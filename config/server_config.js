const config = exports

const path = require('path')

config.web = {}

config.web.port = process.env.PORT || 3000
config.web.public_location = path.join(__dirname, '..', '/public')

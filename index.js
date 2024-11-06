const app = require('./src/server/server')
const userRepository = require('./src/db/user-repository')

app(3000, { userRepository })
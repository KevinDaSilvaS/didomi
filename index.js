require('dotenv').config()
const app = require('./src/server/server')
const userRepository = require('./src/db/user-repository')
const eventsRepository = require('./src/db/events-repository')

app(process.env.PORT ?? 3000, { userRepository, eventsRepository })
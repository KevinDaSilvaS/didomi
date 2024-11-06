const { integer, sqliteTable, text } = require('drizzle-orm/sqlite-core')
const usersTable = require('./users')

const eventsTable = sqliteTable("events", {
  id: text().notNull(),
  enabled: integer({ mode: 'boolean' }).notNull(),
  email: text().notNull().references(() => usersTable.email)
})

module.exports = eventsTable
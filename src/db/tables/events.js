const { int, integer, sqliteTable, text } = require('drizzle-orm/sqlite-core')
const usersTable = require('./users')

const eventsTable = sqliteTable("events", {
  eventId: int().primaryKey({ autoIncrement: true }), 
  id: text().notNull(),
  enabled: integer({ mode: 'boolean' }).notNull(),
  email: text().references(() => usersTable.email, {onDelete: 'cascade'}).notNull()
})

module.exports = eventsTable
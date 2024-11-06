const { int, sqliteTable, text } = require('drizzle-orm/sqlite-core')

const usersTable = sqliteTable("users", {
  email: text().notNull().primaryKey().unique()
})

module.exports = usersTable
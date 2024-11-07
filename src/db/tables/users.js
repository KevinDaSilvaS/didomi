const { int, sqliteTable, text } = require('drizzle-orm/sqlite-core')

const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }), 
  email: text().notNull().unique()
})

module.exports = usersTable
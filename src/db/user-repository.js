const process = require('dotenv/config')
const { eq } = require('drizzle-orm')
const { drizzle } = require('drizzle-orm/libsql')
const { createClient } = require('@libsql/client')
const usersTable = require('./tables/users')
const eventsTable = require('./tables/events')

const client = createClient({ url: process.env?.DB_FILE_NAME || 'file:local.db' })
const db = drizzle('file:local.db')

const save = async (user) => {
    await db.insert(usersTable).values(user)
    return await getUserByEmail(user.email)
}

const getUserByEmail = async (email) => {
    const userData = await db.select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .leftJoin(eventsTable, eq(usersTable.email, eventsTable.email))
        .all()

    if (userData.length <= 0)
        return undefined

    const { users, events } = userData[0]
    const user = {
        ...users,
        events: events ?? []
    }

    return user
}

const deleteUser = async (email) => {
    const user = await db.delete(usersTable)
        .where(eq(usersTable.email, email))

    return user
}

module.exports = {
    save,
    getUserByEmail,
    deleteUser
}
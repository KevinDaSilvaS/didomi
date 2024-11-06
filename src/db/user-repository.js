const process = require('dotenv/config')
const { eq } = require('drizzle-orm')
const { drizzle } = require('drizzle-orm/libsql')
const { createClient } = require('@libsql/client')
const usersTable = require('./tables/users')
const eventsTable = require('./tables/events')

const client = createClient({ url: process.env?.DB_FILE_NAME || 'file:local.db' })
const db = drizzle('file:local.db')


const save = async (user) => {
    const insertedUser = await db.insert(usersTable).values(user)
    return insertedUser
}

const getFullUserByEmail = async (email) => {
    const user = await db.select()
        .from(usersTable)
        .where(usersTable.email, email)
        .leftJoin(eventsTable, eq(usersTable.email, eventsTable.email))
        .all()
        
    return user
}

const getUserByEmail = async (email) => {
    const user = await db.select()
        .from(usersTable)
        .where(usersTable.email, email)
    return user
}

const deleteUser = async (email) => {
    const user = await db.delete()
        .from(usersTable)
        .where(usersTable.email, email)
    return user
}

module.exports = {
    save,
    getFullUserByEmail,
    getUserByEmail,
    deleteUser
}
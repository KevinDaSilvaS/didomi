const { eq } = require('drizzle-orm')
const { drizzle } = require('drizzle-orm/libsql')
const usersTable = require('./tables/users')
const eventsRepository = require('./events-repository')

const db = drizzle(process.env.DB_NAME)

const save = async (user) => {
    await db.insert(usersTable).values(user)
    return await getUserByEmail(user.email)
}

const getUserByEmail = async (email) => {
    const consents = await eventsRepository.getEvents(email)
    const users = await db.select()
        .from(usersTable)
        .where(eq(usersTable.email, email))

    if (users.length <= 0)
        return undefined

    const user = users[0]
    user.consents = consents

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
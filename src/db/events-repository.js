const { eq } = require('drizzle-orm')
const { drizzle } = require('drizzle-orm/libsql')
const eventsTable = require('./tables/events')

const db = drizzle(process.env.DB_NAME)

const save = async (event, email) => {
    const data = await db.insert(eventsTable).values({ ...event, email })
    if(data.rowsAffected > 0) {
        return event
    }
    return undefined
}

const getEvents = async (email) => {
    const consents = await db.select()
        .from(eventsTable)
        .where(eq(eventsTable.email, email))

    return consents.map(consent => ({
        id: consent.id,
        enabled: consent.enabled
    }))
}

module.exports = {
    save,
    getEvents
}
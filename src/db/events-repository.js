const process = require('dotenv/config')
const { eq } = require('drizzle-orm')
const { drizzle } = require('drizzle-orm/libsql')
const { createClient } = require('@libsql/client')
const eventsTable = require('./tables/events')

const client = createClient({ url: process.env?.DB_FILE_NAME || 'file:local.db' })
const db = drizzle('file:local.db')

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
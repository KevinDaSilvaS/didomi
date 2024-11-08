const { eq, max } = require('drizzle-orm')
const { drizzle } = require('drizzle-orm/libsql')
const consentIds = require('../app/enums/consent-ids')
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
    const consents = await db.selectDistinct({
        id: eventsTable.id,
        enabled: eventsTable.enabled,
        cid: max(eventsTable.eventId)
    }).from(eventsTable)
    .where(eq(eventsTable.email, email))
    .groupBy(eventsTable.id)

    return consents.map(consent => ({
        id: consent.id,
        enabled: consent.enabled
    }))
}

module.exports = {
    save,
    getEvents
}
const eventsService = require('../services/events')

const saveEvent = async (event, email, eventsRepository) => {
    return await eventsService.saveEvent(event, email, eventsRepository)
}

module.exports = {
    saveEvent
}
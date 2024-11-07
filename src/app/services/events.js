const eventValidator = require('../validators/event')
const { errorResponse, successResponse } = require('../helpers/response-builder')
const { UnprocessableEntity, InternalServerError } = require('../errors/errors')
const { InternalServerErrorMessage } = require('../errors/error-messages')

const saveEvent = async (event, email, eventRepository) => {
    try {
        const validationResult = eventValidator.validate(event)
        if (validationResult.error)
            return errorResponse(UnprocessableEntity, validationResult.error.message)

        const savedEvent = await eventRepository.save(event, email)
        if(!savedEvent) 
            return errorResponse(InternalServerError, InternalServerErrorMessage)

        return successResponse(201, savedEvent)
    } catch (error) {
        return errorResponse(InternalServerError, InternalServerErrorMessage)
    }
}

module.exports = {
    saveEvent
}
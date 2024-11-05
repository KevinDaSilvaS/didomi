const userValidator = require('../validators/user')
const { errorResponse, successResponse } = require('../helpers/response-builder')
const { 
    UnprocessableEntity, 
    InternalServerError,
    NotFound
} = require('../errors/errors')
const { 
    UserAlreadyRegisteredMessage, 
    InternalServerErrorMessage, 
    UserNotFoundMessage
} = require('../errors/error-messages')

const saveUser = async (user, userRepository) => {
    try {
        const validationResult = userValidator.validate(user)
        if (validationResult.error)
            return errorResponse(UnprocessableEntity, validationResult.error.message)

        const userExists = await userRepository.getUserByEmail(user.email)

        if (userExists)
            return errorResponse(UnprocessableEntity, UserAlreadyRegisteredMessage)

        const savedUser = await userRepository.save(user)
        return successResponse(201, savedUser)
    } catch (error) {
        return errorResponse(InternalServerError, InternalServerErrorMessage)
    }
}

const getUser = async (userEmail, userRepository) => {
    try {
        const user = await userRepository.getFullUserByEmail(userEmail)

        if (!user)
            return errorResponse(NotFound, UserNotFoundMessage)

        return successResponse(200, user)
    } catch (error) {
        return errorResponse(InternalServerError, InternalServerErrorMessage)
    }
}

module.exports = {
    saveUser,
    getUser
}
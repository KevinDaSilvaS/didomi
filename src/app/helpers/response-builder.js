const buildResponse = (error, success, data) => ({ error, data, success })

const errorResponse = (error, data) => buildResponse(error, undefined, data)

const successResponse = (success, data) => buildResponse(undefined, success, data)

module.exports = {
    errorResponse,
    successResponse,
    buildResponse
}
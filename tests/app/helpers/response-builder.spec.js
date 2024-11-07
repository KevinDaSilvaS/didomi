const { describe, test, expect } = require('@jest/globals')
const responseBuilder = require('../../../src/app/helpers/response-builder')

describe('Response builder suite', () => {

    test('validate error response object', () => { 
        const errorResponse = responseBuilder.errorResponse(422, 'error message')
        expect(errorResponse.error).toBe(422)
        expect(errorResponse.success).toBe(undefined)
        expect(errorResponse.data).toStrictEqual({'error': 'error message'})
    })

    test('validate success response object', () => { 
        const successResponse = responseBuilder.successResponse(201, 'data')
        expect(successResponse.success).toBe(201)
        expect(successResponse.error).toBe(undefined)
        expect(successResponse.data).toBe('data')
    })
})

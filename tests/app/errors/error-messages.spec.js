const { describe, test, expect } = require('@jest/globals')
const errorMessages = require('../../../src/app/errors/error-messages')

describe('Error codes enum suite', () => {

    test('validate error messages values', () => { 
        expect(Object.values(errorMessages)).toStrictEqual([
            'User email already registered',
            'Something unexpected happened',
            'User not found',
        ])
    })

    test('validate error messages keys', () => { 
        expect(Object.keys(errorMessages)).toStrictEqual([
            'UserAlreadyRegisteredMessage',
            'InternalServerErrorMessage',
            'UserNotFoundMessage',
        ])
     })
})

const { describe, test, expect } = require('@jest/globals')
const userValidator = require('../../../src/app/validators/user')

describe('User validator suite', () => {

    test('should validate user successfully', () => { 
        const userBody = {
            email: 'k@k.com'
        }
        const result = userValidator.validate(userBody)
        expect(result.value).toStrictEqual(userBody)
        expect(result.error).toBe(undefined)
    })

    test('should fail validation when email is not valid', () => { 
        const userBody = { email: 'Imma misbehave in the email' }
        const result = userValidator.validate(userBody)
        expect(result.error.message).toBe('"email" must be a valid email')
    })
})

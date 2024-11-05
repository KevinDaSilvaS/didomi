const { describe, test, expect } = require('@jest/globals')
const eventValidator = require('../../../src/app/validators/event')
const consentIdsEnum = require('../../../src/app/enums/consent-ids')

describe('Event validator suite', () => {

    test('should validate event successfully', () => { 
        const eventBody = {
            id: consentIdsEnum.email_notifications,
            enabled: true
        }
        const result = eventValidator.validate(eventBody)
        expect(result.value).toStrictEqual(eventBody)
        expect(result.error).toBe(undefined)
    })

    test('should fail validation when id is not valid', () => { 
        const eventBody = {
            id: 'invalid_ID_makesBooom!!!!!',
            enabled: true
        }
        const result = eventValidator.validate(eventBody)
        expect(result.error.message).toBe('"id" must be one of [email_notifications, sms_notifications]')
    })
})

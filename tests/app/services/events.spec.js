const { describe, test, expect } = require('@jest/globals')
const eventService = require('../../../src/app/services/events.js')
const consentIdEnum = require('../../../src/app/enums/consent-ids.js')
const { InternalServerErrorMessage } = require('../../../src/app/errors/error-messages.js')

describe('eventService suite', () => {

    describe('saveEvent tests', () => {
        test('should save event with success', async () => { 
            const event = await eventService.saveEvent({ 
                id: consentIdEnum.email_notifications,
                enabled: true
            }, 'k@k.com', {
                save: () => ({
                    id: consentIdEnum.email_notifications,
                    enabled: true
                })
            })
            expect(event.success).toBe(201)
            expect(event.data.id).toBe(consentIdEnum.email_notifications)
        })

        test('should fail in validator', async () => { 
            const event = await eventService.saveEvent({ 
                id: 'InvalidConsentId',
                enabled: true
            }, 'k@k.com', {})
            expect(event.error).toBe(422)
        })

        test('should fail when the unexpected happens', async () => { 
            const event = await eventService.saveEvent({ 
                id: consentIdEnum.email_notifications,
                enabled: true
            }, 'k@k.com', {
                save: () => { throw new Error('err') }
            })
            expect(event.error).toBe(500)
            expect(event.data).toBe(InternalServerErrorMessage)
        })
    })
})

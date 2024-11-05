const { describe, test, expect } = require('@jest/globals')
const consentIdsEnum = require('../../../src/app/enums/consent-ids')

describe('Consent ids enum suite', () => {

    test('validate option values', () => { 
        expect(Object.values(consentIdsEnum)).toStrictEqual(['email_notifications', 'sms_notifications'])
    })

    test('validate option keys', () => { 
        expect(Object.keys(consentIdsEnum)).toStrictEqual(['email_notifications', 'sms_notifications'])
     })
})

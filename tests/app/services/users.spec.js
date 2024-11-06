const { describe, test, expect } = require('@jest/globals')
const userService = require('../../../src/app/services/users')
const { UserNotFoundMessage, InternalServerErrorMessage } = require('../../../src/app/errors/error-messages.js')

describe('userService suite', () => {

    describe('getUser tests', () => {
        test('should get user successfully', async () => {
            const user = await userService.getUser('k@k.com', {
                getFullUserByEmail: () => ({
                    id: "00000000-0000-0000-0000-000000000000",
                    email: "valid@email.com",
                    consents: [
                        {
                            id: "email_notifications",
                            enabled: false
                        },
                        {
                            id: "sms_notifications",
                            enabled: true
                        }
                    ]
                })
            })
            expect(user.success).toBe(200)
            expect(user.data.consents.length).toBe(2)
        })

        test('should return 404 when user is not found', async () => {
            const user = await userService.getUser('k@k.com', {
                getFullUserByEmail: () => undefined
            })
            expect(user.error).toBe(404)
            expect(user.data).toBe(UserNotFoundMessage)
        })

        test('should return internal server error when the unexpected happens', async () => {
            const user = await userService.getUser('k@k.com', {
                getFullUserByEmail: () => { throw new Error("err") }
            })
            expect(user.error).toBe(500)
            expect(user.data).toBe(InternalServerErrorMessage)
        })
    })

    describe('saveUser tests', () => {
        test('should save user with success', async () => { 
            const user = await userService.saveUser({ email: 'k@k.com'}, {
                getUserByEmail: () => undefined,
                save: () => ({
                    id: "00000000-0000-0000-0000-000000000000",
                    email: "k@k.com",
                    consents: []
                })
            })
            expect(user.success).toBe(201)
            expect(user.data.email).toBe('k@k.com')
        })

        test('should fail in validator', async () => { 
            const user = await userService.saveUser({ email: 'Not an email'}, {
                getUserByEmail: () => undefined,
            })
            expect(user.error).toBe(422)
        })

        test('should fail when user already exists', async () => { 
            const user = await userService.saveUser({ email: 'k@k.com'}, {
                getUserByEmail: () => ({
                    id: "00000000-0000-0000-0000-000000000000",
                    email: "k@k.com",
                    consents: []
                })
            })
            expect(user.error).toBe(422)
        })

        test('should fail when the unexpected happens', async () => { 
            const user = await userService.saveUser({ email: 'k@k.com'}, {
                getUserByEmail: () => undefined,
                save: () => { throw new Error('err') }
            })
            expect(user.error).toBe(500)
            expect(user.data).toBe(InternalServerErrorMessage)
        })
    })
})

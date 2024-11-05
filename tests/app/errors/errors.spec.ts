const { describe, test, expect } = require('@jest/globals')
const errors = require('../../../src/app/errors/errors')

describe('Error codes enum suite', () => {

    test('validate errors values', () => { 
        expect(Object.values(errors)).toStrictEqual([422, 500, 404])
    })

    test('validate errors keys', () => { 
        expect(Object.keys(errors)).toStrictEqual([
            'UnprocessableEntity',
            'InternalServerError',
            'NotFound',
        ])
     })
})

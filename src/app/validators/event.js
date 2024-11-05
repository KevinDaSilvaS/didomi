const joi = require('joi')
const consentIdsEnum = require('../enums/consent-ids')

const eventValidator = joi.object({
    id: joi.string().valid(...Object.values(consentIdsEnum)).required(),
    enabled: joi.boolean().required()
})

module.exports = eventValidator
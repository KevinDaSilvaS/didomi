const joi = require('joi')

const userValidator = joi.object({
    email: joi.string().email().required()
})

module.exports = userValidator
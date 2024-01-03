const Joi = require("joi");

const updateNameSchema = Joi.object({
    name: Joi.string().required(),
})

module.exports = updateNameSchema;
import Joi from "joi";

export const categoryValidSchema = Joi.object({
    name: Joi.string()
    .label("Nama Category")
    .required()
    .min(2)
    .max(100)
    .messages({
        'string.base':'{{#label}} harus string',
        'any.required':'{{#label}} tidak boleh kosong',
        'string.min':'{{#label}} minimal {{#limit}} huruf',
        'string.max':'{{#label}} minimal {{#limit}} huruf',
        'string.empty': '{{#label}} tidak boleh string kosong'
    })
})
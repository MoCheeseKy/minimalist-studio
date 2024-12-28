import Joi from "joi"

export const studioValidSchema = Joi.object({
    name: Joi.string()
    .label("Nama")
    .min(3)
    .max(255)
    .required(),

    capacity: Joi.number()
    .label("Kapasitas")
    .min(1)
    .required(),

    location: Joi.string()
    .label("Lokasi")
    .required()
}).prefs({
    messages:{
        'string.base':'{{#label}} harus string',
        'number.base':'{{#label}} harus angka',
        'any.required':'{{#label}} tidak boleh kosong',
        'string.min':'{{#label}} minimal {{#limit}} huruf',
        'number.min':'{{#label}} minimal berkapasitas {{#limit}} orang',
        'number.empty':'{{#label}} tidak boleh tidak bernilai',
        'string.max':'{{#label}} minimal {{#limit}} huruf',
        'string.empty': '{{#label}} tidak boleh string kosong'
    }
})

export const studioUpdateValidSchema = Joi.object({
    name: Joi.string()
    .label("Nama")
    .min(3)
    .max(255),

    capacity: Joi.number()
    .label("Kapasitas")
    .min(1),

    location: Joi.string()
    .label("Lokasi")
}).prefs({
    messages:{
        'string.base':'{{#label}} harus string',
        'number.base':'{{#label}} harus angka',
        'any.required':'{{#label}} tidak boleh kosong',
        'string.min':'{{#label}} minimal {{#limit}} huruf',
        'number.min':'{{#label}} minimal berkapasitas {{#limit}} orang',
        'number.empty':'{{#label}} tidak boleh tidak bernilai',
        'string.max':'{{#label}} minimal {{#limit}} huruf',
        'string.empty': '{{#label}} tidak boleh string kosong',
        'object.missing': 'Tidak ada input maka Tidak ada perubahan'
    }
})
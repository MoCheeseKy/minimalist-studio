import Joi from "joi"

export const classValidSchema = Joi.object({
        category_id: Joi.number()
        .label('Id Kategori')
        .required()
        .min(1),

        studio_id: Joi.string()
        .label('Id Studio')
        .required(),

        start_at: Joi.date().iso()
        .label('Tanggal Dimulai')
        .required()
        .messages({
            'date.base':'Format {{#label}} tidak valid'
        }),

        end_at: Joi.date().iso()
        .label('Tanggal Berakhir')
        .required()
        .messages({
            'date.base':'Format {{#label}} tidak valid'
        }),

        description: Joi.string()
        .label('Deskripsi')
        .required(),

        instructor: Joi.string()
        .label('Instruktur')
        .required()
        .min(3)
        .max(100),

        req_quota: Joi.number()
        .label('Banyak Kuota')
        .required()
        .min(1)
    }).prefs({
        messages:{
            'string.base':'{{#label}} harus string',
            'number.base':'{{#label}} harus angka',
            'any.required':'{{#label}} tidak boleh kosong',
            'string.min':'{{#label}} minimal {{#limit}} huruf',
            'string.max':'{{#label}} minimal {{#limit}} huruf',
            'string.empty': '{{#label}} tidak boleh string kosong',
            'number.min':'{{#label}} minimal {{#limit}}',
            'number.empty':'{{#label}} tidak boleh tidak bernilai',
        }
    })

export const classUpdateValidSchema = Joi.object({
        category_id: Joi.number()
        .label('Id Kategori')
        .min(1),

        studio_id: Joi.string()
        .label('Id Studio'),

        start_at: Joi.date().iso()
        .label('Tanggal Dimulai')
        .messages({
            'date.base':'Format {{#label}} tidak valid'
        }),

        end_at: Joi.date().iso()
        .label('Tanggal Berakhir')
        .messages({
            'date.base':'Format {{#label}} tidak valid'
        }),

        description: Joi.string()
        .label('Deskripsi'),

        instructor: Joi.string()
        .label('Instruktur')
        .min(3)
        .max(100),

        req_quota: Joi.number()
        .label('Banyak Kuota')
        .min(1)
    }).prefs({
        messages:{
            'string.base':'{{#label}} harus string',
            'number.base':'{{#label}} harus angka',
            'any.required':'{{#label}} tidak boleh kosong',
            'string.min':'{{#label}} minimal {{#limit}} huruf',
            'string.max':'{{#label}} minimal {{#limit}} huruf',
            'string.empty': '{{#label}} tidak boleh string kosong',
            'number.min':'{{#label}} minimal {{#limit}}',
            'number.empty':'{{#label}} tidak boleh tidak bernilai',
        }
    })
import Joi from "joi";

// Register  Request Body Validation
export const registerValidSchema = Joi.object({
    phone_num: Joi.string()
    .label('Nomor Telepon')
    .pattern(/^\+628/)
    .min(7)   //phone must start with +628, min 7
    .max(15)
    .required()
    .messages({
        'string.pattern.base':'{{#label}} harus dimulai dengan +628',
        'string.min':'{{#label}} minimal {{#limit}} digit',
        'string.max':'{{#label}} maksimal {{#limit}} digit'
    }),

    fullname: Joi.string()
    .label('Nama Lengkap')
    .min(5)
    .max(255)
    .required(),

    gender: Joi.string()
    .label('Jenis Kelamin')
    .valid("PRIA", "WANITA") //Match with prisma Schema
    .required()
    .messages({
        'any.only':'{{#label}} harus salah satu dari \'PRIA\' atau \'WANITA\''
    }),
    
    email: Joi.string()
    .label('Email')
    .email()
    .required()
    .messages({
        'string.email':'Format {{#label}} tidak valid'
    }),

    instagram: Joi.string()
    .label('Instagram')
    .max(100),
    
    //expected date format : YYYY-MM-DD || to match with prisma
    birth_date: Joi.date()
    .label('Tanggal Lahir')
    .required()
    .messages({
        'date.base':'Format {{#label}} tidak valid'
    }),

    password: Joi.string()
    .label('Kata Sandi')
    .min(8)
    .required(),
    
    repeat_password: Joi.string()
    .label('Konfirmasi Kata Sandi')
    .valid(Joi.ref('password'))
    .required()
    .messages({
        'any.only': '{{#label}} harus sama dengan Kata Sandi'
    })

}).prefs({
    messages:{
        'string.base':'{{#label}} harus string',
        'any.required':'{{#label}} tidak boleh kosong',
        'string.min':'{{#label}} minimal {{#limit}} huruf',
        'string.max':'{{#label}} minimal {{#limit}} huruf',
        'string.empty': '{{#label}} tidak boleh string kosong'
    }
}).with('password', 'repeat_password')



// Login Request Body Validation
export const loginValidSchema = Joi.object({
    phone_num: Joi.string()
    .label('Nomor Telepon')
    .pattern(/^\+628/)
    .min(7)   //phone must start with +628, min 7
    .max(15)
    .required()
    .messages({
        'string.pattern.base':'{{#label}} harus dimulai dengan +628',
        'string.min':'{{#label}} minimal {{#limit}} digit',
        'string.max':'{{#label}} maksimal {{#limit}} digit'
    }),

    password: Joi.string()
    .label('Kata Sandi')
    .min(8)
    .required(),
}).prefs({
    messages:{
        'string.base':'{{#label}} harus string',
        'any.required':'{{#label}} tidak boleh kosong',
        'string.empty': '{{#label}} tidak boleh string kosong'
    }
})
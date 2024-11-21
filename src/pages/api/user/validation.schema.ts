import Joi from "joi";

const registerValidSchema = Joi.object({
    phone_num: Joi.string()
    .pattern(/^\+628\d{7,}$/)   //phone must start with +628, min 7
    .required,

    fullname: Joi.string()
    .min(5)
    .max(255)
    .required,

    gender: Joi.string()
    .valid("PRIA", "WANITA") //Match with prisma Schema
    .required,
    
    email: Joi.string()
    .email(),

    password: Joi.string()
    .min(8)
    .required(),

    instagram: Joi.string()
    .max(100),
    
    //expected date format : YYYY-MM-DD || to match with prisma
    birth_date: Joi.date()
    .required()
})
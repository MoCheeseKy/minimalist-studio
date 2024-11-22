import { respond } from "@/utils/resJson";
import { NextApiRequest, NextApiResponse } from "next";
import { registerValidSchema } from "./validation.schema";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt'
const prisma = new PrismaClient();
export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    try {
        if(req.method == 'GET'){
            const dataUser = await prisma.user.findMany();
            respond(200, false, "Here", dataUser, res);
        }else if(req.method != 'POST'){
            respond(405, true, "Method Forbidden", null, res);
        }

        const validationResult = registerValidSchema.validate(req.body);

        if(validationResult.error){
            const errorMessage = validationResult.error.details.map((err => err.message));
            respond(400,true,errorMessage,null,res);
        }

        const reqData = validationResult.value;

        const user = await prisma.user.findUnique({where:{email: reqData.email}})
        if(user){
            return respond(409, false, "Email Already Existed", null, res);
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(reqData.password, salt);
        reqData.password = hashedPass;

        reqData.quota = 0;
        delete reqData.repeat_password;

        await prisma.user.create({data:reqData});
        return respond(200, false, "Register Success", null, res);
    } catch (error) {
        console.log(error);
        respond(500,true,"Internal Server Error.",null,res);
    }
}
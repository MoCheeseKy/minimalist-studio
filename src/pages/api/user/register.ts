import { respond } from "@/utils/resJson";
import { NextApiRequest, NextApiResponse } from "next";
import { registerValidSchema } from "./validation.schema";
import * as bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
    omit: {
      user: {   
        password: true
      }
    }
})
export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    try {
        if(req.method != 'POST'){
            return respond(405, true, "Metode Dilarang", null, res);
        }

        const validationResult = registerValidSchema.validate(req.body);

        if(validationResult.error){
            const errorMessage = validationResult.error.details.map((err => err.message))[0];
            return respond(400,true,errorMessage,null,res);
        }

        const reqData = validationResult.value;

        const isExistbyEmail = await prisma.user.findUnique({where:{email: reqData.email}})
        const isExistbyPhone_num = await prisma.user.findUnique({where:{phone_num:reqData.phone_num}})
        if(isExistbyEmail){
            return respond(409, false, "Email sudah digunakan", null, res);
        }
        if(isExistbyPhone_num){
            return respond(409, false, "Nomor Telepon sudah digunakan", null, res);
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(reqData.password, salt);
        reqData.password = hashedPass;

        reqData.quota = 0;
        delete reqData.repeat_password;

        await prisma.user.create({data:reqData});
        return respond(200, false, "Daftar Berhasil", null, res);
    } catch (error) {
        console.log(error);
        return respond(500,true,"Internal Server Error",null,res);
    }finally{
        await prisma.$disconnect()
    }
}
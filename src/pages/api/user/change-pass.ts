import { respond } from "@/utils/resJson";
import { NextApiRequest, NextApiResponse } from "next";
import { changePassValidSchema } from "./validation.schema";
import * as bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const prisma = new PrismaClient();
const secret : jwt.Secret = process.env.SECRET || "yb8c7b*&@Y#*&!"
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        if(req.method != 'POST'){
            return respond(405, true, "Method is not Allowed", null, res);
        }

        const authHead = req.headers.authorization;
        if(!authHead || !authHead.startsWith('Bearer ')){
            return respond(401, true, "Anda perlu login terlebih dahulu", null, res)
        }

        const token = authHead.split(' ')[1];
        const payload = jwt.verify(token, secret) as JwtPayload;
        const user = await prisma.user.findUnique({where:{id:payload.id}});
        if(!user){
            return respond(401, true, "Unauthorized", null, res)
        }

        const {password} = req.body
        if(!password){
            return respond(400, true, "Masukkan Kata Sandi", null, res);
        }

        const isPassCorrect = await bcrypt.compare(password, user?.password); 
        if(!isPassCorrect){
            return respond(400, true, "Kata Sandi Salah", null, res);
        }

        const validationResult = changePassValidSchema.validate(req.body)
        if(validationResult.error){
            const errorMessage = validationResult.error.details.map((err => err.message))[0];
            return respond(400,true,errorMessage,null,res);
        }

        const reqData = validationResult.value;
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(reqData.new_password, salt);
        await prisma.user.update({
            where:{id:payload.id},
            data:{password:hashedPass}
        })
        return respond(200, false, "Kata Sandi Berhasil Diubah", null, res)
    } catch (error) {
        console.log(error);
        return respond(500,true,"Internal Server Error",null,res);
    }
}
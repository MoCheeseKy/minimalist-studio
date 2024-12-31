import { respond } from "@/utils/resJson";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/pages/_app';
import { format } from "date-fns-tz";
import { Prisma } from "@prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if(req.method != 'PUT'){
            return respond(405, true, "Method Not Allowed", null, res)
        }
        const {id} = req.query
        if(!id){
            return respond(400, true, "Id harus disertakan", null, res)
        } 

        const {add_quota} = req.body 
        if(typeof add_quota != "number"){
            return respond(400, true, "add_quota harus berupa angka", null, res)
        }

        const [updatedUser, createdTransaction] = await prisma.$transaction([
            prisma.user.update({
                where:{id:String(id)},
                data:{
                    quota:{
                        increment:add_quota
                    }
                }
            }),
            prisma.transaction.create({
                data:{
                    user_id: String(id),
                    quota_amount: add_quota,
                    createdAt: new Date()
                }
            })
        ])

        return respond(200, false, `Top-up pada user "${updatedUser.fullname}" dengan jumlah "${add_quota}" berhasil`, null, res)
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025'){
                return respond(200, false, "User Tidak ditemukan", [], res)
            }
        }
        console.log(error)
        return respond(500, true, "Internal Server Error", null, res);        
    }finally{
        await prisma.$disconnect()
    }
}
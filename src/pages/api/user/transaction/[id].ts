import { respond } from "@/utils/resJson";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/pages/_app';
import { format } from "date-fns-tz";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if(req.method != 'GET'){
            return respond(405, true, "Method Not Allowed", null, res)
        }
        const {id} = req.query
        if(!id){
            return respond(400, true, "Id harus disertakan", null, res)
        } 

        const transaction_history = await prisma.transaction.findMany({
            where:{
                user_id:String(id)
            }
        })
        if(transaction_history.length == 0){
            return respond(404, false, `User id-${id} belum melakukan transaksi`, [], res)
        }

        return respond(200, false, `Riwayat transakasi user id-${id} berhasil di dapatkan`, transaction_history, res)
    } catch (error) {
        console.log(error)
        return respond(500, true, "Internal Server Error", null, res);        
    }finally{
        await prisma.$disconnect()
    }
}
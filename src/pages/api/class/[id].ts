import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { respond } from '@/utils/resJson';
import { categoryValidSchema } from './validation.schema';
import { error } from 'console';
const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'PUT':
            return await updateClass(req, res);
        case 'GET':
            return await getByIdClass(req, res);
        case 'DELETE':
            return await deleteClass(req, res);
        default:
            return respond(405, true, "Method Forbidden", null, res);
    }
}

async function getByIdClass(
    req:NextApiRequest,
    res:NextApiResponse
) {
    try {
        const {id} = req.query
        if(!id){
            return respond(400, true, "Id harus disertakan", null, res)
        }
        const yogaClass = await prisma.class.findUnique({
            where:{id:String(id)},
            select:{
                id:true,
                category:{select:{
                    id:true,
                    name:true
                }},
                studio:{select:{
                    id:true,
                    name:true,
                    location:true
                }},
                start_at:true,
                end_at:true,
                duration:true,
                description:true,
                instructor:true,
                current_slot:true,
                max_slot:true,
                req_quota:true,
            }
        })
        if(!yogaClass){
            return respond(404, true, `Kelas Yoga id-${id} tidak ada`, null, res)
        }

        return respond(200, false, `Kelas Yoga id-${id} Berhasil Didapatkan`, yogaClass, res)
    } catch (error) {
        console.log(error)
        return respond(500, true, "Internal Server Error", null, res);        
    }
}

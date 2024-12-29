import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { respond } from '@/utils/resJson';
import { classValidSchema } from './validation.schema';
import { toZonedTime } from 'date-fns-tz';
const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'POST':
            return await createClass(req, res);
        case 'GET':
            return await getAllClass(req, res);
        default:
            return respond(405, true, "Method Forbidden", null, res);
    }
}

async function createClass(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const validationResult = classValidSchema.validate(req.body)
        if(validationResult.error){
            const errorMessage = validationResult.error.details.map(err => err.message);
            return respond(400, true, errorMessage, null, res);
        }

        const category_id = validationResult.value.category_id
        const category = await prisma.class_Category.findUnique({where:{id:category_id}})
        if(!category){
            return respond(404, true, `Kategori id-${category_id} tidak ada`, null, res);
        }
        
        const studio_id = validationResult.value.studio_id
        const studio = await prisma.studio.findUnique({where:{id:studio_id}})
        if(!studio){
            return respond(404, true, `Studio id-${studio_id} tidak ada`, null, res);
        }
        
        const reqData = validationResult.value
        reqData.current_slot = 0;
        reqData.max_slot = studio.capacity;

        await prisma.class.create({
            data:reqData
        })
        
        return respond(201, false, "Kelas "+category.name+ " Berhasil dibuat", null, res);
    } catch (error) {
        console.log(error);
        return respond(500,true,"Internal Server Error",null,res);
    }  
}


async function getAllClass(
    req: NextApiRequest,
    res: NextApiResponse
){
    try {
        const {date,category_id} = req.query
        
        if(!date || !category_id){
            return respond(400, true, "Filter Date atau Id Kategori tidak boleh kosong",null, res);
        }

        const classes = await prisma.class.findMany({
            where:{
                start_at:{
                    gte: new Date(date+"T00:00"), // Awal dari tanggal (00:00)
                    lt: new Date(date+"T23:59"),    // Akhir dari tanggal (23:59:59)
                },
                ...(category_id !== "Semua" && { category_id: Number(category_id) })
            }
        });

        if(classes.length == 0){
            return respond(404, true, "Tidak ada Kelas yang Tersedia", null, res);
        }

        return respond(200, false, "Data Kelas Berhasil di dapatkan", classes, res);
    } catch (error) {
        console.log(error);
        return respond(500,true,"Internal Server Error",null,res);
    }  
}
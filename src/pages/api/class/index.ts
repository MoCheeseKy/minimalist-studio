import type { NextApiRequest, NextApiResponse } from 'next'
import { respond } from '@/utils/resJson';
import { classValidSchema } from './validation.schema';
import { prisma } from '@/pages/_app';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'POST':
            await createClass(req, res);
        case 'GET':
            await getAllClass(req, res);
        default:
            respond(405, true, "Method Forbidden", null, res);
    }
    await prisma.$disconnect()
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
            return respond(200, false, `Kategori id-${category_id} tidak ada`, null, res);
        }
        
        const studio_id = validationResult.value.studio_id
        const studio = await prisma.studio.findUnique({where:{id:studio_id}})
        if(!studio){
            return respond(200, false, `Studio id-${studio_id} tidak ada`, null, res);
        }
        
        const reqData = validationResult.value
        reqData.current_slot = 0;
        reqData.max_slot = studio.capacity;
        
        // Set Duration
        const {start_at, end_at} = reqData
        const durationHour =  end_at.getHours() - start_at.getHours()
        const durationMinutes = end_at.getMinutes() - start_at.getMinutes()
        reqData.duration = (durationHour * 60) + durationMinutes  

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
                //Jika category Id bukan bernilai "Semua" maka where mencari dengan key category_id juga
                ...(category_id !== "Semua" && { category_id: Number(category_id) })
            },select:{
                id:true,
                category:{select:{id:true,name:true}},
                studio:{select:{id:true,name:true}},
                start_at:true,
                end_at:true,
                duration:true,
                description:true,
                instructor:true,
                current_slot:true,
                max_slot:true,
                req_quota:true,
            }
        });

        if(classes.length == 0){
            return respond(200, false, "Tidak ada Kelas yang Tersedia", null, res);
        }
        await prisma.$disconnect()
        return respond(200, false, `Data Kelas Tanggal ${date} Berhasil di dapatkan`, classes, res);
    } catch (error) {
        console.log(error);
        return respond(500,true,"Internal Server Error",null,res);
    }  
}
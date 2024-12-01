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
        case 'POST':
            return await createCategory(req, res);
        case 'GET':
            return await getAllCategory(req, res);
        default:
            return respond(405, true, "Method Forbidden", null, res);
    }
}

async function createCategory(
    req: NextApiRequest,
    res: NextApiResponse
){
    try {
        
        if(req.method != 'POST'){
            return respond(405, true, "Method Forbidden", null, res);
        }
        const validationResult = await categoryValidSchema.validate(req.body);
        
        if(validationResult.error){
            const errorMessage = validationResult.error.details.map(err => err.message);
            return respond(400, true, errorMessage, null, res);
        }
        
        const reqData = validationResult.value
        await prisma.class_Category.create({data:reqData});
        return respond(201, false, "Category "+reqData.name+" telah berhasil ditambahkan", null, res);
    } catch (error) {
        console.log(error);
        return respond(500,true,"Internal Server Error",null,res);
    }
}

async function getAllCategory(
    req: NextApiRequest,
    res: NextApiResponse
){
    try {
        if(req.method != 'GET'){
            respond(405, true, "Method Forbidden", null, res);
        }
        const categoryData = await prisma.class_Category.findMany();
    
        return respond(200, false, "Data Category Kelas Berhasil di dapatkan", categoryData, res);
    } catch (error) {
        console.log(error);
        return respond(500,true,"Internal Server Error",null,res); 
    }
}
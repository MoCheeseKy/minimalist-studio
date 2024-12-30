import { respond } from "@/utils/resJson";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { studioValidSchema } from "./validation.schema";
import { prisma } from '@/pages/_app';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    switch (req.method) {
        case 'POST':
             await createStudio(req, res);
        case 'GET':
             await getAllStudio(req, res);
        default:
             respond(405, true, "Method Forbidden", null, res);
    }
    await prisma.$disconnect()
}

async function createStudio(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        
        const validationResult = studioValidSchema.validate(req.body)
        if(validationResult.error){
            const errorMessage = validationResult.error.details.map(err => err.message);
            return respond(400, true, errorMessage, null, res);
        }
        const reqData = validationResult.value
        await prisma.studio.create({data:reqData})
        return respond(201, false, "Studio "+reqData.name+" berhasil dibuat", null, res)
    } catch (error) {
        console.log(error);
        return respond(500,true,"Internal Server Error",null,res); 
    }
}


async function getAllStudio(
    req: NextApiRequest,
    res: NextApiResponse
){
    try {
        const studioData = await prisma.studio.findMany();
        if(studioData.length == 0){
            return respond(404, true, "Tidak ada Studio yang tersedia", null, res);
        }

        return respond(200, false, "Data Studio Berhasil di dapatkan", studioData, res)
    } catch (error) {
        console.log(error);
        return respond(500,true,"Internal Server Error",null,res); 
    }
}
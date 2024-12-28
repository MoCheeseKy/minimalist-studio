import { respond } from "@/utils/resJson";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { studioUpdateValidSchema, studioValidSchema } from "./validation.schema";
const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'PUT':
            return await updateStudio(req, res);
        case 'GET':
            return await getByIdStudio(req, res);
        case 'DELETE':
            return await deleteStudio(req, res);
        default:
            return respond(405, true, "Method Forbidden", null, res);
    }
}

async function updateStudio(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {id} = req.query
        const studio = await prisma.studio.findUnique({where:{id:String(id)}})
        if(!studio){
            return respond(404, true, `Studio id-${id} tidak ada`, null, res)
        }
        const validationResult = studioUpdateValidSchema.validate(req.body);
        if(validationResult.error){
            const errorMessage = validationResult.error.details.map(err => err.message)
            return respond(400, true, true, errorMessage, res)
        }

        const updatedStudio = await prisma.studio.update({
            where:{id:String(id)},
            data: validationResult.value
        })

        return respond(200, false, `Studio ${studio.name} Berhasil diperbarui`, updatedStudio, res) 
    } catch (error) {
        console.log(error)
        return respond(500, true, "Internal Server Error", null, res)
    }
}

async function getByIdStudio(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {id} = req.query
        const studio = await prisma.studio.findUnique({where:{id:String(id)}})
        if(!studio){
            return respond(404, true, `Studio id-${id} tidak ada`, null, res);
        }

        return respond(200, false, `kategori id-${id} Berhasil Ditemukan`, studio, res);
    } catch (error) {
        console.log(error)
        return respond(500, true, "Internal Server Error", null, res)
    }
}

async function deleteStudio(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {id} = req.query
        const studio = await prisma.studio.findUnique({where:{id:String(id)}})
        if(!studio){
            return respond(404, true, `Studio id-${id} tidak ada`, null, res);
        }
        await prisma.studio.delete({where:{id:String(id)}});
        return respond(200, false, `Studio id-${id} Berhasil Dihapus`, null, res);
    } catch (error) {
        console.log(error)
        return respond(500, true, "Internal Server Error", null, res)
    }
}

